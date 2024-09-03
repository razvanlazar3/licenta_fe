import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OperationEnum} from "../../../../models/enums/OperationEnum";
import {Router} from "@angular/router";
import {CryptoService} from "../../../../services/CryptoService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CUSTOM_VALIDATORS, DYNAMIC_VALIDATORS} from "../../../validators/custom-validators-function";
import {getErrors} from '../../../validators/form-control-errors';
import {PersonalCryptoModel} from "../../../../models/PersonalCryptoModel";

@Component({
  selector: 'app-crypto-deletion-modal',
  templateUrl: './crypto-deletion-modal.component.html',
  styleUrls: ['./crypto-deletion-modal.component.scss']
})
export class CryptoDeletionModalComponent {

  readonly CRYPTO_REMOVAL_TITLE = "REMOVE CRYPTO";
  readonly COIN_ICON = "assets/general/modals/bank-addition-modal/sum-icon.png";
  readonly RETRACTED_LABEL = "Retracted amount";
  readonly RETRACTED_ICON = "assets/general/modals/bank-addition-modal/sum-icon.png";
  readonly RETRACTED = "retractedAmount";
  readonly REMAINING_FOND_ICON = "assets/general/modals/bank-addition-modal/total-fund-icon.png";

  cryptoForm!: FormGroup;
  operation = OperationEnum.REMOVE;
  totalFund!: number;
  maxRetractableAmount = -1;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cryptoService: CryptoService,
              private dialogRef: MatDialogRef<CryptoDeletionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.totalFund = this.data.currentSum;
    this.maxRetractableAmount = this.data.currentSum / this.data.coinPrice;
    this.initForm();
  }

  initForm(): void {
    this.cryptoForm = this.fb.group({
      retractedAmount: [0, [Validators.required, CUSTOM_VALIDATORS['NUMERICAL'],
        DYNAMIC_VALIDATORS['LESS_THAN_VALUE'](this.maxRetractableAmount)]]
    });

    this.adaptTotalFund();
  }

  private adaptTotalFund() {
    this.cryptoForm.valueChanges.subscribe(
      () => {
        this.calculateTotalFunds(this.cryptoForm.value.retractedAmount);
      });
  }

  getErrors(formControlName: string): string[] {
    const control = this.cryptoForm.get(formControlName);
    if (control) {
      return getErrors(control);
    } else {
      return [];
    }
  }

  removeCrypto(): void {
    if (this.cryptoForm.valid) {
      const coinRemoval = new PersonalCryptoModel(this.data.coinId,
        this.data.coinPrice, this.cryptoForm.value.retractedAmount);
      this.cryptoService.removeCoin(coinRemoval).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.cryptoForm.markAllAsTouched();
    }
  }

  calculateTotalFunds(numberOfCoins: number): void {
    if (this.cryptoForm.valid) {
      this.totalFund = this.data.currentSum - this.data.coinPrice * numberOfCoins;
    }
  }
}

import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getErrors} from '../../../validators/form-control-errors';
import {OperationEnum} from "../../../../models/enums/OperationEnum";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CUSTOM_VALIDATORS} from "../../../validators/custom-validators-function";
import {CryptoService} from "../../../../services/CryptoService";
import {PersonalCryptoModel} from "../../../../models/PersonalCryptoModel";

@Component({
  selector: 'app-crypto-addition-modal',
  templateUrl: './crypto-addition-modal.component.html',
  styleUrls: ['./crypto-addition-modal.component.scss']
})
export class CryptoAdditionModalComponent {

  readonly CRYPTO_ADDITION_MODAL = "ADD CRYPTO";

  readonly COIN_ICON = "assets/general/modals/bank-addition-modal/sum-icon.png";
  readonly AMOUNT_LABEL = "Amount";
  readonly AMOUNT_ICON = "assets/general/modals/bank-addition-modal/sum-icon.png";
  readonly AMOUNT = "amount";
  readonly TOTAL_FUND_ICON = "assets/general/modals/bank-addition-modal/total-fund-icon.png";

  cryptoForm!: FormGroup;
  operation = OperationEnum.ADD;
  totalFund = '-';

  constructor(private router: Router,
              private fb: FormBuilder,
              private cryptoService: CryptoService,
              private dialogRef: MatDialogRef<CryptoAdditionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.cryptoForm = this.fb.group({
      amount: [0, [Validators.required, CUSTOM_VALIDATORS['NUMERICAL']]]
    });

    this.adaptTotalFund();
  }

  private adaptTotalFund() {
    this.cryptoForm.valueChanges.subscribe(
      () => {
        this.calculateTotalFunds(this.cryptoForm.value.amount);
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

  addCrypto(): void {
    if (this.cryptoForm.valid) {
      const coinPurchase = new PersonalCryptoModel(this.data.coinId, this.data.coinPrice,
        this.cryptoForm.value.amount);
      this.cryptoService.addCoin(coinPurchase).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.cryptoForm.markAllAsTouched();
    }
  }

  calculateTotalFunds(numberOfCoins: number): void {
    if (this.cryptoForm.valid) {
      this.totalFund = (numberOfCoins * this.data.coinPrice).toString();
    }
  }
}


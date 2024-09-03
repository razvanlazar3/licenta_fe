import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getErrors} from '../../../validators/form-control-errors';
import {OperationEnum} from "../../../../models/enums/OperationEnum";
import {DropdownItem} from "../../../../models/DropdownItem";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BankService} from "../../../../services/BankService";
import {BankDepositModel} from "../../../../models/BankDepositModel";
import {CUSTOM_VALIDATORS} from "../../../validators/custom-validators-function";

@Component({
  selector: 'app-bank-addition-modal',
  templateUrl: './bank-addition-modal.component.html',
  styleUrls: ['./bank-addition-modal.component.scss']
})
export class BankAdditionModalComponent {

  readonly BANK_ADDITION_TITLE = "MAKE A DEPOSIT";

  readonly SUM_LABEL = "Sum";
  readonly SUM_ICON = "assets/general/modals/bank-addition-modal/sum-icon.png";
  readonly SUM = "sum";
  readonly TOTAL_FUND_LABEL = "-";
  readonly TOTAL_FUND_ICON = "assets/general/modals/bank-addition-modal/total-fund-icon.png";
  readonly TOTAL_FUND = "totalFund";
  readonly OFFER_ICON = "assets/general/modals/bank-addition-modal/offer-icon.png";
  readonly OFFER = "offer";

  bankForm!: FormGroup;
  operation = OperationEnum.ADD;
  totalFund = '-';

  constructor(private router: Router,
              private fb: FormBuilder,
              private bankService: BankService,
              private dialogRef: MatDialogRef<BankAdditionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bankForm = this.fb.group({
      offer: ['', Validators.required],
      sum: ['', [Validators.required, CUSTOM_VALIDATORS['NUMERICAL']]]
    });

    this.adaptTotalFund();
  }

  private adaptTotalFund() {
    this.bankForm.valueChanges.subscribe(
      (sum) => {
        this.calculateTotalFunds(this.bankForm.value.sum, this.bankForm.value.offer);
      });
  }

  getErrors(formControlName: string): string[] {
    const control = this.bankForm.get(formControlName);
    if (control) {
      return getErrors(control);
    } else {
      return [];
    }
  }

  addBankDeposit(): void {
    if (this.bankForm.valid) {
      const deposit = new BankDepositModel(this.bankForm.value.offer, this.bankForm.value.sum);
      this.bankService.addDeposit(deposit).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.bankForm.markAllAsTouched();
    }
  }

  extractNumberBeforePercent(text: string): number {``
    const regex = /(\d+(?:\.\d+)?)%/;
    const match = text.match(regex);
    return match ? parseInt(match[1]) : -1;
  }

  calculateTotalFunds(sum: number, currentOffer: number): void {
    if (this.bankForm.valid) {
      const offerLabel = this.data.offers.find((offer: DropdownItem) => offer.id === currentOffer)?.label;
      const offerPercentage = this.extractNumberBeforePercent(offerLabel);
      this.totalFund = ((sum * (100 + offerPercentage)) / 100).toString();
    }
  }
}

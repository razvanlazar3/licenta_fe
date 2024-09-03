import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {formatDuration} from "../../../../services/UtilsService";
import {ConfirmationModalComponent} from "../../modals/confirmation-modal/confirmation-modal.component";
import {BankDepositResponseModel} from "../../../../models/BankDepositResponseModel";
import {CryptoAdditionModalComponent} from "../../modals/crypto-addition-modal/crypto-addition-modal.component";
import {CryptoDeletionModalComponent} from "../../modals/crypto-deletion-modal/crypto-deletion-modal.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() elements: any[] = [];
  @Input() icon?: string;
  @Input() isCrypto = false;
  @Output() depositRemovedEvent = new EventEmitter<number>();
  @Output() cryptoRemovedEvent = new EventEmitter();

  readonly REMOVE_ICON = 'assets/general/always-there-icons/remove-icon.png';

  translatablePeriod: string [] = [];
  currentlySelectedDeposit: number = -1;
  isProfitable: boolean[] = [false];

  constructor(private dialogRef: MatDialog) {
    if (this.icon === undefined) {
      this.icon = this.REMOVE_ICON;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.translatablePeriod = this.elements.map(element => formatDuration(element.period));
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  openModal(element: any) {
    if (this.icon === this.REMOVE_ICON) {
      if (this.isCrypto) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          coinId: element.coinId,
          coinName: element.name,
          coinPrice: element.currentSum / element.amount,
          currentSum: element.currentSum
        };
        const dialogRef = this.dialogRef.open(CryptoDeletionModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
          this.cryptoRemovedEvent.emit();
        });

      } else {
        this.currentlySelectedDeposit = (element as BankDepositResponseModel).depositId;
        const dialogRef = this.dialogRef.open(ConfirmationModalComponent);
        dialogRef.afterClosed().subscribe(() => {
          this.depositRemovedEvent.emit(this.currentlySelectedDeposit);
        });
      }
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        coinId: element.id,
        coinName: element.name,
        coinPrice: element.price
      };

      this.dialogRef.open(CryptoAdditionModalComponent, dialogConfig);
    }
  }
}

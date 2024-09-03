import {Component, Input, OnInit} from '@angular/core';
import {BankModel} from "../../../../models/BankModel";
import {formatDuration} from "../../../../services/UtilsService";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BankAdditionModalComponent} from "../../modals/bank-addition-modal/bank-addition-modal.component";
import {DropdownItem} from "../../../../models/DropdownItem";

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss']
})
export class BankCardComponent implements OnInit {
  @Input() bank!: BankModel;

  readonly LOCATION_ICON = "assets/general/cards/bank-card/location-icon.png";
  readonly BANK_LOGO = "assets/general/cards/bank-card/logos/";
  readonly BANK_PHOTO = "assets/general/cards/bank-card/photos/";
  readonly REGISTER_DEPOSIT = 'REGISTER DEPOSIT';

  offers: DropdownItem[] = [];
  bankLogo!: string;
  bankPhoto!: string;

  constructor(private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    this.offers = this.bank.offers.map(offer => {
      return new DropdownItem("Period " + formatDuration(offer.period) + " interest " + offer.discount + '%',
        offer.id);
    });
    this.bankLogo = this.BANK_LOGO + this.bank.name.toLowerCase() + "-logo.png";
    this.bankPhoto = this.BANK_PHOTO + this.bank.name.toLowerCase() + "-photo.jpeg";
  }

  openOffersModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      offers: this.offers
    };

    this.dialogRef.open(BankAdditionModalComponent, dialogConfig);
  }
}

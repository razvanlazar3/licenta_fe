import {Component, OnInit} from '@angular/core';
import {BankModel} from "../../models/BankModel";
import {BankService} from "../../services/BankService";
import {GeneralPageOptionsEnum} from "../../models/enums/GeneralPageOptionEnum";

@Component({
  selector: 'app-banks-addition',
  templateUrl: './banks-addition.component.html',
  styleUrls: ['./banks-addition.component.scss']
})
export class BanksAdditionComponent implements OnInit {

  readonly generalPageOptionEnum = GeneralPageOptionsEnum;

  banks: BankModel[] = [];

  constructor(private bankService: BankService) {
  }

  ngOnInit(): void {
    this.bankService.getBanks().subscribe((banks: BankModel[]) => {
      this.banks = banks;
    })
  }
}

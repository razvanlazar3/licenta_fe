import {BankOfferModel} from "./BankOfferModel";

export interface BankModel {
  id: number,
  name: string,
  location: string,
  offers: BankOfferModel[]
}

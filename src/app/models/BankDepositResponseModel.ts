export class BankDepositResponseModel {
  constructor(
    public depositId: number,
    public period: number,
    public discount: number,
    public amount: number,
    public createdDate: Date,
    public bankName: string
  ) {
  }
}

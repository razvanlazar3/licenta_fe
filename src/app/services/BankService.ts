import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BANKS_URL} from "../useful/AppConstants";
import {Observable} from "rxjs";
import {BankModel} from "../models/BankModel";
import {TokenService} from "./TokenService";
import {BankDepositModel} from "../models/BankDepositModel";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private httpClient: HttpClient) {
  }

  getBanks(): Observable<BankModel[]> {
    return this.httpClient.get<BankModel[]>(BANKS_URL, {headers: TokenService.getAuthorizationHeaders()});
  }

  addDeposit(deposit: BankDepositModel): Observable<number> {
    return this.httpClient.post<number>(BANKS_URL + "/offer", deposit, {headers: TokenService.getAuthorizationHeaders()});
  }

  getReport():Observable<ArrayBuffer> {
    return this.httpClient.get(BANKS_URL+"/download-report", {
      responseType: 'arraybuffer',
      headers: TokenService.getAuthorizationHeaders()
  });
  }
}

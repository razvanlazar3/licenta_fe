import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CRYPTO_URL, Page} from "../useful/AppConstants";
import {Observable} from "rxjs";
import {TokenService} from "./TokenService";
import {CryptoResponseModel} from "../models/CryptoResponseModel";
import {PersonalCryptoModel} from "../models/PersonalCryptoModel";
import {PersonalCryptoResponseModel} from "../models/PersonalCryptoResponseModel";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCrypto(page: number): Observable<Page<CryptoResponseModel>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', 10);

    return this.httpClient.get<Page<CryptoResponseModel>>(CRYPTO_URL,
      {headers: TokenService.getAuthorizationHeaders(), params});
  }

  getPersonalCrypto(): Observable<PersonalCryptoResponseModel[]> {
    return this.httpClient.get<PersonalCryptoResponseModel[]>(CRYPTO_URL + "/personal",
      {headers: TokenService.getAuthorizationHeaders()});
  }

  addCoin(coinPurchase: PersonalCryptoModel): Observable<number> {
    return this.httpClient.put<number>(CRYPTO_URL, coinPurchase, {headers: TokenService.getAuthorizationHeaders()});
  }

  removeCoin(coinRemoval: PersonalCryptoModel): Observable<number> {
    return this.httpClient.put<number>(CRYPTO_URL + '/remove', coinRemoval, {headers: TokenService.getAuthorizationHeaders()});
  }

}

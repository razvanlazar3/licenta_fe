import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/UserModel";
import {BASE_APP_URL} from "../useful/AppConstants";
import {BankDepositResponseModel} from "../models/BankDepositResponseModel";
import {TokenService} from "./TokenService";

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  signup(user: User) {
    const url = `${BASE_APP_URL + "/auth/register"}`;
    return this.httpClient.post(url, user);
  }

  login(user: User): Observable<LoginResponse> {
    const url = `${BASE_APP_URL + "/auth/authenticate"}`;
    return this.httpClient.post<LoginResponse>(url, user);
  }

  getDeposits(): Observable<BankDepositResponseModel[]> {
    return this.httpClient.get<BankDepositResponseModel[]>(BASE_APP_URL + "/deposits", {headers: TokenService.getAuthorizationHeaders()});
  }

  deleteDeposit(depositId: number): Observable<number> {
    const url = `${BASE_APP_URL}/deposit/${depositId}`;
    return this.httpClient.delete<number>(url, {headers: TokenService.getAuthorizationHeaders()});
  }
}

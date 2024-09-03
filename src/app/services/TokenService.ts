import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {JwtPayload} from "../models/JwtPayload";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public static getToken(): string {
    return sessionStorage.getItem("token") || '';
  }

  public static getAuthorizationHeaders(): HttpHeaders {
    const token = sessionStorage.getItem("token");
    return new HttpHeaders({
      'Authorization': `Bearer ${(token)}`
    });
  }

  public static getDecodedToken(): JwtPayload {
    return jwtDecode(sessionStorage.getItem("token") || '');
  }
}

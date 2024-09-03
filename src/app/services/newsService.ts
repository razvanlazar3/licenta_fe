import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly API_KEY = 'bdI0CKSZGSRCanyr7TTLJW_1tQ9O9bwg';
  private readonly NEWS_URL = 'https://api.polygon.io/v2/reference/news';

  constructor(private httpClient: HttpClient) {
  }

  getNews(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.API_KEY}`
    });

    const limit: number = 10;
    const params = new HttpParams()
      .set('ticker', 'AAPL')
      .set('limit', limit.toString());

    return this.httpClient.get(this.NEWS_URL, {headers, params});
  }
}

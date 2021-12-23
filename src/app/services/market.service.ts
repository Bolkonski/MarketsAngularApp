import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'variables';
import { GetManyMarketDto } from '../models/getManyMarketResponseDto';
import { Market } from '../models/market';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  getMarkets(queryString:string): Observable<GetManyMarketDto> {
    return this.http.get<GetManyMarketDto>(`${API_URL}/?${queryString}`);
  }

  getMarketById(id:number): Observable<Market> {
    return this.http.get<Market>(`${API_URL}/${id}`);
  }

  addMarket(market:Market): Observable<Market> {
    return this.http.post<Market>(`${API_URL}`,market);
  }

  updateMarket(market:Market): Observable<Market> {
    return this.http.patch<Market>(`${API_URL}/${market.id}`,market);
  }

  deleteMarket(id:number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}

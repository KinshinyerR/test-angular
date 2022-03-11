import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { data } from '../Models/data';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  
  public data = Array<data>();
  constructor(private http: HttpClient) { }

  getCrypto(parametros: string){
    const URL = 'https://api.coinbase.com/v2/prices/BTC-USD/spot?date='+ parametros;
    return this.http.get(URL).pipe(map(res => [res]));
  }

  getCryptoEUR(parametros: string){
    const URL = 'https://api.coinbase.com/v2/prices/BTC-EUR/spot?date='+ parametros;
    return this.http.get(URL).pipe(map(res => [res]));
  }

  getCryptoCOP(parametros: string){
    const URL = 'https://api.coinbase.com/v2/prices/BTC-COP/spot?date='+ parametros;
    return this.http.get(URL).pipe(map(res => [res]));
  }
}

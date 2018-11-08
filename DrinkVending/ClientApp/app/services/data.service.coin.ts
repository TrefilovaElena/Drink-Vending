import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Coin } from '../models/index';
import { AppConfig } from '../app.config';
import { jwt } from '../helpers/index';

@Injectable()
export class DataServiceCoin {

   private url = this.config.apiUrl + 'Coin';

   constructor(private http: HttpClient, private config: AppConfig, private jwt: jwt) {
    }

   getCoins() {

      
       return this.http.get(this.url, { headers: this.jwt.set() });
    }

    getCoin(Id: number) {
        return this.http.get(this.url + '/' + Id, { headers: this.jwt.set() });
    }


    updateCoin(coin: Coin) {

        return this.http.put(this.url + '/' + coin.id, coin, { headers: this.jwt.set() });
    }

    blockCoin(id: number) {
        return this.http.delete(this.url + '/' + id, { headers: this.jwt.set() })
    }
}



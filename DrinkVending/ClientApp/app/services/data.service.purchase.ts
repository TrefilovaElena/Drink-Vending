import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Purchase } from '../models/index';
import { AppConfig } from '../app.config';

@Injectable()
export class DataServicePurchase {

    private url = this.config.apiUrl + 'Purchase';

    constructor(private http: HttpClient, private config: AppConfig) {
    }
    
          savePurchase(purchase: Purchase) {
           return this.http.post(this.url, purchase)
       }
     


}

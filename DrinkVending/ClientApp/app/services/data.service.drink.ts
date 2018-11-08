import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drink } from '../models/index';
import { AppConfig } from '../app.config';
import { jwt } from '../helpers/index';

@Injectable()
export class DataServiceDrink {

    private url = this.config.apiUrl + 'Drink';

    constructor(private http: HttpClient, private config: AppConfig, private jwt: jwt) {
    }

    getDrinks() {
        return this.http.get(this.url, { headers: this.jwt.set() });
    }

    getDrink(id: number) {
        return this.http.get(this.url + '/' + id, { headers: this.jwt.set() });
    }

    createDrink(drink: Drink) {
        return this.http.post(this.url, drink, { headers: this.jwt.set() });
    }

    updateDrink(drink: Drink) {

        return this.http.put(this.url + '/' + drink.id, drink, { headers: this.jwt.set() });
    }


    deleteDrink(id: number) {
        return this.http.delete(this.url + '/' + id, { headers: this.jwt.set() });
    }
}


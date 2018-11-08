import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../app.config';
import { jwt } from '../helpers/index';
import { User } from '../models/index';

@Injectable()
export class DataServiceUser {

  private url = this.config.apiUrl + 'users';

  constructor(private http: HttpClient, private config: AppConfig, private jwt: jwt ) { }

    getAll() {
        return this.http.get(this.url, { headers: this.jwt.set() });
    }

    getById(id: number) {
        return this.http.get(this.url + '/' + id, { headers: this.jwt.set() });
    }

    create(user: User) {
        return this.http.post(this.url, user, { headers: this.jwt.set() });
    }

    update(user: User) {

        return this.http.put(this.url + '/' + user.id, user, { headers: this.jwt.set() });
    }

    delete(id: number) {
        return this.http.delete(this.url + '/' + id, { headers: this.jwt.set() });
    }


  
}
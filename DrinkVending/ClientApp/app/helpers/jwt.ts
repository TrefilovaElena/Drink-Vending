import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class jwt {

    // create authorization header with jwt token


    set() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let httpheaders = new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token);
            return httpheaders;
        };
        }

    }


    

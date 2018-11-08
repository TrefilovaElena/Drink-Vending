import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Drink } from '../models/drink';


@Injectable()
export class UploadService {

    private url = '/api/upload';

    constructor(private http: HttpClient) {
    }

    upload(base64Content: string, fileName: string, oldfileName: string) {

        let input = new FormData();
        input.append("base64Content", base64Content);
        input.append("fileName", fileName);
        input.append("oldfileName", oldfileName);
        return this.http
            .post(this.url, input);
    }

   
}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { jwt } from '../helpers/index';
var DataServiceDrink = /** @class */ (function () {
    function DataServiceDrink(http, config, jwt) {
        this.http = http;
        this.config = config;
        this.jwt = jwt;
        this.url = this.config.apiUrl + 'Drink';
    }
    DataServiceDrink.prototype.getDrinks = function () {
        return this.http.get(this.url, { headers: this.jwt.set() });
    };
    DataServiceDrink.prototype.getDrink = function (id) {
        return this.http.get(this.url + '/' + id, { headers: this.jwt.set() });
    };
    DataServiceDrink.prototype.createDrink = function (drink) {
        return this.http.post(this.url, drink, { headers: this.jwt.set() });
    };
    DataServiceDrink.prototype.updateDrink = function (drink) {
        return this.http.put(this.url + '/' + drink.id, drink, { headers: this.jwt.set() });
    };
    DataServiceDrink.prototype.deleteDrink = function (id) {
        return this.http.delete(this.url + '/' + id, { headers: this.jwt.set() });
    };
    DataServiceDrink = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, AppConfig, jwt])
    ], DataServiceDrink);
    return DataServiceDrink;
}());
export { DataServiceDrink };
//# sourceMappingURL=data.service.drink.js.map
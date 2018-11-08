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
var DataServiceUser = /** @class */ (function () {
    function DataServiceUser(http, config, jwt) {
        this.http = http;
        this.config = config;
        this.jwt = jwt;
        this.url = this.config.apiUrl + 'users';
    }
    DataServiceUser.prototype.getAll = function () {
        return this.http.get(this.url, { headers: this.jwt.set() });
    };
    DataServiceUser.prototype.getById = function (id) {
        return this.http.get(this.url + '/' + id, { headers: this.jwt.set() });
    };
    DataServiceUser.prototype.create = function (user) {
        return this.http.post(this.url, user, { headers: this.jwt.set() });
    };
    DataServiceUser.prototype.update = function (user) {
        return this.http.put(this.url + '/' + user.id, user, { headers: this.jwt.set() });
    };
    DataServiceUser.prototype.delete = function (id) {
        return this.http.delete(this.url + '/' + id, { headers: this.jwt.set() });
    };
    DataServiceUser = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, AppConfig, jwt])
    ], DataServiceUser);
    return DataServiceUser;
}());
export { DataServiceUser };
//# sourceMappingURL=data.service.user.js.map
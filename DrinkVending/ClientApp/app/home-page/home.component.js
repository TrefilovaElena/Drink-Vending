var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataServiceCoin, DataServiceDrink, DataServicePurchase } from '../services/index';
import { Purchase } from '../models/index';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(dataServiceCoin, dataServiceDrink, dataServicePurchase) {
        this.dataServiceCoin = dataServiceCoin;
        this.dataServiceDrink = dataServiceDrink;
        this.dataServicePurchase = dataServicePurchase;
        this.coins = new Array();
        this.drinks = new Array();
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.purchase = new Purchase;
        this.loadItems();
    };
    //загрузка данных
    HomeComponent.prototype.loadItems = function () {
        this.loadDrinks();
        this.loadCoins();
    };
    HomeComponent.prototype.loadDrinks = function () {
        var _this = this;
        this.dataServiceDrink.getDrinks().subscribe(function (data) {
            _this.drinks = data.filter(function (data) { return data.quantity > 0; });
        });
    };
    HomeComponent.prototype.loadCoins = function () {
        var _this = this;
        this.dataServiceCoin.getCoins().subscribe(function (data) {
            _this.coins = data;
        });
    };
    // добавить монету в покупку
    HomeComponent.prototype.addCoin = function (coin) {
        this.purchase.AddCoin(coin);
    };
    // добавить напиток в покупку
    HomeComponent.prototype.addDrink = function (drink) {
        this.purchase.AddDrink(drink);
    };
    HomeComponent.prototype.ClearDrink = function () {
        this.purchase.ClearDrink();
    };
    HomeComponent.prototype.BuyDrinks = function () {
        var _this = this;
        this.dataServicePurchase.savePurchase(this.purchase)
            .subscribe(function (data) {
            if (!(data == "")) {
                alert("Ваша сдача: " + data);
            }
            ;
            _this.purchase.ClearAll();
            _this.ngOnInit();
        });
        ;
    };
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            providers: [DataServiceCoin, DataServiceDrink, DataServicePurchase]
        }),
        __metadata("design:paramtypes", [DataServiceCoin, DataServiceDrink, DataServicePurchase])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map
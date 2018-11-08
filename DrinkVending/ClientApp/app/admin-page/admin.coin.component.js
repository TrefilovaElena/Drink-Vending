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
import { DataServiceCoin, AlertService } from '../services/index';
var AdminCoinComponent = /** @class */ (function () {
    function AdminCoinComponent(dataService, alertService) {
        this.dataService = dataService;
        this.alertService = alertService;
        this.items = new Array();
    }
    AdminCoinComponent.prototype.ngOnInit = function () {
        this.loadItems();
    };
    //загрузка данных
    AdminCoinComponent.prototype.loadItems = function () {
        var _this = this;
        this.dataService.getCoins().subscribe(function (data) {
            _this.items = data;
        });
    };
    // сохраняем 
    AdminCoinComponent.prototype.saveItem = function (item) {
        var _this = this;
        if (item.quantity < 0) {
            item.quantity = 0;
        }
        ;
        this.dataService.updateCoin(item).subscribe(function (data) {
            _this.alertService.success('Количество монет изменено', true);
            _this.loadItems();
        }, function (error) {
            _this.alertService.error(error._body);
        });
    };
    // заблокировать монеты
    AdminCoinComponent.prototype.blockCoin = function (item) {
        var _this = this;
        this.dataService.blockCoin(item.id).subscribe(function (data) {
            _this.alertService.success('Изменена блокировка монеты', true);
            _this.loadItems();
        }, function (error) {
            _this.alertService.error(error._body);
        });
    };
    // отмена редактирования
    AdminCoinComponent.prototype.cancel = function () {
        this.loadItems();
        this.statusMessage = '';
    };
    // вычислени
    AdminCoinComponent.prototype.getTotal = function () {
        this.BlockSum = 0;
        this.UnBlockSum = 0;
        var sum = 0;
        var TotalSum = 0;
        var length = 0;
        if (!(this.items.length == null)) {
            length = this.items.length;
        }
        ;
        for (var i = 0; i < length; i++) {
            if (this.items[i].quantity) {
                sum = this.items[i].quantity * this.items[i].name;
                TotalSum += sum;
                if (this.items[i].canUse) {
                    this.UnBlockSum += sum;
                }
                else {
                    this.BlockSum += sum;
                }
                ;
            }
        }
        return TotalSum;
    };
    AdminCoinComponent = __decorate([
        Component({
            selector: 'admin-coin',
            templateUrl: './admin.coin.component.html',
            providers: [AlertService, DataServiceCoin]
        }),
        __metadata("design:paramtypes", [DataServiceCoin,
            AlertService])
    ], AdminCoinComponent);
    return AdminCoinComponent;
}());
export { AdminCoinComponent };
//# sourceMappingURL=admin.coin.component.js.map
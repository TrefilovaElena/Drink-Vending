var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TemplateRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { User } from '../models/index';
import { AlertService, DataServiceUser } from '../services/index';
var AdminUserComponent = /** @class */ (function () {
    function AdminUserComponent(dataService, alertService) {
        this.dataService = dataService;
        this.alertService = alertService;
        this.loading = false;
        this.model = {};
        this.items = new Array();
    }
    AdminUserComponent.prototype.ngOnInit = function () {
        this.loadItems();
    };
    //загрузка данных
    AdminUserComponent.prototype.loadItems = function () {
        var _this = this;
        this.dataService.getAll().subscribe(function (data) {
            _this.items = data;
        });
    };
    AdminUserComponent.prototype.register = function () {
        var _this = this;
        this.dataService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Пользователь зарегистрирован.', true);
            _this.loadItems();
        }, function (error) {
            _this.alertService.error(error._body);
        });
    };
    // сохраняем 
    AdminUserComponent.prototype.saveAll = function (item) {
        var _this = this;
        this.loading = true;
        this.dataService.create(item)
            .subscribe(function (data) {
            _this.alertService.success('Пользователь зарегистрирован.', true);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    // добавление 
    AdminUserComponent.prototype.addItem = function () {
        this.editedItem = new User();
        this.items.push(this.editedItem);
        this.isNewRecord = true;
    };
    // отмена редактирования
    AdminUserComponent.prototype.cancel = function () {
        this.loadItems();
    };
    // загружаем один из двух шаблонов
    AdminUserComponent.prototype.loadTemplate = function (item) {
        if (this.editedItem && this.editedItem.id == item.id) {
            return this.editTemplate;
        }
        else {
            return this.readOnlyTemplate;
        }
    };
    // удаление пользователя
    AdminUserComponent.prototype.deleteItem = function (item) {
        var _this = this;
        if (confirm("Вы уверены, что хотите удалить пользователя '" + item.firstName + " " + item.lastName + "'?")) {
            this.dataService.delete(item.id).subscribe(function (data) {
                _this.alertService.success('Пользователь удален', true);
                _this.loadItems();
            }, function (error) {
                _this.alertService.error(error._body);
            });
        }
    };
    __decorate([
        ViewChild('readOnlyTemplate'),
        __metadata("design:type", TemplateRef)
    ], AdminUserComponent.prototype, "readOnlyTemplate", void 0);
    __decorate([
        ViewChild('editTemplate'),
        __metadata("design:type", TemplateRef)
    ], AdminUserComponent.prototype, "editTemplate", void 0);
    AdminUserComponent = __decorate([
        Component({
            selector: 'admin-user',
            templateUrl: './admin.user.component.html',
            providers: [AlertService, DataServiceUser]
        }),
        __metadata("design:paramtypes", [DataServiceUser,
            AlertService])
    ], AdminUserComponent);
    return AdminUserComponent;
}());
export { AdminUserComponent };
//# sourceMappingURL=admin.user.component.js.map
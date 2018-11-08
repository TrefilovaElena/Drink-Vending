var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { UploadService, DataServiceDrink, AlertService } from '../services/index';
import { Drink } from '../models/index';
import 'rxjs/Rx';
var AdminDrinkComponent = /** @class */ (function () {
    function AdminDrinkComponent(changeDetectorRef, dataService, uploadService, alertService) {
        this.changeDetectorRef = changeDetectorRef;
        this.dataService = dataService;
        this.uploadService = uploadService;
        this.alertService = alertService;
        this.path = '';
        this.pathForImg = "/files/";
        this.file_srcs = "";
        this.file_name_string = "0.jpg";
        this.debug_size_before = [];
        this.debug_size_after = [];
        this.items = new Array();
    }
    AdminDrinkComponent.prototype.ngOnInit = function () {
        this.loadItems();
    };
    //загрузка данных
    AdminDrinkComponent.prototype.loadItems = function () {
        var _this = this;
        this.dataService.getDrinks().subscribe(function (data) {
            _this.items = data;
        });
    };
    AdminDrinkComponent.prototype.fileChange = function (input) {
        this.readFiles(input.files);
    };
    AdminDrinkComponent.prototype.readFile = function (file, reader, callback) {
        reader.onload = function () {
            callback(reader.result);
            console.log(reader.result);
        };
        reader.readAsDataURL(file);
    };
    AdminDrinkComponent.prototype.readFiles = function (files, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        // Create the file reader  
        var reader = new FileReader();
        // If there is a file  
        if (index in files) {
            // Start reading this file  
            this.readFile(files[index], reader, function (result) {
                // Create an img element and add the image file data to it  
                var img = document.createElement("img");
                img.src = result;
                // Send this img to the resize function (and wait for callback)  
                _this.resize(img, 200, 200, function (resized_jpeg, before, after) {
                    // For debugging (size in bytes before and after)  
                    _this.debug_size_before.push(before);
                    _this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview  
                    // This is also the file you want to upload. (either as a  
                    // base64 string or img.src = resized_jpeg if you prefer a file).  
                    _this.file_srcs = resized_jpeg;
                    // Read the next file;  
                    //  this.readFiles(files, index + 1);
                });
            });
        }
        else {
            // When all files are done This forces a change detection  
            this.changeDetectorRef.detectChanges();
        }
    };
    AdminDrinkComponent.prototype.resize = function (img, MAX_WIDTH, MAX_HEIGHT, callback) {
        // This will wait until the img is loaded before calling this function  
        return img.onload = function () {
            //пусть без пропорций, но нужного размера
            var width = MAX_WIDTH;
            var height = MAX_HEIGHT;
            // Get the images current width and height
            // var width = img.width;
            //  var height = img.height;
            // Set the WxH to fit the Max values (but maintain proportions) 
            // if (width > height) {
            //    if (width > MAX_WIDTH) {
            //         height *= MAX_WIDTH / width;
            //         width = MAX_WIDTH;
            //     }
            // } else {
            //     if (height > MAX_HEIGHT) {
            //         width *= MAX_HEIGHT / height;
            //        height = MAX_HEIGHT;
            //     }
            //  }
            // create a canvas object  
            var canvas = document.createElement("canvas");
            // Set the canvas to the new calculated dimensions  
            canvas.width = width;
            canvas.height = height;
            canvas.style.backgroundColor = "white";
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            // Get this encoded as a jpeg  
            // IMPORTANT: 'jpeg' NOT 'jpg'  
            var dataUrl = canvas.toDataURL('image/jpeg');
            // callback with the results  
            callback(dataUrl, img.src.length, dataUrl.length);
        };
    };
    // добавление 
    AdminDrinkComponent.prototype.addItem = function () {
        this.editedItem = new Drink();
        this.editedItem.imageName = "0.jpg";
        this.EditImageSet();
        this.items.push(this.editedItem);
        this.isNewRecord = true;
    };
    AdminDrinkComponent.prototype.EditImageSet = function () {
        this.file_srcs = this.pathForImg + this.editedItem.imageName;
    };
    // редактирование 
    AdminDrinkComponent.prototype.editItem = function (item) {
        this.editedItem = new Drink(item.id, item.name, item.price, item.quantity, item.imageName);
        this.EditImageSet();
    };
    // загружаем один из двух шаблонов
    AdminDrinkComponent.prototype.loadTemplate = function (item) {
        if (this.editedItem && this.editedItem.id == item.id) {
            return this.editTemplate;
        }
        else {
            return this.readOnlyTemplate;
        }
    };
    //
    AdminDrinkComponent.prototype.saveItem = function () {
        var _this = this;
        if (this.editedItem.quantity < 0) {
            this.editedItem.quantity = 0;
        }
        ;
        if (this.editedItem.price < 0) {
            this.editedItem.price = 0;
        }
        ;
        if (this.isNewRecord) {
            // добавляем 
            this.dataService.createDrink(this.editedItem).subscribe(function (data) {
                _this.alertService.success('Напиток добавлен', true);
                _this.loadItems();
            }, function (error) {
                _this.alertService.error(error._body);
            });
            this.isNewRecord = false;
            this.editedItem = null;
        }
        else {
            // изменяем 
            this.dataService.updateDrink(this.editedItem).subscribe(function (data) {
                _this.alertService.success('Напиток изменен', true);
                _this.loadItems();
            }, function (error) {
                _this.alertService.error(error._body);
            });
            this.editedItem = null;
        }
        ;
        this.file_srcs = "";
    };
    // сохраняем 
    AdminDrinkComponent.prototype.saveAll = function () {
        if (!(this.file_srcs == (this.pathForImg + this.editedItem.imageName))) {
            var date = new Date();
            var text = ""; //random text  
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            var oldimageName = this.editedItem.imageName;
            this.editedItem.imageName = text + date.getFullYear() + date.getMonth() + date.getMilliseconds() + ".jpg";
            // отправляем файл на сервер
            var base64Image = this.file_srcs.replace("data:image/jpeg;base64,", "");
            this.uploadService
                .upload(base64Image, this.editedItem.imageName, oldimageName)
                .subscribe(function (data) {
            });
        }
        this.saveItem();
    };
    // отмена редактирования
    AdminDrinkComponent.prototype.cancel = function () {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.items.pop();
            this.isNewRecord = false;
        }
        this.editedItem = null;
        this.statusMessage = '';
        this.file_srcs = "";
    };
    // удаление пользователя
    AdminDrinkComponent.prototype.deleteItem = function (item) {
        var _this = this;
        if (confirm("Вы уверены, что хотите удалить напиток '" + item.name + "'?")) {
            this.dataService.deleteDrink(item.id).subscribe(function (data) {
                _this.alertService.success('Напиток удален', true);
                _this.loadItems();
            }, function (error) {
                _this.alertService.error(error._body);
            });
        }
    };
    __decorate([
        ViewChild('readOnlyTemplate'),
        __metadata("design:type", TemplateRef)
    ], AdminDrinkComponent.prototype, "readOnlyTemplate", void 0);
    __decorate([
        ViewChild('editTemplate'),
        __metadata("design:type", TemplateRef)
    ], AdminDrinkComponent.prototype, "editTemplate", void 0);
    AdminDrinkComponent = __decorate([
        Component({
            selector: 'admin-drink',
            templateUrl: './admin.drink.component.html',
            providers: [DataServiceDrink, UploadService, AlertService]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef, DataServiceDrink, UploadService,
            AlertService])
    ], AdminDrinkComponent);
    return AdminDrinkComponent;
}());
export { AdminDrinkComponent };
//# sourceMappingURL=admin.drink.component.js.map
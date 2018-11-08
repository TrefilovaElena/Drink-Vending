import {    TemplateRef, ElementRef, ViewChild,   
    ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UploadService, DataServiceDrink, AlertService } from '../services/index';
import { Drink } from '../models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; 


@Component({
    selector: 'admin-drink',
    templateUrl: './admin.drink.component.html',
    providers: [DataServiceDrink, UploadService, AlertService]
})
export class AdminDrinkComponent implements OnInit
{

    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


    editedItem: Drink;
    items: Array<Drink>;
    isNewRecord: boolean;
    statusMessage: string;
    path = '';
    pathForImg = "/files/";
    public file_srcs: string = "";
    public file_name_string: string = "0.jpg";
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];  

    constructor(private changeDetectorRef: ChangeDetectorRef, private dataService: DataServiceDrink, private uploadService: UploadService,
        private alertService: AlertService) {
        this.items = new Array<Drink>();
    }

    ngOnInit() {
        this.loadItems();
    }

    //загрузка данных
    private loadItems() {
        this.dataService.getDrinks().subscribe((data: Drink[]) => {
            this.items = data;
        });
    }


    fileChange(input:any) {
        this.readFiles(input.files);
    }  

    readFile(file: any, reader: FileReader, callback:any) {
        reader.onload = () => {
            callback(reader.result);
            console.log(reader.result);
        }
        reader.readAsDataURL(file);
    }  

    readFiles(files:any, index = 0) {
        // Create the file reader  
        let reader = new FileReader();
        // If there is a file  
        if (index in files) {
            // Start reading this file  
            this.readFile(files[index], reader, (result:any) => {
                // Create an img element and add the image file data to it  
                var img = document.createElement("img");
                img.src = result;
                // Send this img to the resize function (and wait for callback)  
                this.resize(img, 200, 200, (resized_jpeg: string, before: string, after: string) => {
                    // For debugging (size in bytes before and after)  
                    this.debug_size_before.push(before);
                    this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview  
                    // This is also the file you want to upload. (either as a  
                    // base64 string or img.src = resized_jpeg if you prefer a file).  
                    this.file_srcs=resized_jpeg;
                    // Read the next file;  
                  //  this.readFiles(files, index + 1);
                });
            });
        } else {
            // When all files are done This forces a change detection  
            this.changeDetectorRef.detectChanges();
        }
    }  

    resize(img: HTMLImageElement, MAX_WIDTH: number, MAX_HEIGHT: number, callback: any) {
        // This will wait until the img is loaded before calling this function  
        return img.onload = () => {

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
    }  


    // добавление 
    addItem() {
        
        this.editedItem = new Drink();
        this.editedItem.imageName = "0.jpg";
        this.EditImageSet();
        this.items.push(this.editedItem);
        this.isNewRecord = true; 
    }
    EditImageSet()
    {
        this.file_srcs = this.pathForImg + this.editedItem.imageName;
    }

    // редактирование 
    editItem(item: Drink) { 
        this.editedItem = new Drink(item.id, item.name, item.price, item.quantity, item.imageName);
        this.EditImageSet();
    }

    // загружаем один из двух шаблонов
    loadTemplate(item: Drink) {
        if (this.editedItem && this.editedItem.id == item.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
    //
    saveItem() {
        if (this.editedItem.quantity < 0) { this.editedItem.quantity = 0 };
        if (this.editedItem.price < 0) { this.editedItem.price = 0 };
        if (this.isNewRecord) {
            // добавляем 
            this.dataService.createDrink(this.editedItem).subscribe(data => {
                this.alertService.success('Напиток добавлен', true);
                    this.loadItems();
            },
                error => {
                    this.alertService.error(error._body);
                });
            this.isNewRecord = false;
            this.editedItem = null;
        } else {
            // изменяем 
            this.dataService.updateDrink(this.editedItem).subscribe(data => {
                this.alertService.success('Напиток изменен', true);
                    this.loadItems();
            },
                error => {
                    this.alertService.error(error._body);
                });
            this.editedItem = null;
        };
        this.file_srcs = "";
    }

    // сохраняем 
    saveAll() {
        if (!(this.file_srcs == (this.pathForImg + this.editedItem.imageName)))
        {
            let date = new Date();
            var text = ""; //random text  
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length)); 
            let oldimageName = this.editedItem.imageName;
            this.editedItem.imageName =  text + date.getFullYear() + date.getMonth()  + date.getMilliseconds() + ".jpg";
           // отправляем файл на сервер
            let base64Image = this.file_srcs.replace("data:image/jpeg;base64,", "");
            this.uploadService
                .upload(base64Image, this.editedItem.imageName, oldimageName)
                .subscribe(data => {                 
                });
        }

        this.saveItem();

    }
    // отмена редактирования
    cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.items.pop();
            this.isNewRecord = false;
        }
        this.editedItem = null;
        this.statusMessage = '';
        this.file_srcs = "";
    }
    // удаление пользователя
    deleteItem(item: Drink) {

        if (confirm("Вы уверены, что хотите удалить напиток '" + item.name + "'?")) {
            this.dataService.deleteDrink(item.id).subscribe(data => {
                this.alertService.success('Напиток удален', true);
                    this.loadItems();

            },
                error => {
                    this.alertService.error(error._body);
                });
        }
            
    }

 

  
}
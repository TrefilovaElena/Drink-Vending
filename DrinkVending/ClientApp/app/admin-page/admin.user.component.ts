import {
    TemplateRef, ElementRef, ViewChild,
    ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/index';
import { Observable } from 'rxjs/Observable';
import { AlertService, DataServiceUser } from '../services/index';

@Component({
    selector: 'admin-user',
    templateUrl: './admin.user.component.html',
    providers: [AlertService,DataServiceUser]
})
export class AdminUserComponent implements OnInit {

    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

    editedItem: User;
    items: Array<User>;
    isNewRecord: boolean;
    loading = false;
    model: any = {};

    constructor(private dataService: DataServiceUser,
        private alertService: AlertService) {
        this.items = new Array<User>();
    }

   

    ngOnInit() {
                    this.loadItems(); 
    }

    //загрузка данных
    private loadItems() {
        this.dataService.getAll().subscribe((data: User[]) => {
            this.items = data;
        });
    }

    register() {
        this.dataService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Пользователь зарегистрирован.', true);
                this.loadItems(); 
            },
            error => {
                this.alertService.error(error._body);
            });
    }
       
    // сохраняем 
    saveAll(item: User) {
        this.loading = true;
        this.dataService.create(item)
            .subscribe(
            data => {
                this.alertService.success('Пользователь зарегистрирован.', true);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    // добавление 
    addItem() {

        this.editedItem = new User();
        this.items.push(this.editedItem);
        this.isNewRecord = true;
    }
   
    // отмена редактирования
    cancel() {
        this.loadItems();

    }
    // загружаем один из двух шаблонов
    loadTemplate(item: User) {
        if (this.editedItem && this.editedItem.id == item.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
    // удаление пользователя
    deleteItem(item: User) {

        if (confirm("Вы уверены, что хотите удалить пользователя '" + item.firstName + " " + item.lastName+ "'?")) {
            this.dataService.delete(item.id).subscribe(data => {
                this.alertService.success('Пользователь удален', true);
                this.loadItems();

            },
                error => {
                    this.alertService.error(error._body);
                });
        }

    }


    }

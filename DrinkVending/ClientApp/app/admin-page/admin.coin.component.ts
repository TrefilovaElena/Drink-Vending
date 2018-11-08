import { Component, OnInit } from '@angular/core';
import { DataServiceCoin, AlertService } from '../services/index';
import { Coin } from '../models/index';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'admin-coin',
    templateUrl: './admin.coin.component.html',
    providers: [AlertService, DataServiceCoin]
})
export class AdminCoinComponent implements OnInit {

    items: Array<Coin>;

    BlockSum: number;
    UnBlockSum: number;
    statusMessage: string;

    constructor(private dataService: DataServiceCoin,
        private alertService: AlertService) {
        this.items = new Array<Coin>();
    }

   

    ngOnInit() {
                    this.loadItems(); 
    }

    //загрузка данных
    private loadItems() {
        this.dataService.getCoins().subscribe((data: Coin[]) => {
            this.items = data;
        });
    }
       
       
    // сохраняем 
    saveItem(item: Coin) {
        if (item.quantity < 0) { item.quantity = 0 };
        this.dataService.updateCoin(item).subscribe(data => {
            this.alertService.success('Количество монет изменено', true);
                    this.loadItems();
        },
            error => {
                this.alertService.error(error._body);
            });        
    }
    
    // заблокировать монеты
    blockCoin(item: Coin) {
        this.dataService.blockCoin(item.id).subscribe(data => {
            this.alertService.success('Изменена блокировка монеты', true);
            this.loadItems();
        },
            error => {
                this.alertService.error(error._body);
            });

    }


    // отмена редактирования
    cancel() {
        this.loadItems();
        this.statusMessage = '';
    }
    // вычислени
    getTotal()
    {
        this.BlockSum = 0;
        this.UnBlockSum = 0;

        let sum = 0;
        let TotalSum = 0;
        let length = 0;
        if (!(this.items.length == null)) { length = this.items.length };

        for (var i = 0; i < length ; i++)
        {
            if (this.items[i].quantity)
            {
                sum = this.items[i].quantity * this.items[i].name;
                TotalSum += sum;
                if (this.items[i].canUse) { this.UnBlockSum += sum } else { this.BlockSum += sum };
            }
        }
        return TotalSum
    }

    }

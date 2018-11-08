import { Component, OnInit } from '@angular/core';
import { DataServiceCoin, DataServiceDrink, DataServicePurchase} from '../services/index';
import { Coin, Drink, Purchase} from '../models/index';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [DataServiceCoin, DataServiceDrink, DataServicePurchase]
})
export class HomeComponent implements OnInit {

    coins: Array<Coin>;
    drinks: Array<Drink>;
    purchase: Purchase;


    constructor(private dataServiceCoin: DataServiceCoin, private dataServiceDrink: DataServiceDrink, private dataServicePurchase: DataServicePurchase) {
        this.coins = new Array<Coin>();
        this.drinks = new Array<Drink>();
    }

    ngOnInit() {
        this.purchase = new Purchase;
        this.loadItems();
    }

    //загрузка данных
    private loadItems()
    {
        this.loadDrinks();
        this.loadCoins();
    }
    private loadDrinks() {
        this.dataServiceDrink.getDrinks().subscribe((data: Drink[]) => {
            this.drinks = data.filter(data => { return data.quantity > 0; });
        });
    }
    private loadCoins() {
        this.dataServiceCoin.getCoins().subscribe((data: Coin[]) => {
            this.coins = data;
        });
    }
    // добавить монету в покупку
    addCoin(coin: Coin)
    {
        this.purchase.AddCoin(coin); 
    }
    // добавить напиток в покупку
    addDrink(drink: Drink)
    {        
        this.purchase.AddDrink(drink);
    }
    ClearDrink()

{
        this.purchase.ClearDrink();
}   
    BuyDrinks()
    {
     
        this.dataServicePurchase.savePurchase(this.purchase)
          //  .map((res: Response) => res.json())
            .subscribe((data: string) => {
                if (!(data == "")) { alert("Ваша сдача: " + data) };
                this.purchase.ClearAll();
                this.ngOnInit();
            }
           );
    ;       
    }   
}

import { Coin } from './coin';
import { Drink } from './drink';

export class CoinLine {
    constructor(
        public coin?: Coin,
        public purchaseQuantity?: number) {
    }
}

export class DrinkLine {
    constructor(
        public drink?: Drink,
        public purchaseQuantity?: number) {
    }
}

export class Purchase {

    private coinCollection: Array<CoinLine> = new Array<CoinLine>();
    private drinkCollection: Array<DrinkLine> = new Array<DrinkLine>();

    //получить список монет из покупки
    public   get CoinLines(): Array<CoinLine> {
        return this.coinCollection;
    }
    //получить список напитков из покупки
    public get DrinkLines(): Array<DrinkLine> {
        return this.drinkCollection;
    }

    //поиск монеты в покупке по ее названию
    FindCoinLine(coinName: number): number
    {
        let kol = this.coinCollection.length;
        let _CoinLineIndex: number;
        i = -1;

        for (var i = 0; i < kol; i++) {
            if (coinName == this.coinCollection[i].coin.name) {
                _CoinLineIndex = i;
            };
        };
        return _CoinLineIndex
    }

    //Количество монет в покупке по названию монеты
    public CoinQuantity(coinName: number): number {

        let _CoinLine: number;
        let _CoinQuantity: number;

        _CoinLine = this.FindCoinLine(coinName);

        if (_CoinLine == undefined) {
            _CoinQuantity = 0
        }
        else {
            _CoinQuantity = this.coinCollection[_CoinLine].purchaseQuantity;
        };

        return _CoinQuantity;
    }

    // добавление напитка в покупку
    AddDrink(drink: Drink) {
        let newDrinkLine: DrinkLine = new DrinkLine(drink, 1);
        this.drinkCollection.push(newDrinkLine);
        return;
    }

    // добавление монет в покупку
    AddCoin(coin: Coin) {
        let _CoinLine: number;

        _CoinLine = this.FindCoinLine(coin.name);

        if (_CoinLine == undefined) {
            let newCoinLine: CoinLine = new CoinLine(coin, 1);
            this.coinCollection.push(newCoinLine);
        }
        else {
            this.coinCollection[_CoinLine].purchaseQuantity = this.coinCollection[_CoinLine].purchaseQuantity + 1;
        };
        return;
    }

    //Сумма внесенных денег
    public TotalSumCoin()
    {

         let kol = this.coinCollection.length;
         let sum = 0;

         for (var i = 0; i < kol; i++)
         {
             sum = sum + this.coinCollection[i].coin.name * this.coinCollection[i].purchaseQuantity;
         } ;
        return sum;
    }

    // количество напитков по Id
    public quantitydDrink(id: number)
    {
        let quantity: number;
        try {
            quantity = this.drinkCollection.find(x => x.drink.id == id).purchaseQuantity;
            if (quantity == undefined) { quantity = 0 };
        }
        catch
        {
            quantity = 0;
        }

        return quantity
    }

    //Сумма потраченных денег
   public TotalSumDrink()
    {
        let kol = this.drinkCollection.length;
        let sum = 0;
        for (var i = 0; i < kol; i++) {
            sum = sum + this.drinkCollection[i].drink.price * this.drinkCollection[i].purchaseQuantity;
        } ;
        return sum;
    }
  //Удаление данных из покупки ()
  ClearCoin() {
        this.coinCollection.splice(0, this.coinCollection.length);
   }
    ClearDrink() {
        this.drinkCollection.splice(0, this.drinkCollection.length);
    }
    ClearAll() {
        this.ClearDrink();
        this.ClearCoin();
    }
} 
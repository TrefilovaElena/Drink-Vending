var CoinLine = /** @class */ (function () {
    function CoinLine(coin, purchaseQuantity) {
        this.coin = coin;
        this.purchaseQuantity = purchaseQuantity;
    }
    return CoinLine;
}());
export { CoinLine };
var DrinkLine = /** @class */ (function () {
    function DrinkLine(drink, purchaseQuantity) {
        this.drink = drink;
        this.purchaseQuantity = purchaseQuantity;
    }
    return DrinkLine;
}());
export { DrinkLine };
var Purchase = /** @class */ (function () {
    function Purchase() {
        this.coinCollection = new Array();
        this.drinkCollection = new Array();
    }
    Object.defineProperty(Purchase.prototype, "CoinLines", {
        //получить список монет из покупки
        get: function () {
            return this.coinCollection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Purchase.prototype, "DrinkLines", {
        //получить список напитков из покупки
        get: function () {
            return this.drinkCollection;
        },
        enumerable: true,
        configurable: true
    });
    //поиск монеты в покупке по ее названию
    Purchase.prototype.FindCoinLine = function (coinName) {
        var kol = this.coinCollection.length;
        var _CoinLineIndex;
        i = -1;
        for (var i = 0; i < kol; i++) {
            if (coinName == this.coinCollection[i].coin.name) {
                _CoinLineIndex = i;
            }
            ;
        }
        ;
        return _CoinLineIndex;
    };
    //Количество монет в покупке по названию монеты
    Purchase.prototype.CoinQuantity = function (coinName) {
        var _CoinLine;
        var _CoinQuantity;
        _CoinLine = this.FindCoinLine(coinName);
        if (_CoinLine == undefined) {
            _CoinQuantity = 0;
        }
        else {
            _CoinQuantity = this.coinCollection[_CoinLine].purchaseQuantity;
        }
        ;
        return _CoinQuantity;
    };
    // добавление напитка в покупку
    Purchase.prototype.AddDrink = function (drink) {
        var newDrinkLine = new DrinkLine(drink, 1);
        this.drinkCollection.push(newDrinkLine);
        return;
    };
    // добавление монет в покупку
    Purchase.prototype.AddCoin = function (coin) {
        var _CoinLine;
        _CoinLine = this.FindCoinLine(coin.name);
        if (_CoinLine == undefined) {
            var newCoinLine = new CoinLine(coin, 1);
            this.coinCollection.push(newCoinLine);
        }
        else {
            this.coinCollection[_CoinLine].purchaseQuantity = this.coinCollection[_CoinLine].purchaseQuantity + 1;
        }
        ;
        return;
    };
    //Сумма внесенных денег
    Purchase.prototype.TotalSumCoin = function () {
        var kol = this.coinCollection.length;
        var sum = 0;
        for (var i = 0; i < kol; i++) {
            sum = sum + this.coinCollection[i].coin.name * this.coinCollection[i].purchaseQuantity;
        }
        ;
        return sum;
    };
    // количество напитков по Id
    Purchase.prototype.quantitydDrink = function (id) {
        var quantity;
        try {
            quantity = this.drinkCollection.find(function (x) { return x.drink.id == id; }).purchaseQuantity;
            if (quantity == undefined) {
                quantity = 0;
            }
            ;
        }
        catch (_a) {
            quantity = 0;
        }
        return quantity;
    };
    //Сумма потраченных денег
    Purchase.prototype.TotalSumDrink = function () {
        var kol = this.drinkCollection.length;
        var sum = 0;
        for (var i = 0; i < kol; i++) {
            sum = sum + this.drinkCollection[i].drink.price * this.drinkCollection[i].purchaseQuantity;
        }
        ;
        return sum;
    };
    //Удаление данных из покупки ()
    Purchase.prototype.ClearCoin = function () {
        this.coinCollection.splice(0, this.coinCollection.length);
    };
    Purchase.prototype.ClearDrink = function () {
        this.drinkCollection.splice(0, this.drinkCollection.length);
    };
    Purchase.prototype.ClearAll = function () {
        this.ClearDrink();
        this.ClearCoin();
    };
    return Purchase;
}());
export { Purchase };
//# sourceMappingURL=purchase.js.map
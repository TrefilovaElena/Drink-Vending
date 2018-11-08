using System.Collections.Generic;
using System.Linq;
using DrinkVending.Entities;
using DrinkVending.Helpers;

namespace DrinkVending.Infrastructure.Repositories
{
    public class PurchaseRepository : IPurchaseRepository
    {
        ApplicationContext db;
        public  PurchaseRepository(ApplicationContext context)
        {
            db = context;
        }
        public string PurchaseSave(Purchase purchase)
        {
            
            decimal PurchaseSum = 0; //сумма покупки
            int CoinsSum = 0;   //сумма внесенных монет   


            //обновляем напитки 
            List<DrinkLine> drinkLines = purchase.DrinkLines;
            for (int i = 0; i < drinkLines.Count; i++)
            {
                Drink drink = db.Drinks.FirstOrDefault(x => x.Id == drinkLines[i].drink.Id);
                if (drink != null)
                {
                    drink.Quantity = drink.Quantity- drinkLines[i].purchaseQuantity;
                    PurchaseSum += drink.Price;
                    db.Update(drink);
                    db.SaveChanges();
                }
            }

            //обновляем количество монет 
            List<CoinLine> coinLines = purchase.CoinLines;
            for (int i = 0; i < coinLines.Count; i++)
            {
                Coin coin = db.Coins.FirstOrDefault(x => x.Name == coinLines[i].coin.Name);
                if (coin != null)
                {
                    coin.Quantity = coin.Quantity + coinLines[i].purchaseQuantity;
                    CoinsSum += coinLines[i].purchaseQuantity * coin.Name;
                    db.Update(coin);
                    db.SaveChanges();
                }
            }

            string OutCoinMessage = "";
            decimal outCoinSum = CoinsSum - PurchaseSum; //сумма сдачи
            if (outCoinSum > 0)
                {           
            List<CoinLine> OutCoinList= CalculateExpression.OutCoin(outCoinSum, db.Coins.ToList());

                //обновляем количество монет и формируем строку сдачи
                if (!(OutCoinList==null))
                { coinLines = OutCoinList;

                    for (int i = 0; i < coinLines.Count; i++)
                    {
                        Coin coin = db.Coins.FirstOrDefault(x => x.Name == coinLines[i].coin.Name);
                        if (coin != null)
                        {
                            coin.Quantity = coin.Quantity - coinLines[i].purchaseQuantity;
                            OutCoinMessage = OutCoinMessage + " Монета: " + coinLines[i].coin.Name + ": количество: " + coinLines[i].purchaseQuantity;
                            db.Update(coin);
                            db.SaveChanges();
                        }
                    }    
            }
                else
                { OutCoinMessage = "в автомате не достаточно монет для сдачи." ;}
            }
            return (OutCoinMessage);
        }

    }
}

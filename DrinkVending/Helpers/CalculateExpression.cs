using DrinkVending.Entities;
using System.Collections.Generic;
using System.Linq;

namespace DrinkVending.Helpers
{
    public static class CalculateExpression
    {
        
            public static List<CoinLine> OutCoin(decimal OutCoinSum, List<Coin> Coins)
        {
            List<Coin> SortedCoins = Coins
                               .Where(p => p.Quantity>0)
                               .OrderByDescending(a => a.Name)
                               .ToList();
            int i = 0;
            int OutCoinQuantity;
            List<CoinLine> outCoin = new List<CoinLine>();          
            while ((OutCoinSum > 0) & (i < SortedCoins.Count))//пока сумма сдачи больше нуля и больше очередной монеты и не просмотрены все монеты 
            {                
                OutCoinQuantity = (int)(OutCoinSum - OutCoinSum % SortedCoins[i].Name) / SortedCoins[i].Name;//высчитываем целое от деления
                if (SortedCoins[i].Quantity < OutCoinQuantity)//если количество монет меньше, чем нужно, берем только сколько есть
                {
                    OutCoinQuantity = SortedCoins[i].Quantity;
                };             
                if (OutCoinQuantity > 0)//если монеты текущего достоинства есть в наличии и они нужны: OutCoinQuantity > 0
                {

                    outCoin.Add(new CoinLine() {coin = SortedCoins[i], purchaseQuantity=OutCoinQuantity });
                     OutCoinSum = OutCoinSum - OutCoinQuantity * SortedCoins[i].Name;
                }
                i++;
            };


            return outCoin;
        }

    }
}

using System.Collections.Generic;
using System.Linq;


namespace DrinkVending.Entities
{
    public class Purchase
    {
        private List<CoinLine> coinCollection = new List<CoinLine>();
        private List<DrinkLine> drinkCollection = new List<DrinkLine>();


        public List<CoinLine> CoinLines
        {
            get { return coinCollection; }
        }
        public List<DrinkLine> DrinkLines
        {
            get { return drinkCollection; }
        }

    }

    public class DrinkLine
    {
        public Drink drink { get; set; }
        public int purchaseQuantity { get; set; }
    }
    public class CoinLine
    {
        public Coin coin { get; set; }
        public int purchaseQuantity { get; set; }
    }
}

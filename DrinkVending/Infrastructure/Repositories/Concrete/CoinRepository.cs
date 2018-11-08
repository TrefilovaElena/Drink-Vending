using System.Collections.Generic;
using System.Linq;
using DrinkVending.Entities;


namespace DrinkVending.Infrastructure.Repositories
{

    public class CoinRepository : ICoinRepository
    {
        ApplicationContext db;

        public CoinRepository(ApplicationContext context)
        {
            db = context; 
        }

        public IEnumerable<Coin> GetAll()
        {
            return db.Coins.ToList();
        }

        public Coin GetById(int Id)
        {
            Coin coin = db.Coins.FirstOrDefault(x => x.Id == Id);
            return coin;
        }
        public void Update(Coin coin)
        {
            db.Update(coin);
            db.SaveChanges();
        }

        public void ChangeCanUse(int id)
        {
            Coin coin = db.Coins.FirstOrDefault(x => x.Id == id);
            if (coin != null)
            {
                coin.CanUse = !coin.CanUse;
                db.Update(coin);
                db.SaveChanges();
            }
        }
    }
}

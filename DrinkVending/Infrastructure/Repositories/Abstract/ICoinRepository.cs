using System.Collections.Generic;
using DrinkVending.Entities;

namespace DrinkVending.Infrastructure.Repositories
{
    public interface ICoinRepository
    {
        IEnumerable<Coin> GetAll();
        Coin GetById(int id);
        void Update(Coin coin);
        void ChangeCanUse(int id);
   }
}

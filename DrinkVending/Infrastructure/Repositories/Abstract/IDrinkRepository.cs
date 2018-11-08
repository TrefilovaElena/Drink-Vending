using System.Collections.Generic;
using DrinkVending.Entities;

namespace DrinkVending.Infrastructure.Repositories
{
    public interface IDrinkRepository
    {
        IEnumerable<Drink> GetAll();
        Drink GetById(int id);
        Drink Create(Drink drink);
        void Update(Drink drink);
        void Delete(int Id);
    }
}

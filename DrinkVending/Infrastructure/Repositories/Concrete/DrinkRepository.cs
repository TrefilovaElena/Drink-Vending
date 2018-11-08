using System.Collections.Generic;
using System.Linq;
using DrinkVending.Entities;
using Microsoft.AspNetCore.Hosting;


namespace DrinkVending.Infrastructure.Repositories
{
    public class DrinkRepository : IDrinkRepository
    {
        ApplicationContext db;
        IHostingEnvironment _appEnvironment;

        public DrinkRepository(ApplicationContext context, IHostingEnvironment appEnvironment)
        {
            db = context;
            _appEnvironment = appEnvironment;
        }

        public IEnumerable<Drink> GetAll()
        {
            return db.Drinks.ToList();
        }

        public Drink GetById(int Id)
        {
            Drink drink = db.Drinks.FirstOrDefault(x => x.Id == Id);
            return drink;
        }
        public void Update(Drink drink)
        {
            db.Update(drink);
            db.SaveChanges();
        }

        public Drink Create(Drink drink)
        {
            db.Drinks.Add(drink);
            db.SaveChanges();
            return drink;
        }

        public void Delete(int Id)
        {
            Drink drink = db.Drinks.FirstOrDefault(x => x.Id == Id);
            if (drink != null)
            {
                db.Drinks.Remove(drink);
                db.SaveChanges();
                if (drink.ImageName != "" || drink.ImageName != "0.jpg")
                {
                    string filePath = _appEnvironment.WebRootPath + "/files/" + drink.ImageName;
                    try
                    {
                        System.IO.File.Delete(filePath);
                    }
                    catch
                    {
                    }
                }
            }


        }
    }
}

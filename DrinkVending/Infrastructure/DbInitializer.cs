using DrinkVending.Entities;
using System.Linq;
using DrinkVending.Helpers;
using System;

namespace DrinkVending.Infrastructure
{
    public static class DbInitializer
    {
        private static ApplicationContext db;

        public static void Initialize(IServiceProvider serviceProvider)
        {
            db = (ApplicationContext)serviceProvider.GetService(typeof(ApplicationContext)); ;
            InitializeUser();
            InitializeDrinks();
            InitializeCoins();

        }
        private static void InitializeUser()
        {
            if (!db.Users.Any())
            {
                byte[] passwordHash, passwordSalt;
                PasswordHasher.CreatePasswordHash("1", out passwordHash, out passwordSalt);
                db.Users.Add(new User { Username = "1", FirstName = "1", LastName = "1", Status = SystemRoles.Administrator, PasswordHash = passwordHash, PasswordSalt = passwordSalt });
                db.SaveChanges();
            }
        }
        private static void InitializeDrinks()
        {
            if (!db.Drinks.Any())
            {
                db.Drinks.Add(new Drink { Name = "Кока-кола", Price = 60, Quantity = 10, ImageName = "0.jpg" });
                db.Drinks.Add(new Drink { Name = "Пепси-кола", Price = 78, Quantity = 7, ImageName = "0.jpg" });
                db.Drinks.Add(new Drink { Name = "Минеральная вода", Price = 30, Quantity = 6, ImageName = "0.jpg" });
                db.SaveChanges();
            }
        }
        private static void InitializeCoins()
        {
            if (!db.Coins.Any())
            {
                db.Coins.Add(new Coin { Name = 1, CanUse = true, Quantity = 10 });
                db.Coins.Add(new Coin { Name = 2, CanUse = true, Quantity = 7 });
                db.Coins.Add(new Coin { Name = 5, CanUse = true, Quantity = 6 });
                db.Coins.Add(new Coin { Name = 10, CanUse = true, Quantity = 6 });
                db.SaveChanges();
            }
        }
    }
}

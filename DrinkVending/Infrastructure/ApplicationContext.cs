using Microsoft.EntityFrameworkCore;
using DrinkVending.Entities;

namespace DrinkVending.Infrastructure
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }

        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Coin> Coins { get; set; }
        public DbSet<User> Users { get; set; }
}


}

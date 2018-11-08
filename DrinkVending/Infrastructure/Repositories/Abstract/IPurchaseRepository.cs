using DrinkVending.Entities;

namespace DrinkVending.Infrastructure.Repositories
{ 
   public interface IPurchaseRepository
    {
        string PurchaseSave(Purchase purchase);
    }
}

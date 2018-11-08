using Microsoft.AspNetCore.Mvc;
using DrinkVending.Entities;
using DrinkVending.Infrastructure.Repositories;
using DrinkVending.Helpers;

namespace DrinkVending.Controllers
{
    [Produces("application/json")]
    [Route("api/Purchase")]
    public class PurchaseController : Controller
    {
        private IPurchaseRepository _purchaseRepository;

        public PurchaseController(IPurchaseRepository purchaseRepository)
        {
            _purchaseRepository = purchaseRepository;
        }


        [HttpPost]
        public IActionResult SetPurchase([FromBody] Purchase purchase)
        {
            try
            { // save 
                string outcoin=_purchaseRepository.PurchaseSave(purchase);
                return Ok(outcoin);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }

        }
    }
}

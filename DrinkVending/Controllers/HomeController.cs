using Microsoft.AspNetCore.Mvc;

namespace DrinkVending.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "Home";
            return View();
        }
        public IActionResult Error()
        {
            return View();
        }
    }
}
using Microsoft.AspNetCore.Mvc;

namespace CohemGamesFEDev.Controllers
{
    public class ShopController : Controller
    {
        private readonly ILogger<ShopController> _logger;

        public ShopController(ILogger<ShopController> logger)
        {
            _logger = logger;
        }

        public IActionResult Shop()
        {
            return View();
        }
    }
}

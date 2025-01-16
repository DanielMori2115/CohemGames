using Microsoft.AspNetCore.Mvc;

namespace CohemGamesFEDev.Controllers
{
    public class Administration : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

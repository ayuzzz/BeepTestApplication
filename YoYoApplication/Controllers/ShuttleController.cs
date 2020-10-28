using YoYoApplication.Abstractions.Services;
using Microsoft.AspNetCore.Mvc;


namespace YoYoApplication.Controllers
{
    [Route("api/[controller]")]
    public class ShuttleController : Controller
    {
        IShuttleService _shuttleService;
        public ShuttleController(IShuttleService shuttleService)
        {
            _shuttleService = shuttleService;
        }

        [HttpGet]
        [Route("GetShuttleDetails")]
        public JsonResult GetShuttleDetails()
        {
            return Json(_shuttleService.GetShuttleDetails());
        }

        [HttpGet]
        [Route("GetPlayerDetails")]
        public JsonResult GetPlayerDetails()
        {
            return Json(_shuttleService.GetPlayerDetails());
        }
    }
}

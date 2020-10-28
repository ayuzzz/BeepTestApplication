using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YoYoApplication.Models;

namespace YoYoApplication.Abstractions.Services
{
    public interface IShuttleService
    {
        List<ShuttleDetails> GetShuttleDetails();
        List<PlayerDetails> GetPlayerDetails();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YoYoApplication.Models;

namespace YoYoApplication.Abstractions.Repositories
{
    public interface IShuttleRepository
    {
        List<ShuttleDetails> GetShuttleDetailsFromJson();
        List<PlayerDetails> GetPlayerDetailsFromJson();
    }
}

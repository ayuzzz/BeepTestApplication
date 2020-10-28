using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YoYoApplication.Abstractions.Repositories;
using YoYoApplication.Abstractions.Services;
using YoYoApplication.Models;

namespace YoYoApplication.Services
{
    public class ShuttleService : IShuttleService
    {
        IShuttleRepository _shuttleRepository;
        public ShuttleService(IShuttleRepository shuttleRepository)
        {
            _shuttleRepository = shuttleRepository;
        }

        public List<ShuttleDetails> GetShuttleDetails()
        {
            return _shuttleRepository.GetShuttleDetailsFromJson();
        }

        public List<PlayerDetails> GetPlayerDetails()
        {
            return _shuttleRepository.GetPlayerDetailsFromJson();
        }
    }
}

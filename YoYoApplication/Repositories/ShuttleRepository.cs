using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using YoYoApplication.Abstractions.Repositories;
using YoYoApplication.Models;

namespace YoYoApplication.Repositories
{
    public class ShuttleRepository : IShuttleRepository
    {
        public List<ShuttleDetails> GetShuttleDetailsFromJson()
        {
            List<ShuttleDetails> shuttleDetails = new List<ShuttleDetails>();

            using (StreamReader r = new StreamReader("DBfiles/fitnessrating_beeptest.json"))
            {
                string json = r.ReadToEnd();
                shuttleDetails = JsonConvert.DeserializeObject<List<ShuttleDetails>>(json);
            }

            return shuttleDetails;
        }

        public List<PlayerDetails> GetPlayerDetailsFromJson()
        {
            List<PlayerDetails> playerDetails = new List<PlayerDetails>();

            using (StreamReader r = new StreamReader("DBfiles/Players.json"))
            {
                string json = r.ReadToEnd();
                playerDetails = JsonConvert.DeserializeObject<List<PlayerDetails>>(json);
            }

            return playerDetails;
        }
    }
}

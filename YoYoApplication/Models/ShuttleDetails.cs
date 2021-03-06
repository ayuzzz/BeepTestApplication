﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YoYoApplication.Models
{
    public class ShuttleDetails
    {
        public long AccumulatedShuttleDistance { get; set; }
        public int SpeedLevel { get; set; }
        public int ShuttleNo { get; set; }
        public string Speed { get; set; }
        public decimal LevelTime { get; set; }
        public string CommulativeTime { get; set; }
        public string StartTime { get; set; }
        public decimal ApproxVo2Max { get; set; }
    }
}

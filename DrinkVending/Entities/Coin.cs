using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DrinkVending.Entities
{
    public class Coin
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public int Quantity { get; set; }
        public bool CanUse { get; set; }
    }
}

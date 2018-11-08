using System.ComponentModel.DataAnnotations;
namespace DrinkVending.Dtos
{
    public class CoinDto
    {
        public int Id { get; set; }
        [Required]
        public int Name { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Пожалуйста, введите положительное значение для количества")]
        public int Quantity { get; set; }
        [Required]
        public bool CanUse { get; set; }
    }
}

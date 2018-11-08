using System.ComponentModel.DataAnnotations;
namespace DrinkVending.Dtos
{
    public class DrinkDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        [Display(Description = "Название напитка",  Prompt = "Введите название напитка")]
        public string Name { get; set; }
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Пожалуйста, введите положительное значение для цены")]
        public decimal Price { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Пожалуйста, введите положительное значение для количества")]
        public int Quantity { get; set; }
        public string ImageName { get; set; }

    }
}

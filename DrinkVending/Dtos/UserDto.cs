using System.ComponentModel.DataAnnotations;
namespace DrinkVending.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        [StringLength(30)]
        public string FirstName { get; set; }
        [StringLength(30)]
        public string LastName { get; set; }
        [Required]
        [StringLength(30)]
        [Display(Description = "Имя пользователя", Name = "Username", Prompt = "Введите имя пользователя")]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [StringLength(30)]
        [Display(Description = "Пароль", Name = "Password", Prompt = "Введите пароль для пользователя")]
        public string Password { get; set; }
    }
}
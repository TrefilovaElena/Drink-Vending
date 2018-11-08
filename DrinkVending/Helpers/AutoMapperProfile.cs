using AutoMapper;
using DrinkVending.Dtos;
using DrinkVending.Entities;

namespace DrinkVending.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<Coin, CoinDto>();
            CreateMap<CoinDto, Coin>();

            CreateMap<Drink, DrinkDto>();
            CreateMap<DrinkDto, Drink>();

        }
    }
}
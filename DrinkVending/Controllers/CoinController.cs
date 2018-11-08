using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DrinkVending.Entities;
using DrinkVending.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using DrinkVending.Dtos;
using AutoMapper;
using DrinkVending.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace DrinkVending.Controllers
{
    [Produces("application/json")]
    [Route("api/Coin")]
  //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CoinController : Controller
    {
        private ICoinRepository _coinRepository;
        private IMapper _mapper;

        public CoinController(ICoinRepository coinRepository, IMapper mapper)
        {
            _coinRepository = coinRepository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var coins = _coinRepository.GetAll();
            var coinDtos = _mapper.Map<IList<CoinDto>>(coins);
            return Ok(coinDtos);
        }

        [AllowAnonymous]
        [HttpGet("{Id}")]
        public IActionResult GetById(int Id)
        {
            var coin = _coinRepository.GetById(Id);
            var coinDto = _mapper.Map<CoinDto>(coin);
            return Ok(coinDto);
        }


        [HttpPut("{Id}")]
        public IActionResult Update(int Id, [FromBody]CoinDto coinDto)
        {
            // map dto to entity and set id
            var coin = _mapper.Map<Coin>(coinDto);
            if (ModelState.IsValid)
            {
                try
                {
                    // save 
                    _coinRepository.Update(coin);
                    return Ok();
                }
                catch (AppException ex)
                {
                    // return error message if there was an exception
                    return BadRequest(ex.Message);
                }
        }
            return BadRequest(ModelState);
    }


    [HttpDelete("{Id}")]
        public IActionResult ChangeCanUse(int id)
        {
            try
            {   // save 
                _coinRepository.ChangeCanUse(id);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

    }
}
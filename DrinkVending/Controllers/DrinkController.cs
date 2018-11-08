using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DrinkVending.Entities;
using DrinkVending.Infrastructure.Repositories;
using DrinkVending.Dtos;
using AutoMapper;
using DrinkVending.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace DrinkVending.Controllers
{
     [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/Drink")]
    public class DrinkController : Controller
    {
        private IDrinkRepository _drinkRepository;
        private IMapper _mapper;

        public DrinkController(IDrinkRepository drinkRepository, IMapper mapper)
        {
            _drinkRepository = drinkRepository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var drinks = _drinkRepository.GetAll();
            var drinkDtos = _mapper.Map<IList<DrinkDto>>(drinks);
            return Ok(drinkDtos);
        }

        [AllowAnonymous]
        [HttpGet("{Id}")]
        public IActionResult Get(int Id)
        {
            var drink = _drinkRepository.GetById(Id);
            var drinkDto = _mapper.Map<DrinkDto>(drink);
            return Ok(drinkDto);
        }


        [HttpPost]
        public IActionResult Create([FromBody]DrinkDto drinkDto)
        {
            var drink = _mapper.Map<Drink>(drinkDto);
            if (ModelState.IsValid)
            {
                try
                {
                    // save 
                    _drinkRepository.Create(drink);
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

        [HttpPut("{Id}")]
        public IActionResult Update(int Id, [FromBody]DrinkDto drinkDto)
        {
            var drink = _mapper.Map<Drink>(drinkDto);
            if (ModelState.IsValid)
            {
                try
                {
                    // save 
                    _drinkRepository.Update(drink);
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
        public IActionResult Delete(int Id)
        {
            _drinkRepository.Delete(Id);
            return Ok();
        }
    }
}

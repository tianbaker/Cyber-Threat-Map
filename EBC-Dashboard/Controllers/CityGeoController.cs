using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EBC_Dashboard.Models;
using EBC_Dashboard.Business;
using System.Linq;

namespace EBC_Dashboard.Controllers
{
    

    [Route("api/{citygeo}/{country}/{city}")]
    [ApiController]
    public class CityGeoController : ControllerBase
    {
        private readonly EBCdbContext _dbContext;
        public CityGeoController(EBCdbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public CityGeo Get(string country, string city)
        {

            var iCity = _dbContext.CityGeo.FirstOrDefault(x=> (x.City == city || string.IsNullOrEmpty(city)) && (x.Country == country || string.IsNullOrEmpty(country) || country == "unknow"));
            if(iCity != null)
            {
                return iCity;
            }
            else
            {
                return defaultCity();
            }
            
        }

        public CityGeo defaultCity()
        {
            CityGeo iCity = new CityGeo();
            iCity.CityId = 177;
            iCity.Country = "US";
            iCity.Latitude = "39.828175";
            iCity.Longitude = "-98.5795";
            iCity.City = "Central point of US";
            return iCity;
        }

      
    }

    
}
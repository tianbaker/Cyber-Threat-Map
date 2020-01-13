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
    

    [Route("api/{countrygeo}/{country}")]
    [ApiController]
    public class CountryGeoController : ControllerBase
    {
        private readonly EBCdbContext _dbContext;
        public CountryGeoController(EBCdbContext dbContext)
        {
            _dbContext = dbContext;
        }
              

        [HttpGet]
        public CountryGeo Get(string country)
        {

            var iCountry = _dbContext.CountryGeo.FirstOrDefault(x => x.Country == country || string.IsNullOrEmpty(country));
            if (iCountry != null)
            {
                return iCountry;
            }
            else
            {
                return defaultCountry();
            }

        }

       

        public CountryGeo defaultCountry()
        {
            CountryGeo iCountry = new CountryGeo();
            iCountry.CountryId = 177;
            iCountry.Country = "US";
            iCountry.Latitude = "39.828175";
            iCountry.Longitude = "-98.5795";
            return iCountry;
        }
    }

    
}
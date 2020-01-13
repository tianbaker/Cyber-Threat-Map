using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EBC_Dashboard.Models;

namespace EBC_Dashboard.Business
{
    public class EBCdbContext : DbContext
    {
        private readonly string connectionString;
        public EBCdbContext(string connectionString) : base()
        {
            this.connectionString = connectionString;
        }

        public EBCdbContext(DbContextOptions<EBCdbContext> options) : base(options)
        {

        }

        public DbSet<CityGeo> CityGeo { get; set; }

        public DbSet<CountryGeo> CountryGeo { get; set; }
    }
}

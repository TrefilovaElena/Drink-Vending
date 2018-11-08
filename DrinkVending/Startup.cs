using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.Webpack;
using DrinkVending.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using DrinkVending.Helpers;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using DrinkVending.Infrastructure;

namespace DrinkVending
{
    public class Startup
    {

        public static IConfigurationRoot Configuration { get; set; }

        //   public IConfiguration Configuration { get; set }

        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json");

            Configuration = builder.Build();
         //   services.AddCors();
            services.AddMvc();
            services.AddAutoMapper();

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure MyDatabase
            string connectionString = Configuration.GetConnectionString("MyDatabase");
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));


            // configure DI for application services
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPurchaseRepository, PurchaseRepository>();
            services.AddScoped<IDrinkRepository, DrinkRepository>();
            services.AddScoped<ICoinRepository, CoinRepository>();


            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }

            app.UseMvc();

            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();


            // global cors policy
            //  app.UseCors(x => x
            //    .AllowAnyOrigin()
            //  .AllowAnyMethod()
            //.AllowAnyHeader()
            //.AllowCredentials());

            DbInitializer.Initialize(app.ApplicationServices);

            app.Run(async (context) =>
            {

               context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
            });

            
        }
    }
}
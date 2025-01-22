using CohemGamesBDDev.Common.Utils;
using CohemGamesBDDev.Configuration;
using CohemGamesBDDev.Configuration.StartupExtensions;
using CohemGamesBDDev.DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(defaultConnectionString));
builder.Services.AddServices();
builder.Services.AddRepositories();
builder.Services.AddValidators();
builder.Services.AddAutoMapper(typeof(CohemProfile));
builder.Services.AddControllersConfig();
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddSingleton<GlobalSettings>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

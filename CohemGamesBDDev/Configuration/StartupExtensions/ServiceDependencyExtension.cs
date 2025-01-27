using CohemGamesBDDev.Services;

namespace CohemGamesBDDev.Configuration.StartupExtensions;

public static class ServiceDependencyExtension
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IUsuarioService, UsuarioService>();
    }
}
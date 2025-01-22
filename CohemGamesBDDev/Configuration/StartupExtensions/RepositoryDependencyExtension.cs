using CohemGamesBDDev.DataAccess.Repository;
using CohemGamesBDDev.DataAccess.Repository.Base;

namespace CohemGamesBDDev.Configuration.StartupExtensions;

public static class RepositoryDependencyExtension
{
    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddCustomsRepositories();
    }

    private static void AddCustomsRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUsuarioRepository, UsuarioRepository>();
    }
}
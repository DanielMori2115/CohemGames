using System.Net.Mime;
using CohemGamesBDDev.Common.Utils;
using CohemGamesBDDev.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace CohemGamesBDDev.Configuration.StartupExtensions;

/// <summary>
/// ControllersDependency Extension
/// </summary>
public static class ControllersDependencyExtension
{
    /// <summary>
    /// AddUnitedControllers
    /// </summary>
    public static void AddControllersConfig(this IServiceCollection services)
    {
        _ = services
            .AddControllersWithFilters()
            .AddControllersOptions();
    }

    private static IMvcBuilder AddControllersWithFilters(this IServiceCollection services)
    {
        return services.AddControllers()
            .ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = GetValidationFailedResult;
            });
    }

    private static ValidationFailedResult GetValidationFailedResult(ActionContext context)
    {
        var result = new ValidationFailedResult(context.ModelState);

        result.ContentTypes.Add(MediaTypeNames.Application.Json);

        return result;
    }

    private static IMvcBuilder AddControllersOptions(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddJsonOptions(_ => StringHelper.GetReadJsonOptions());
    }
}
using Microsoft.OpenApi.Models;

namespace JurisProdenciaBE.Configurations.StartupExtensions;

public static class OpenApiOperationExtension
{
    /// <summary>
    /// AddOptionalParameter
    /// </summary>
    public static void AddOptionalParameter(this OpenApiOperation operation, string name, string description, string type = "String")
    {
        operation.AddParameter(false, name, description, type);
    }

    /// <summary>
    /// AddOptionalParameter
    /// </summary>
    public static void AddRequiredParameter(this OpenApiOperation operation, string name, string description, string type = "String")
    {
        operation.AddParameter(false, name, description, type);
    }

    private static void AddParameter(this OpenApiOperation operation, bool isRequired, string name, string description, string type = "String")
    {
        operation.Parameters.Add(new OpenApiParameter
        {
            Name = name,
            In = ParameterLocation.Header,
            Schema = new OpenApiSchema { Type = type },
            Required = isRequired,
            Description = description
        });
    }
}
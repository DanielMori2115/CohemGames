using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CohemGamesBDDev.Dtos;

/// <summary>
/// ValidationFailedResult
/// </summary>
[ExcludeFromCodeCoverage]
public class ValidationFailedResult : ObjectResult
{
    /// <summary>
    /// ValidationFailedResult
    /// </summary>
    public ValidationFailedResult(ModelStateDictionary modelState) : base(modelState)
    {
        StatusCode = StatusCodes.Status422UnprocessableEntity;
    }
}
using System.Text.Json;
using CohemGamesBDDev.Common.Utils;

namespace CohemGamesBDDev.Common.Annotations;

[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public static class AnnotationHelper
{
    public static string ToJsonTokenStringType(this Utf8JsonReader reader)
    {
        string stringValue;

        if (reader.TokenType == JsonTokenType.String)
        {
            if (reader.TryGetDateTime(out var dateTimeValue)) stringValue = dateTimeValue.ToString(DateFormat.UtcSlashWithoutSeconds);
            else stringValue = reader.GetString();
        }
        else if (reader.TokenType is JsonTokenType.True or JsonTokenType.False) stringValue = reader.GetBoolean().ToString();
        else if (reader.TokenType is JsonTokenType.Number) stringValue = reader.ToJsonTokenNumericType().ToString();
        else
        {

            using var doc = JsonDocument.ParseValue(ref reader);

            return doc.RootElement.ToString();
        }

        return stringValue;
    }

    public static object ToJsonTokenNumericType(this Utf8JsonReader reader)
    {
        object stringValue;

        if (reader.TryGetInt64(out var intValue)) stringValue = intValue;
        else if (reader.TryGetDouble(out var doubleValue)) stringValue = doubleValue;
        else if (reader.TryGetDecimal(out var decimalValue)) stringValue = decimalValue;
        else return 0;

        return stringValue;
    }

    public static bool ToJsonTokenBoolType(this Utf8JsonReader reader)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            var booleanValue = reader.GetString()?.ToInvariantLower();

            return booleanValue == "true";
        }

        return reader.GetBoolean();
    }
}
using System.Globalization;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using CohemGamesBDDev.Common.Annotations;

namespace CohemGamesBDDev.Common.Utils;

public static class StringHelper
{
    public static string ToJson(this object content)
    {
        if (content == null) return null;

        var options = GetWriteJsonOptions();

        return JsonSerializer.Serialize(content, options);
    }

    public static string ToJson<T>(this T content)
    {
        if (content == null) return null;

        var options = GetWriteJsonOptions();

        return JsonSerializer.Serialize(content, options);
    }

    public static string ToInvariantLower(this string text)
    {
        return string.IsNullOrEmpty(text) ? text : text.ToLower(CultureInfo.InvariantCulture);
    }

    public static string ToInvariantUpper(this string text)
    {
        return string.IsNullOrEmpty(text) ? text : text.ToUpper(CultureInfo.InvariantCulture);
    }

    public static T ToDeserialize<T>(this string content)
    {
        var options = GetReadJsonOptions();

        return JsonSerializer.Deserialize<T>(content, options);
    }

    public static JsonSerializerOptions GetWriteJsonOptions()
    {
        var options = new JsonSerializerOptions
        {
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true,
            ReferenceHandler = ReferenceHandler.IgnoreCycles
        };

        options.Converters.Add(new BoolConverter());
        options.Converters.Add(new StringConverter());

        return options;
    }

    public static JsonSerializerOptions GetReadJsonOptions()
    {
        var options = GetWriteJsonOptions();

        return options;
    }

    public static void ForEach<T>(this IEnumerable<T> enumeration, Action<T> action)
    {
        foreach (T item in enumeration)
        {
            action(item);
        }
    }
   
    public static string RemoveBreakLines(this string text, string key)
    {
        if (string.IsNullOrEmpty(text)) return string.Empty;

        return text.Replace("\r\n", key)
            .Replace("\n", key)
            .Replace("\r", key);
    }

    private static string RemoveCommon(this string text)
    {
        if (string.IsNullOrEmpty(text)) return string.Empty;

        text = text.Replace("'", "''");

        return text.Replace("\"", "\"\"");
    }

    private static string RemoveAccents(this string text)
    {
        if (string.IsNullOrEmpty(text)) return string.Empty;

        var sbReturn = new StringBuilder();

        var arrayText = text.Normalize(NormalizationForm.FormD).ToCharArray();

        foreach (var letter in arrayText)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(letter) != UnicodeCategory.NonSpacingMark)
                sbReturn.Append(letter);
        }
        return sbReturn.ToString();
    }
}
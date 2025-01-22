using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace CohemGamesBDDev.Common.Utils;

[ExcludeFromCodeCoverage]
public static class FileHelper
{
    private const string ProjectPrefix = "Juris";

    public static T ToCopy<T>(this T obj)
    {
        if (obj == null) return default;

        var serialized = obj.ToJson();

        var response = serialized.ToDeserialize<T>();

        return response;
    }

    public static T GetObject<T>(string fileName)
    {
        var fileString = string.Empty;

        var assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(x => x.FullName?.StartsWith(ProjectPrefix) ?? false);

        foreach (var assembly in assemblies)
        {
            var name = GetManifestResource(assembly, fileName);

            if (string.IsNullOrEmpty(name)) continue;

            using var stream = assembly.GetManifestResourceStream(name);

            if (stream == null) return default;

            using TextReader tr = new StreamReader(stream);

            fileString = tr.ReadToEnd();

            break;
        }

        if (string.IsNullOrEmpty(fileString)) return default;
        if (typeof(T) == typeof(string)) return (T)Convert.ChangeType(fileString, typeof(T));

        return fileString.ToDeserialize<T>();
    }

    private static string GetManifestResource(Assembly assembly, string fileName)
    {
        try
        {
            var names = assembly.GetManifestResourceNames().ToList();

            return names.Single(str => str.EndsWith(fileName));
        }
        catch (Exception e) when (e is InvalidOperationException)
        {
            return string.Empty;
        }
    }
}

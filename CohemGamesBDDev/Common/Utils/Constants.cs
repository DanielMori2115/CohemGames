namespace CohemGamesBDDev.Common.Utils;

[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public static class MimeTypes
{
    public static string ApplicationJson => "application/json";
}

[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public static class DateFormat
{
    public const string UtcSlashWithoutSeconds = "MM/dd/yyyy HH:mm:ss";
    public const string UtcCompleteSlashDate = "MM/dd/yyyy'T'HH:mm:ss.fffffff'Z'";
    public const string UtcIncompleteSlashDate = "MM/dd/yyyy'T'HH:mm:ss";
    public const string UtcCompleteWithAmPm = "M/d/yyyy h:mm:ss tt";
    public const string UtcCompleteDashDate = "yyyy-MM-dd'T'HH:mm:ss.fffffff'Z'";
    public const string UtcIncompleteDashDate = "yyyy-MM-dd'T'HH:mm:ss";
    public const string UtcIncompleteDashDateWithEmpty = "yyyy-MM-dd' 'HH:mm:ss";
    public const string UtcIncompleteWithoutSecondsDashDate = "YYYY-MM-DD'T'HH:mm";
    public const string DefaultSlashDate = "MM/dd/yyyy hh:mm:ss tt";
    public const string DefaultDashDate = "yyyy-MM-dd hh:mm:ss";
    public const string MonthName = "MMM";
}

[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public static class UrlRestApis
{
    public const string LISTAR_USER = "Usuario/Listar";
    public const string LISTAR_USER_COMMENTS = "Usuario/ListarAComentarios";
    public const string EDITAR_USER = "Usuario/Editar";
    public const string LISTAR_ROL_BY_USER = "Usuario/ListarRolessByUsuario";
    public const string ELIMINAR_USER = "Usuario/Delete";
}

[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public static class LogTypes
{
    public const string INFORMATIVE = "Informativo";
    public const string ERROR = "Error";
}

[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public static class Constants
{
    public const int MAX_MINUTES_TIME_REQUEST = 10;
    public const string WORD_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    public const string EXCEL_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    public const int MAX_PAGINATIONS_ELEMENTS_DEFAULT = 10;
    public const int MAX_INTERVAL_PAGE_DEFAULT = 3;
}

public static class TrimCase
{
    public const string None = "None";
    public const string Middle = "Middle";
    public const string Start = "End";
    public const string End = "Start";
}

[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public static class MessageErrors
{
    public const string GENERIC_ERROR = "Lo sentimos, ah ocurrido un error inesperado. Contacte con su administrador o intentelo más tarde.";
    public const string SESSION_EXPIRED = "Lo sentimos, su sesión a expirado. Inicie sesión nuevamente.";
    public const string USER_NOT_EXIST = "Lo sentimos, el usuario en consulta no existe. Intente iniciar sesión nuevamente.";
    public const string USER_EDIT_TAG_NOT = "Solo puede editar sus propias etiquetas.";
    public const string USER_DELETE_TAG_NOT = "Solo puede eliminar sus propias etiquetas.";
    public const string TAG_EVEN_EXIST = "El tag ya fue agregado a este documento.";
    public const string SUBTAG_EVEN_EXIST = "El sub tag ya fue agregado a este documento.";
}

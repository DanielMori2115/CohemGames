using CohemGamesBDDev.DataAccess.models;

namespace CohemGamesBDDev.Services;

public interface IUsuarioService
{
    Usuario Get(int code);
}
using CohemGamesBDDev.DataAccess.models;
using CohemGamesBDDev.DataAccess.Repository.Base;

namespace CohemGamesBDDev.DataAccess.Repository;

public interface IUsuarioRepository : IRepository<Usuario>
{
    //public IEnumerable<Usuario> Get();
    //IEnumerable<Usuario> GetToComments(int id);
    //IEnumerable<Usuario> GetByIds(List<int> users);
    //Usuario SignIn(string email);
    //Usuario GetByEmail(string email);
    //Usuario Insert(Usuario user);
    //List<Usuario> Insert(IEnumerable<Usuario> users);
    Usuario Edit(Usuario user);
    List<Usuario> Edit(List<Usuario> users);
    //Usuario Delete(int id);
    //public Usuario Get(int id);
}
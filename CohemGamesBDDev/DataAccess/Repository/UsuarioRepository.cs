using CohemGamesBDDev.DataAccess.models;
using CohemGamesBDDev.DataAccess.Repository.Base;

namespace CohemGamesBDDev.DataAccess.Repository;

public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
{
    private const string PROPERTIES = "Empresa";

    public UsuarioRepository(ApplicationDbContext context) : base(context) { }
    public IEnumerable<Usuario> Get()
    {
        return Get(includeProperties: PROPERTIES);
    }
    //public IEnumerable<Usuario> GetToComments(int id)
    //{
    //    return Get(x => x.Codigo != id && x.Estado,
    //            includeProperties: PROPERTIES)
    //        .Select(x => new Usuario { Id = x.Id, Names = x.Nombres, Lastnames = x.Apellidos }).ToList();
    //}
    //public IEnumerable<Usuario> GetByIds(List<int> users) => Get(x => users.Contains(x.Id), includeProperties: PROPERTIES);
    //public Usuario Get(int id) => Get(x => x.Id == id).FirstOrDefault();
    //public Usuario SignIn(string email) => Get(x => x.Correo == email && x.Estado, includeProperties: PROPERTIES).FirstOrDefault();
    //public Usuario GetByEmail(string email) => Get(x => x.Correo == email).FirstOrDefault();
    //public Usuario Insert(Usuario user) => Add(user);
    public List<Usuario> Insert(IEnumerable<Usuario> users) => AddRange(users).ToList();
    public Usuario Edit(Usuario user) => Update(user);
    public List<Usuario> Edit(List<Usuario> users) => UpdateRange(users).ToList();
    //public Usuario Delete(int id)
    //{
    //    var user = Get(id);

    //    if (user == null) return null;

    //    user.Estado = false;

    //    return Edit(user);
    //}
}
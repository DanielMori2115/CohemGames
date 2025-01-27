using CohemGamesBDDev.DataAccess.models;
using CohemGamesBDDev.DataAccess.Repository.Base;

namespace CohemGamesBDDev.DataAccess.Repository;

public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
{
    private const string PROPERTIES = "RolUsuarios, TipoDocumento";

    public UsuarioRepository(ApplicationDbContext context) : base(context) { }
    public IEnumerable<Usuario> Get()
    {
        return Get(includeProperties: PROPERTIES);
    }

    public IEnumerable<Usuario> GetByCodes(List<int> users) => Get(x => users.Contains(x.Codigo), includeProperties: PROPERTIES);

    public Usuario SignIn(string email) => Get(x => x.Email == email && x.Estado, includeProperties: PROPERTIES)?.FirstOrDefault();

    public Usuario GetByEmail(string email) => Get(x => x.Email == email)?.FirstOrDefault();

    public Usuario Insert(Usuario user) => Add(user);

    public List<Usuario> Insert(IEnumerable<Usuario> users) => AddRange(users).ToList();

    public Usuario Edit(Usuario user) => Update(user);

    public List<Usuario> Edit(List<Usuario> users) => UpdateRange(users).ToList();

    public Usuario Delete(int code)
    {
        var user = Get(code);

        if (user == null) return null;

        user.Estado = false;

        return Edit(user);
    }

    public Usuario Get(int code) => Get(x => x.Codigo == code)?.FirstOrDefault();
}
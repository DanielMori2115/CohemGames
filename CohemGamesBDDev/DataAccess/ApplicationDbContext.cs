using CohemGamesBDDev.DataAccess.Mappings;
using Microsoft.EntityFrameworkCore;

namespace CohemGamesBDDev.DataAccess;

public class ApplicationDbContext : DbContext
{
    public StoreProcedures Stores { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        Stores = new StoreProcedures(this);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        SetStoreModels(builder);
        SetTableModels(builder);
    }

    private static void SetStoreModels(ModelBuilder builder)
    {
        //builder.Entity<DocumentStoreProcedureBase>().HasNoKey();
    }

    private static void SetTableModels(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new BoletaOFacturaMapp());
        builder.ApplyConfiguration(new CategoriaMapp());
        builder.ApplyConfiguration(new ProductoMapp());
        builder.ApplyConfiguration(new ProductoPromocionMapp());
        builder.ApplyConfiguration(new PromocionMapp());
        builder.ApplyConfiguration(new RolesMapp());
        builder.ApplyConfiguration(new RolUsuarioMapp());
        builder.ApplyConfiguration(new TipoDocumentoMapp());
        builder.ApplyConfiguration(new TipoVentaMapp());
        builder.ApplyConfiguration(new UsuarioMapp());
        builder.ApplyConfiguration(new VentaMapp());
    }
}

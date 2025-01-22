using Microsoft.EntityFrameworkCore;

namespace CohemGamesBDDev.DataAccess;

public class ApplicationDbContext : DbContext
{
    //public StoreProcedures Stores { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        //Stores = new StoreProcedures(this);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //SetStoreModels(builder);
        SetTableModels(builder);
    }

    //private static void SetStoreModels(ModelBuilder builder)
    //{
    //    builder.Entity<DocumentStoreProcedureBase>().HasNoKey();
    //}

    private static void SetTableModels(ModelBuilder builder)
    {
        //builder.ApplyConfiguration(new Documento2Mapp());
        //builder.ApplyConfiguration(new DocumentoComentarioMapp());
        //builder.ApplyConfiguration(new DocumentoComentarioMencionMapp());
        //builder.ApplyConfiguration(new DocumentoEtiquetaMapp());
    }
}
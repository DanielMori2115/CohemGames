using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class UsuarioMapp : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuario", "dbo");
        builder.HasKey(t => t.Codigo);

        builder
            .HasMany(x => x.RolUsuarios)
            .WithOne().HasForeignKey(x => x.CodigoUsuario);

        builder
            .HasOne(x => x.TipoDocumento)
            .WithMany().HasForeignKey(x => x.CodigoTipoDocumento);
    }
}

using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class RolUsuarioMapp : IEntityTypeConfiguration<RolUsuario>
{
    public void Configure(EntityTypeBuilder<RolUsuario> builder)
    {
        builder.ToTable("RolUsuario", "dbo");
        builder.HasKey(t => t.Codigo);

        builder
            .HasOne(x => x.Roles)
            .WithMany().HasForeignKey(x => x.CodigoRol);
    }
}

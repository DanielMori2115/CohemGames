using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class VentaMapp : IEntityTypeConfiguration<Ventas>
{
    public void Configure(EntityTypeBuilder<Ventas> builder)
    {
        builder.ToTable("Ventas", "dbo");
        builder.HasKey(t => t.Codigo);

        builder.HasOne(x => x.BoletaOFactura)
            .WithMany().HasForeignKey(x => x.CodigoBoletaOFactura);

        builder.HasOne(x => x.Producto)
            .WithMany().HasForeignKey(x => x.CodigoProducto);
    }
}

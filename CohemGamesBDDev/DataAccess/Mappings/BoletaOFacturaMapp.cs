using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class BoletaOFacturaMapp : IEntityTypeConfiguration<BoletaOFactura>
{
    public void Configure(EntityTypeBuilder<BoletaOFactura> builder)
    {
        builder.ToTable("BoletaOFactura", "dbo")
            .Property(x => x.TipoVentaCodigo).HasColumnName("TipoVenta");
        builder.HasKey(t => t.Codigo);

        builder
            .HasOne(x => x.TipoVenta)
            .WithMany().HasForeignKey(x => x.TipoVentaCodigo);

        builder
            .HasMany(x => x.Ventas)
            .WithOne().HasForeignKey(x => x.CodigoBoletaOFactura);
    }
}

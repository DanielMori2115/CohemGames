using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class ProductoMapp : IEntityTypeConfiguration<Producto>
{
    public void Configure(EntityTypeBuilder<Producto> builder)
    {
        builder.ToTable("Producto", "dbo");
        builder.HasKey(t => t.Codigo);

        builder
            .HasMany(x => x.ProductosPromocion)
            .WithOne().HasForeignKey(x => x.CodigoProducto);

        builder
            .HasOne(x => x.Categoria)
            .WithMany().HasForeignKey(x => x.CodigoCategoria);
    }
}

using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class ProductoPromocionMapp : IEntityTypeConfiguration<ProductoPromocion>
{
    public void Configure(EntityTypeBuilder<ProductoPromocion> builder)
    {
        builder.ToTable("ProductoPromocion", "dbo");
        builder.HasKey(t => t.Codigo);

        builder.HasOne(x => x.Promocion)
            .WithMany().HasForeignKey(x => x.CodigoPromocion);
    }
}

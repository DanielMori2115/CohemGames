using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class TipoVentaMapp : IEntityTypeConfiguration<TipoVenta>
{
    public void Configure(EntityTypeBuilder<TipoVenta> builder)
    {
        builder.ToTable("TipoVenta", "dbo");
        builder.HasKey(t => t.Codigo);
    }
}

using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class TipoDocumentoMapp : IEntityTypeConfiguration<TipoDocumento>
{
    public void Configure(EntityTypeBuilder<TipoDocumento> builder)
    {
        builder.ToTable("TipoDocumento", "dbo");
        builder.HasKey(t => t.Codigo);
    }
}

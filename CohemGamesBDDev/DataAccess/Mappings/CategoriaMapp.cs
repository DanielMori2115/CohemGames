using CohemGamesBDDev.DataAccess.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CohemGamesBDDev.DataAccess.Mappings;

public class CategoriaMapp : IEntityTypeConfiguration<Categoria>
{
    public void Configure(EntityTypeBuilder<Categoria> builder)
    {
        builder.ToTable("Categoria", "dbo");
        builder.HasKey(t => t.Codigo);
    }
}

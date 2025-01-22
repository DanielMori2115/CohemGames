//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace CohemGamesBDDev.DataAccess.Mappings;

//public class Documento2Mapp : IEntityTypeConfiguration<Documento2>
//{
//    public void Configure(EntityTypeBuilder<Documento2> builder)
//    {
//        builder.ToTable("Documento2", "dbo");
//        builder.HasKey(t => t.Id);

//        builder
//            .HasMany(x => x.Favoritos)
//            .WithOne().HasForeignKey(x => x.IdDocumento);
//    }
//}
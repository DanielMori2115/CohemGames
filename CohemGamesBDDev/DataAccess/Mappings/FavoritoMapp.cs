//using JurisProdenciaBE.Dtos.Repository.Dbo;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace JurisProdenciaBE.DataAccess.Context.Mappings;

//public class FavoritoMapp : IEntityTypeConfiguration<Favorito>
//{
//    public void Configure(EntityTypeBuilder<Favorito> builder)
//    {
//        builder.ToTable("Favorito", "dbo");
//        builder.HasKey(t => t.Id);

//        builder
//            .HasOne(x => x.Etiqueta)
//            .WithMany().HasForeignKey(x => x.IdEtiqueta);

//        builder
//            .HasOne(x => x.Usuario)
//            .WithMany().HasForeignKey(x => x.IdUsuario);
//    }
//}
//using JurisProdenciaBE.Dtos.Repository.Dbo;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace JurisProdenciaBE.DataAccess.Context.Mappings;

//public class SubEtiquetaMapp : IEntityTypeConfiguration<SubEtiqueta>
//{
//    public void Configure(EntityTypeBuilder<SubEtiqueta> builder)
//    {
//        builder.ToTable("SubEtiqueta", "dbo");
//        builder.HasKey(t => t.Id);

//        builder
//            .HasOne(x => x.Usuario)
//            .WithMany().HasForeignKey(x => x.IdUsuario);
//    }
//}
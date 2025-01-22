//using JurisProdenciaBE.Dtos.Repository.Dbo;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace JurisProdenciaBE.DataAccess.Context.Mappings;

//public class DocumentoComentarioMencionMapp : IEntityTypeConfiguration<DocumentoComentarioMencion>
//{
//    public void Configure(EntityTypeBuilder<DocumentoComentarioMencion> builder)
//    {
//        builder.ToTable("DocumentoComentarioMencion", "dbo");
//        builder.HasKey(t => t.Id);

//        builder
//            .HasOne(x => x.Usuario)
//            .WithMany().HasForeignKey(x => x.IdUsuario);
//    }
//}
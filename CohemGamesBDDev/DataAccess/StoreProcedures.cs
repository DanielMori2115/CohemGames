//using Microsoft.Data.SqlClient;
//using Microsoft.EntityFrameworkCore;
//using System.Runtime.CompilerServices;
//using JurisProdenciaBE.Dtos.Service;
//using JurisProdenciaBE.Dtos.Repository.Base;

//namespace JurisProdenciaBE.DataAccess.Context;

//public class StoreProcedures
//{
//    private ApplicationDbContext ApplicationDbContext { get; set; }

//    public StoreProcedures(ApplicationDbContext dbContext)
//    {
//        this.ApplicationDbContext = dbContext;
//    }

//    public virtual IEnumerable<int> GetNewDocumentsIndicator(int userId, DocumentSearchViewModel documentSearchViewModel)
//    {
//        const string registerDateOrigin = "RegisterDateOrigin";
//        const string registerDateDestiny = "RegisterDateDestiny";

//        object[] parameters = {
//            new SqlParameter(registerDateOrigin, documentSearchViewModel.RegisterDateOrigin),
//            new SqlParameter(registerDateDestiny, documentSearchViewModel.RegisterDateDestiny)
//        };

//        const string scheme = "dbo";
//        const string storeProcedureName = "sp_ObtenerNumeroDeDocumentosNuevos";

//        var query = FormattableStringFactory.Create($"EXEC {scheme}.{storeProcedureName} " +
//                                                 $"@{registerDateOrigin}, " +
//                                                 $"@{registerDateDestiny} ", parameters);

//        return ApplicationDbContext.Database.SqlQuery<int>(query);
//    }

//    public virtual IEnumerable<DocumentStoreProcedureBase> GetDocuments(int userId, DocumentSearchViewModel documentSearchViewModel)
//    {
//        const string code = "Code";
//        const string room = "Room";
//        const string issue = "Issue";
//        const string author = "Author";
//        const string hashtagId = "HashtagId";
//        const string subHashtagId = "SubHashtagId";
//        const string ownHashtags = "OwnHashtagsFilter";
//        const string ownSubHashtags = "OwnSubHashtagsFilter";
//        const string assignHashtags = "AssignHashtagsFilter";
//        const string assignSubHashtags = "AssignSubHashtagsFilter";
//        const string favoriteFilter = "FavoriteFilter";
//        const string withoutWords = "WithoutWords";
//        const string someWords = "SomeWords";
//        const string withAllWords = "WithAllWords";
//        const string publicationDateOrigin = "PublicationDateOrigin";
//        const string publicationDateDestiny = "PublicationDateDestiny";
//        const string registerDateOrigin = "RegisterDateOrigin";
//        const string registerDateDestiny = "RegisterDateDestiny";
//        const string page = "Page";
//        const string elementsPerPage = "ElementsPerPage";
//        const string userIdString = "UserId";

//        object[] parameters = {
//                new SqlParameter(userIdString, userId),
//                new SqlParameter(code, documentSearchViewModel.CodeFilter),
//                new SqlParameter(room, documentSearchViewModel.RoomFilter),
//                new SqlParameter(issue, documentSearchViewModel.IssueFilter),
//                new SqlParameter(author, documentSearchViewModel.AuthorFilter),
//                new SqlParameter(hashtagId, documentSearchViewModel.HashtagFilter),
//                new SqlParameter(subHashtagId, documentSearchViewModel.SubHashtagFilter),
//                new SqlParameter(ownHashtags, documentSearchViewModel.OwnHashtagsFilter),
//                new SqlParameter(ownSubHashtags, documentSearchViewModel.OwnSubHashtagsFilter),
//                new SqlParameter(assignHashtags, documentSearchViewModel.AssignHashtagsFilter),
//                new SqlParameter(assignSubHashtags, documentSearchViewModel.AssignSubHashtagsFilter),
//                new SqlParameter(favoriteFilter, documentSearchViewModel.FavoriteFilter),
//                new SqlParameter(withoutWords, documentSearchViewModel.WithoutWords),
//                new SqlParameter(someWords, documentSearchViewModel.SomeWords),
//                new SqlParameter(withAllWords, documentSearchViewModel.WithAllWords),
//                new SqlParameter(publicationDateOrigin, documentSearchViewModel.PublicationDateOrigin),
//                new SqlParameter(publicationDateDestiny, documentSearchViewModel.PublicationDateDestiny),
//                new SqlParameter(registerDateOrigin, documentSearchViewModel.RegisterDateOrigin),
//                new SqlParameter(registerDateDestiny, documentSearchViewModel.RegisterDateDestiny),
//                new SqlParameter(page, documentSearchViewModel.CurrentPage),
//                new SqlParameter(elementsPerPage, documentSearchViewModel.ElementsByPage)
//            };

//        const string scheme = "dbo";
//        const string storeProcedureName = "spFiltrarDocumentos_QA";

//        var query = FormattableStringFactory.Create($"{scheme}.{storeProcedureName} " +
//                                                    $"@{userIdString}, " +
//                                                    $"@{code}, " +
//                                                    $"@{room}, " +
//                                                    $"@{issue}, " +
//                                                    $"@{author}, " +
//                                                    $"@{hashtagId}, " +
//                                                    $"@{subHashtagId}, " +
//                                                    $"@{ownHashtags}, " +
//                                                    $"@{ownSubHashtags}, " +
//                                                    $"@{assignHashtags}, " +
//                                                    $"@{assignSubHashtags}, " +
//                                                    $"@{withoutWords}, " +
//                                                    $"@{someWords}, " +
//                                                    $"@{withAllWords}, " +
//                                                    $"@{publicationDateOrigin}, " +
//                                                    $"@{publicationDateDestiny}, " +
//                                                    $"@{registerDateOrigin}, " +
//                                                    $"@{registerDateDestiny}, " +
//                                                    $"@{page}, " +
//                                                    $"@{elementsPerPage} ", parameters.ToArray());

//        return ApplicationDbContext.Set<DocumentStoreProcedureBase>().FromSql(query).AsNoTracking();
//    }

//    public virtual IEnumerable<FavoriteViewModel> GetFavorites(int userId, DocumentSearchViewModel documentSearchViewModel)
//    {
//        const string code = "Code";
//        const string room = "Room";
//        const string issue = "Issue";
//        const string author = "Author";

//        const string hashtagId = "HashtagId";
//        const string subHashtagId = "SubHashtagId";

//        const string ownHashtags = "OwnHashtagsFilter";
//        const string ownSubHashtags = "OwnSubHashtagsFilter";

//        const string assignHashtags = "AssignHashtagsFilter";
//        const string assignSubHashtags = "AssignSubHashtagsFilter";

//        const string favoriteFilter = "FavoriteFilter";

//        const string withoutWords = "WithoutWords";
//        const string someWords = "SomeWords";
//        const string withAllWords = "WithAllWords";
//        const string publicationDateOrigin = "PublicationDateOrigin";
//        const string publicationDateDestiny = "PublicationDateDestiny";
//        const string registerDateOrigin = "RegisterDateOrigin";
//        const string registerDateDestiny = "RegisterDateDestiny";
//        const string page = "Page";
//        const string elementsPerPage = "ElementsPerPage";
//        const string userIdString = "UserId";

//        object[] parameters = {
//                new SqlParameter(userIdString, userId),
//                new SqlParameter(code, documentSearchViewModel.CodeFilter),
//                new SqlParameter(room, documentSearchViewModel.RoomFilter),
//                new SqlParameter(issue, documentSearchViewModel.IssueFilter),
//                new SqlParameter(author, documentSearchViewModel.AuthorFilter),

//                new SqlParameter(hashtagId, documentSearchViewModel.HashtagFilter),
//                new SqlParameter(subHashtagId, documentSearchViewModel.SubHashtagFilter),

//                new SqlParameter(ownHashtags, documentSearchViewModel.OwnHashtagsFilter),
//                new SqlParameter(ownSubHashtags, documentSearchViewModel.OwnSubHashtagsFilter),

//                new SqlParameter(assignHashtags, documentSearchViewModel.AssignHashtagsFilter),
//                new SqlParameter(assignSubHashtags, documentSearchViewModel.AssignSubHashtagsFilter),

//                new SqlParameter(favoriteFilter, documentSearchViewModel.FavoriteFilter),

//                new SqlParameter(withoutWords, documentSearchViewModel.WithoutWords),
//                new SqlParameter(someWords, documentSearchViewModel.SomeWords),
//                new SqlParameter(withAllWords, documentSearchViewModel.WithAllWords),
//                new SqlParameter(publicationDateOrigin, documentSearchViewModel.PublicationDateOrigin),
//                new SqlParameter(publicationDateDestiny, documentSearchViewModel.PublicationDateDestiny),
//                new SqlParameter(registerDateOrigin, documentSearchViewModel.RegisterDateOrigin),
//                new SqlParameter(registerDateDestiny, documentSearchViewModel.RegisterDateDestiny),
//                new SqlParameter(page, documentSearchViewModel.CurrentPage),
//                new SqlParameter(elementsPerPage, documentSearchViewModel.ElementsByPage)
//            };

//        const string scheme = "dbo";
//        const string storeProcedureName = "spListarFavoritos_QA";

//        var query = FormattableStringFactory.Create($"{scheme}.{storeProcedureName} " +
//                                                    $"@{userIdString}, " +
//                                                    $"@{code}, " +
//                                                    $"@{room}, " +
//                                                    $"@{issue}, " +
//                                                    $"@{author}, " +
//                                                    $"@{hashtagId}, " +
//                                                    $"@{subHashtagId}, " +
//                                                    $"@{ownHashtags}, " +
//                                                    $"@{ownSubHashtags}, " +
//                                                    $"@{assignHashtags}, " +
//                                                    $"@{assignSubHashtags}, " +
//                                                    $"@{withoutWords}, " +
//                                                    $"@{someWords}, " +
//                                                    $"@{withAllWords}, " +
//                                                    $"@{publicationDateOrigin}, " +
//                                                    $"@{publicationDateDestiny}, " +
//                                                    $"@{registerDateOrigin}, " +
//                                                    $"@{registerDateDestiny}, " +
//                                                    $"@{page}, " +
//                                                    $"@{elementsPerPage} ", parameters.ToArray());

//        return ApplicationDbContext.Set<FavoriteViewModel>().FromSql(query).AsNoTracking();
//    }

//    public virtual IEnumerable<DocumentViewModel> GetDocumentById(int documentId)
//    {
//        const string documentIdParameter = "DocumentId";

//        object[] parameters = {
//            new SqlParameter(documentIdParameter, documentId)
//        };

//        const string scheme = "dbo";
//        const string storeProcedureName = "sp_FiltrarPorId_QA";

//        var query = FormattableStringFactory.Create($"{scheme}.{storeProcedureName} " +
//                                                    $"@{documentIdParameter}", parameters.ToArray());

//        return ApplicationDbContext.Set<DocumentViewModel>().FromSql(query).AsNoTracking();
//    }
//}
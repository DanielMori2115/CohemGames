using System.Diagnostics.CodeAnalysis;
using AutoMapper;

namespace CohemGamesBDDev.Configuration;

[ExcludeFromCodeCoverage]
public class CohemProfile : Profile
{
    public CohemProfile()
    {
        SetConfigurations();
        MappingBase();
        MappingRequests();
        MappingResponses();
        MappingErrors();
    }

    private void SetConfigurations()
    {
        AllowNullCollections = true;
        AllowNullDestinationValues = true;
    }

    private void MappingBase()
    {
    }

    private void MappingRequests()
    {
    }

    private void MappingResponses()
    {
        //CreateMap<DocumentStoreProcedureBase, DocumentViewModel>().ReverseMap();
        //CreateMap<DocumentStoreProcedureBase, FavoriteViewModel>().ReverseMap();
    }

    private void MappingErrors()
    {
    }
}

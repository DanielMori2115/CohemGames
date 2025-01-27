using AutoMapper;
using CohemGamesBDDev.Common.Utils;
using CohemGamesBDDev.DataAccess.models;
using CohemGamesBDDev.DataAccess.Repository;

namespace CohemGamesBDDev.Services;

public class UsuarioService : IUsuarioService
{
    private IMapper Mapper { get; }

    private readonly GlobalSettings _globalSettings;
    private readonly IUsuarioRepository _userRepository;

    public UsuarioService(
        IMapper mapper,
        IUsuarioRepository userRepository, 
        GlobalSettings globalSettings)
    {
        Mapper = mapper;

        _userRepository = userRepository;
        _globalSettings = globalSettings;
    }

    public Usuario Get(int code)
    {
        return _userRepository.Get(code);
    }
}
using CohemGamesBDDev.Services;
using Microsoft.AspNetCore.Mvc;

namespace CohemGamesBDDev.Controllers;

[ApiController]
[Route("api/User")]
public class UserController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UserController(IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet]
    [Route("{code}")]
    public IActionResult Get(int code)
    {
        var response = _usuarioService.Get(code);

        return Ok(response);
    }
}

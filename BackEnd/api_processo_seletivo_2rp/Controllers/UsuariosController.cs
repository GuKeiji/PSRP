using api_processo_seletivo_2rp.Domains;
using api_processo_seletivo_2rp.Interfaces;
using api_processo_seletivo_2rp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_processo_seletivo_2rp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuariosController(IUsuarioRepository repo)
        {
            _usuarioRepository = repo;
        }

        [Authorize(Roles = "2, 3")]
        [HttpPost("Cadastrar")]
        public IActionResult CadastrarUsuario(UsuarioCadastroViewModel novoUsuario)
        {
            try
            {
                if (novoUsuario != null)
                {
                    _usuarioRepository.CadastrarUsuario(novoUsuario);
                    return StatusCode(201);
                }
                else
                {

                    return BadRequest(new
                    {
                        Mensagem = "Email ou Senha inválidos!"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }

        }

        [HttpPost("BuscarUsuario")]
        public IActionResult BuscarUsuario(int idUsuario)
        {
            try
            {
                if (idUsuario != null)
                {
                    Usuario usuarioEncontrado = _usuarioRepository.BuscarUsuario(idUsuario);
                    return Ok(usuarioEncontrado);
                }
                else
                {

                    return BadRequest(new
                    {
                        Mensagem = "ID inválido!"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }

        }
    }
}

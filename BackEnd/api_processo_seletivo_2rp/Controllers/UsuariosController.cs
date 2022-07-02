using api_processo_seletivo_2rp.Domains;
using api_processo_seletivo_2rp.Interfaces;
using api_processo_seletivo_2rp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PSRP.ViewModels;
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

        [HttpGet("ListarTodos")]
        public IActionResult GetUsuarios()
        {

            try
            {
                List<Usuario> listaUsuarios = _usuarioRepository.ListarTodos();

                return Ok(listaUsuarios);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("ListarTipos")]
        public IActionResult GetTipoUsuario()
        {

            try
            {
                List<Tipousuario> listaTipos = _usuarioRepository.ListarTipos();

                return Ok(listaTipos);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "2, 3")] 
        [HttpPost("Cadastrar")]
        public IActionResult CadastrarUsuario( UsuarioCadastroViewModel novoUsuario)
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

        [HttpPost("BuscarUsuario/{id}")]
        public IActionResult BuscarUsuario(int id)
        {
            try
            {
                if (id > 0)
                {
                    Usuario usuarioEncontrado = _usuarioRepository.BuscarUsuario(id);
                    if (usuarioEncontrado == null)
                    {
                        return BadRequest(new
                        {
                            Mensagem = "ID inválido!"
                        });
                    }
                    else
                    {
                        return Ok(usuarioEncontrado);

                    }
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

        [Authorize(Roles = "2, 3")]
        [HttpPut("AtualizarUsuario/{id}")]
        public IActionResult AtualizarUsuario(int id, UsuarioCadastroViewModel usuarioAtualizado)
        {
            try
            {
                Usuario usuarioAchado = _usuarioRepository.BuscarUsuario(id);
                if (usuarioAchado == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Usuário não encontrado!"
                    });
                }
                else
                {
                    _usuarioRepository.AlterarUsuario(id, usuarioAtualizado);
                    return StatusCode(200);
                }

            }
            catch (Exception)
            {

                throw;
            }


        }

        [HttpPatch("AtualizarMeuUsuario/{id}")]
        public IActionResult AtualizarMeuUsuario(int id, UsuarioAtualizadoViewModel usuarioAtualizado)
        {
            try
            {
                Usuario usuarioAchado = _usuarioRepository.BuscarUsuario(id);
                if (usuarioAchado == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Usuário não encontrado!"
                    });
                }
                else
                {
                    _usuarioRepository.AlterarMeuUsuario(id, usuarioAtualizado);
                    return StatusCode(200);
                }

            }
            catch (Exception)
            {

                throw;
            }


        }

        [Authorize(Roles = "2, 3")]
        [HttpPut("AlterarStatus")]
        public IActionResult AlterarStatus(int idUsuario)
        {
            try
            {
                Usuario usuarioAchado = _usuarioRepository.BuscarUsuario(idUsuario);
                if (usuarioAchado == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Usuário não encontrado!"
                    });
                }
                else
                {
                    _usuarioRepository.AlterarSituacao(idUsuario);
                    return StatusCode(200);
                }

            }
            catch (Exception)
            {

                throw;
            }


        }

        [Authorize(Roles = "3")]
        [HttpPost("ExcluirUsuario/{id}")]
        public IActionResult ExcluirUsuario(int id)
        {
            try
            {
                if(id > 0)
                {
                    Usuario usuarioEncontrado = _usuarioRepository.BuscarUsuario(id);
                    if (usuarioEncontrado == null)
                    {
                        return BadRequest(new
                        {
                            Mensagem = "ID inválido!"
                        });
                    }
                    else
                    {

                        _usuarioRepository.ExcluirUsuario(id);
                        return StatusCode(200);

                    }
                }
                else
                {

                    return BadRequest(new
                    {
                        Mensagem = "ID inválido!"
                    });
                }
            }
            catch (Exception)
            {

                throw;
            }

        }


    }
}

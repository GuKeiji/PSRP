using api_processo_seletivo_2rp.Contexts;
using api_processo_seletivo_2rp.Domains;
using api_processo_seletivo_2rp.Interfaces;
using api_processo_seletivo_2rp.Utils;
using api_processo_seletivo_2rp.ViewModels;
using PSRP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_processo_seletivo_2rp.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        Ps_Context ctx = new Ps_Context();

        public void AlterarMeuUsuario(int idUsuario, UsuarioAtualizadoViewModel usuarioAtualizado)
        {
            Usuario usuarioAchado = BuscarUsuario(idUsuario);

            if (usuarioAchado != null)
            {
                usuarioAchado.Nome = usuarioAtualizado.Nome;
                usuarioAchado.Email = usuarioAtualizado.Email;
                usuarioAchado.Senha = usuarioAtualizado.Senha;
                ctx.SaveChanges();
            }
        }

        public void AlterarSituacao(int idUsuario)
        {
            Usuario usuarioAchado = BuscarUsuario(idUsuario);
            if (usuarioAchado != null)
            {
                if (usuarioAchado.Situacao == true)
                {
                    usuarioAchado.Situacao = false;
                    ctx.SaveChanges();
                }
                else if (usuarioAchado.Situacao == false)
                {
                    usuarioAchado.Situacao = true;
                    ctx.SaveChanges();
                }

            }
        }

        public void AlterarUsuario(int idUsuario, UsuarioCadastroViewModel usuarioAtualizado)
        {
            Usuario usuarioAchado = BuscarUsuario(idUsuario);

            if (usuarioAchado != null)
            {
                usuarioAchado.Nome = usuarioAtualizado.Nome;
                usuarioAchado.IdTipoUsuario = (byte?)usuarioAtualizado.IdTipoUsuario;
                usuarioAchado.Email = usuarioAtualizado.Email;
                usuarioAchado.Situacao = usuarioAtualizado.Situacao;
                usuarioAchado.Senha = usuarioAtualizado.Senha;
                ctx.SaveChanges();
            }
        }

        public Usuario BuscarUsuario(int idUsuario)
        {
            Usuario usuario = new Usuario();
            return usuario = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
        }

        public void CadastrarUsuario(UsuarioCadastroViewModel novoUsuario)
        {
            if (novoUsuario.Email != null && novoUsuario.Senha != null)
            {
                string senhaCriptografada = Criptografia.GerarHash(novoUsuario.Senha);

                Usuario usuarioCadastrado = new Usuario();
                usuarioCadastrado.IdTipoUsuario = (byte?)novoUsuario.IdTipoUsuario;
                usuarioCadastrado.Nome = novoUsuario.Nome;
                usuarioCadastrado.Email = novoUsuario.Email;
                usuarioCadastrado.Senha = senhaCriptografada;
                usuarioCadastrado.Situacao = novoUsuario.Situacao;

                ctx.Usuarios.Add(usuarioCadastrado);
                ctx.SaveChanges();
            }
        }

        public void ExcluirUsuario(int idUsuario)
        {
            Usuario usuarioAchado = BuscarUsuario(idUsuario);
            ctx.Usuarios.Remove(usuarioAchado);
            ctx.SaveChanges();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios
                .Select(a => new Usuario()
                {
                    Nome = a.Nome,
                    Email = a.Email,
                    IdUsuario = a.IdUsuario,
                    Situacao = a.Situacao,
                    IdTipoUsuarioNavigation = new Tipousuario()
                    {
                        Tipo = a.IdTipoUsuarioNavigation.Tipo,
                        IdTipoUsuario = a.IdTipoUsuarioNavigation.IdTipoUsuario
                    }
                })
                .ToList();
        }

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {

                if (usuario.Senha.Length != 60 && usuario.Senha[0].ToString() != "$")
                {
                    if (senha == usuario.Senha)
                    {

                        string senhaHash = Criptografia.GerarHash(usuario.Senha);
                        usuario.Senha = senhaHash;
                        ctx.Usuarios.Update(usuario);
                        ctx.SaveChanges();

                        return usuario;
                    }
                    else
                    {
                        return null;
                    }
                }

                bool confere = Criptografia.CompararSenha(senha, usuario.Senha);
                if (confere)
                    return usuario;
            }
            return null;
        }
    }
}

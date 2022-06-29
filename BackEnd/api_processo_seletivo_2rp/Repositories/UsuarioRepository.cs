using api_processo_seletivo_2rp.Contexts;
using api_processo_seletivo_2rp.Domains;
using api_processo_seletivo_2rp.Interfaces;
using api_processo_seletivo_2rp.Utils;
using api_processo_seletivo_2rp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_processo_seletivo_2rp.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        Ps_Context ctx = new Ps_Context();

        public void AlterarSituacao(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public void AlterarUsuario(int idUsuario, Usuario novoUsuario)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
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

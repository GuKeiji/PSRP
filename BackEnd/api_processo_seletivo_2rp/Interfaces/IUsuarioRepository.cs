using api_processo_seletivo_2rp.Domains;
using api_processo_seletivo_2rp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_processo_seletivo_2rp.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario Login(string email, string senha);
        Usuario BuscarUsuario(int idUsuario);
        void AlterarUsuario(int idUsuario, Usuario novoUsuario);
        void ExcluirUsuario(int idUsuario);
        void CadastrarUsuario(UsuarioCadastroViewModel novoUsuario);
        void AlterarSituacao(int idUsuario);
    }
}

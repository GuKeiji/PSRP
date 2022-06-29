using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_processo_seletivo_2rp.ViewModels
{
    public class UsuarioCadastroViewModel
    {
        public short? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public bool Situacao { get; set; }
    }
}

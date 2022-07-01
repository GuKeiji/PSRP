import { Link } from 'react-router-dom'
import '../../assets/css/header.css'
import Logo from "../../assets/img/2rpnet.svg"
// import Perfil from '../../assets/img/perfil.png'
import { useHistory } from "react-router-dom";
// import logout from '../../assets/img/logout.png'
// import setaBaixo from '../../assets/img/seta-para-baixo.png'
import { parseJwt } from '../../services/auth';
import Perfil from '../../assets/img/perfil.svg';
import Logout from '../../assets/img/logout.svg'
import Seta from '../../assets/img/setinha.svg'

export default function HeaderUsuario() {
    // const [active, setMode] = useState(false);
    // const ToggleMode = () => {
    //     setMode(!active)
    // }

    let history = useHistory();
    function logOut() {
        localStorage.removeItem("usuario-login");

        history.push("/Login");
    }
    // async function redirecionaTela() {
    //     localStorage.setItem('perfil-edit', parseJwt().jti);

    //     history.push("/MeuPerfil");
    // }



    return (
        <header className="header_g2">
            <div className='container container_header_g2' >
                <img className='logo_headerr' src={Logo} alt="Logo 2RP" />
                <div class='select_header_g2'>
                    <p class='input_header_g2'>Telas<img src={Seta} /> </p>
                    <input type='hidden' name='some_name_to_form' />
                    <div class='hidden_header_g2'>
                        <Link to='/MeuPerfil' className="text_link_header_g1" ><span>Meu Perfil</span> </Link>
                        <Link to='/Cadastro' className="text_link_header_g1" ><span>Cadastro de Usuarios</span> </Link>
                        <Link to='/VerPerfis' className="text_link_header_g1" ><span>Ver Perfis</span> </Link>
                        <div class='select'>
                        </div>
                    </div>
                </div>

                <div className="img_perfil_g2" >
                    <Link to='/MeuPerfil' > <img src={Perfil} alt="Foto de Perfil" /></Link>
                </div>


                <img className='img_logout_header_g2' onClick={logOut} src={Logout} alt="logout" />
            </div>
        </header>
    )
}
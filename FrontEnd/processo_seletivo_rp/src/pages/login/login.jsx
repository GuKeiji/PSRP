import React, { useState } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/login.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";

export default function Login() {
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    // const notify_Logar_Failed = () => toast.error("Email ou Senha inválidos!")
    const history = useHistory();




    const FazerLogin = (event) => {
        event.preventDefault();


        axios.post('http://localhost:5000/api/Login/Login', {
            email: emailUsuario,
            senha: senhaUsuario
        }
        )
            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token)
                    history.push('/Cadastro')
                }

            })
            .catch(erro => console.log(erro))

    }

    return (
        <div className="">
            <main className="container_main">
                <div className="container_logo container">

                    <img src={Logo} alt="Logo da 2RP" className="logo_header" />
                    {/* <p className="">© 2022 2RP Net</p> */}
                </div>
                <div className="organizar_form container">
                    <div className="container_text_login">
                        <p className="text_form">Acesse sua conta para gerenciar ou vizualizar os usuários!</p>
                    </div>
                    <div className="organizar_label_form">
                        <h1 className="titulo_form">Login</h1>
                        <form className="container_form" onSubmit={(event) => FazerLogin(event)}>
                            <div className="container_input_label">
                                <label className="label_form" for="Email">Email</label>
                                <input className="input_form" type="text" name="Email" placeholder="Digite seu Email" value={emailUsuario} onChange={(evt) => setEmailUsuario(evt.target.value)} />
                            </div>

                            <div className="container_input_label">
                                <label className="label_form" for="senha">Senha</label>
                                <input className="input_form" type="password" name="senha" placeholder="Digite sua senha" value={senhaUsuario} onChange={(evt) => setSenhaUsuario(evt.target.value)} />
                            </div>
                            <div className="container_btn">
                                <button className="btn_entrar" type="submit">Entrar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>

        </div>
    )
}
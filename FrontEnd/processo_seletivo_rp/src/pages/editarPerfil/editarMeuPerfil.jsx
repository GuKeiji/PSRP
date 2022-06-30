import React, { useState } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/editarMeuPerfil.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";
import HeaderUsuario from "../../components/header/header";

export default function EditarMeuPerfil() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function EditarPerfil(evento) {
        setIsLoading(true);
        evento.preventDefault()

        if (nome != "" && email != "" && senha != "") {
            debugger;

            console.log('chegueii');
            axios
                .patch('http://localhost:5000/api/Usuarios/AtualizarMeuUsuario/' + localStorage.getItem('perfil-edit'), {
                    senha: senha,
                    email: email,
                    nome: nome,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                    }
                })
                .then((resposta) => {
                    if (resposta.status === 200) {
                        console.log('Usuario atualizado');
                        setNome('');
                        setEmail('');
                        setSenha('');
                    }

                })
                .catch(erro => console.log(erro), setIsLoading(false));
        }
        else {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="div_container">
                <HeaderUsuario />
                <main className="container_">
                    <div className="G1_Left_CadastroAtividade">
                        <div className="G1_banner_CadastroAtividade">
                            <img src={Logo} className="G1_bannerCadastroAtividade" alt="" />
                            <p className="G1_p_2RP">© 2022 2RP Net</p>
                        </div>
                    </div>
                    <div className="G1_Right_CadastroAtividade">
                        <div className="G1_textCadastrar">
                            <h1>Alterar</h1>
                            <h2>meu Perfil</h2>
                        </div>
                        <form className="G1_form_Cadastrar" onSubmit={EditarPerfil} >
                            <div className='G1_organizar_form'>
                                    <div className="EP_inputLabel_Cadastrar">
                                        <input value={nome}
                                            onChange={(campo) => setNome(campo.target.value)} type="text" name="titulo" placeholder="Digite o nome do Usuário" />
                                        <label className="label_descr" htmlFor="titulo">Nome do Usuário</label>
                                    </div>
                                    <div className="EP_inputLabel_Cadastrar">
                                        <input value={email}
                                            onChange={(campo) => {setEmail(campo.target.value); console.log(localStorage.getItem('perfil-edit'))}} type="text" name="titulo" placeholder="Digite seu email" />
                                        <label className="label_descr" htmlFor="titulo">Email</label>
                                    </div>
                                    <div className="EP_inputLabel_Cadastrar">
                                        <input value={senha}
                                            onChange={(campo) => setSenha(campo.target.value)} type="text" name="moedas" placeholder="Digite sua senha" />
                                        <label className="label_descr" htmlFor="moedas">Senha</label>
                                    </div>
                            </div>
                            {isLoading && (
                                <button className='G1_btn_Cadastrar' type="submit" >Carregando...</button>
                            )}
                            {!isLoading && (
                                <button className='G1_btn_Cadastrar' type="submit" >Alterar</button>
                            )}
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );

}
import React, { useState } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/editarPerfil.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";
import HeaderUsuario from "../../components/header/header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditarMeuPerfil() {

    const [nome, setNome] = useState('');
    const [idTipoUsuario, setIdTipoUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [situacao, setSituacao] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const notify_preencherCampos = () => toast.error("Preencha todos os campos!");
    const notify_editar = () => toast.success("Usuário Editado!");

    async function EditarPerfil(evento) {
        setIsLoading(true);
        evento.preventDefault()

        if (nome != "" && email != "" && senha != "") {

            console.log('chegueii');
            axios
                .put('http://localhost:5000/api/Usuarios/AtualizarUsuario/' + localStorage.getItem('perfil-edit'), {
                    senha: senha,
                    email: email,
                    nome: nome,
                    idTipoUsuario: idTipoUsuario,
                    situacao: situacao
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                    }
                })
                .then((resposta) => {
                    if (resposta.status === 200) {
                        console.log('Usuario atualizado');
                        setNome('');
                        setIdTipoUsuario('');
                        setEmail('');
                        setSenha('');
                        setSituacao(false);
                        notify_editar();
                    }

                })
                .catch(erro => console.log(erro), setIsLoading(false));
        }
        else {
            setIsLoading(false);
            notify_preencherCampos();
        }
    }

    function checkSituacao() {
        setSituacao(!situacao)
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
                            <h2>Perfil</h2>
                        </div>
                        <form className="G1_form_Cadastrar" onSubmit={EditarPerfil} >
                        <div className='G1_organizar_form'>
                                <div className='G1_organizar_inputs'>
                                    <div className="G1_inputLabel_Cadastrar">
                                        <input value={nome}
                                            onChange={(campo) => setNome(campo.target.value)} type="text" name="titulo" placeholder="Digite o nome do Usuário" />
                                        <label className="label_descr" htmlFor="titulo">Nome do Usuário</label>
                                    </div>
                                    <div className="G1_inputLabel_Cadastrar">
                                        <input value={idTipoUsuario}
                                            onChange={(campo) => setIdTipoUsuario(campo.target.value)} type="number" name="moedas" placeholder="Digite o id do tipo do Usuario" />
                                        <label className="label_descr" htmlFor="moedas">Tipo de Usuário</label>
                                    </div>
                                </div>
                                <div className='G1_organizar_inputs'>
                                    <div className="G1_inputLabel_Cadastrar">
                                        <input value={email}
                                            onChange={(campo) => setEmail(campo.target.value)} type="text" name="titulo" placeholder="Digite seu email" />
                                        <label className="label_descr" htmlFor="titulo">Email</label>
                                    </div>
                                    <div className="G1_inputLabel_Cadastrar">
                                        <input value={senha}
                                            onChange={(campo) => setSenha(campo.target.value)} type="text" name="moedas" placeholder="Digite sua senha" />
                                        <label className="label_descr" htmlFor="moedas">Senha</label>
                                    </div>
                                </div>
                            </div>
                            <div className="G1_organizar_toggle">
                                    <label className="G1_label_obrigatoria">Situação</label>
                                    <div className='G1_organizar_switchBtn'>
                                        <input className="checkbox_switch"
                                            type="checkbox"
                                            id="switch2"
                                            name="obrigatorio"
                                            value={situacao}
                                            onClick={checkSituacao}
                                        />
                                        {/* <label className='label_switch' htmlFor="switch2">Toggle</label> */}
                                        {situacao && (
                                            <div>
                                                <label className='label_switch active' htmlFor="switch2">Toggle</label>
                                                <p className='text_switch'>
                                                    ATIVO
                                                </p>
                                            </div>
                                        )}
                                        {!situacao && (
                                            <div>
                                                <label className='label_switch' htmlFor="switch2">Toggle</label>
                                                <p className='text_switch'>
                                                    INATIVO
                                                </p>
                                            </div>
                                        )}
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
import React, { useState, useEffect } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/cadastroUsuarios.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";
import HeaderUsuario from "../../components/header/header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastrarUsuarios() {

    const [nome, setNome] = useState('');
    const [idTipoUsuario, setIdTipoUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [situacao, setSituacao] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [listaTipo, setListaTipo] = useState();

    const notify_preencherCampos = () => toast.error("Preencha todos os campos!");
    const notify_cadastrar = () => toast.success("Usuário Cadastrado!");
    const notify_erroCadastrar = () => toast.error("Email já existe!");

    function listarTipoUsuarios() {
        axios.get("http://localhost:5000/api/Usuarios/ListarTipos"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    let lista = resposta.data
                    setListaTipo(lista)
                    console.log(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };


    useEffect(listarTipoUsuarios, []);

    async function CadastrarUsuario(evento) {
        setIsLoading(true);
        evento.preventDefault()

        if (nome != "" && email != "" && senha != "" && idTipoUsuario != "") {

            // console.log('chegueii');
            await axios
                .post('http://localhost:5000/api/Usuarios/Cadastrar', {
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
                    if (resposta.status === 201) {
                        console.log('Usuario cadastrado');
                        setNome('');
                        setIdTipoUsuario('');
                        setEmail('');
                        setSenha('');
                        notify_cadastrar();
                        setIsLoading(false);
                    }

                })
                .catch((erro) => {console.log(erro); setIsLoading(false); notify_erroCadastrar()});
        }
        else {
            setIsLoading(false);
            notify_preencherCampos();
        }
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
                            <h1>Cadastro</h1>
                            <h2>De Usuario</h2>
                        </div>
                        <form className="G1_form_Cadastrar" onSubmit={CadastrarUsuario} >
                            <div className='G1_organizar_form'>
                                <div className='G1_organizar_inputs'>
                                    <div className="G1_inputLabel_Cadastrar">
                                        <input value={nome}
                                            onChange={(campo) => setNome(campo.target.value)} type="text" name="titulo" placeholder="Digite o nome do Usuário" />
                                        <label className="label_descr" htmlFor="titulo">Nome do Usuário</label>
                                    </div>
                                    <div className="G1_inputLabel_Cadastrar">
                                        <select
                                            className="input_select"
                                            name="tipo"
                                            id="tipo"
                                            value={idTipoUsuario}
                                            onChange={(campo) => setIdTipoUsuario(campo.target.value)}
                                        >
                                            <option>Selecione um tipo</option>
                                            <option value="1">Geral</option>
                                            <option value="2">Admin</option>
                                            <option value="3">Root</option>

                                            {/* {listaTipo.map((tipo) => {
                                                return (
                                                    <option key={tipo.idTipoUsuario} value={tipo.idTipoUsuario}>
                                                        {tipo.tipo}
                                                    </option>
                                                )
                                            })} */}
                                        </select>
                                        <label className="label_descr" htmlFor="tipo">Tipo de Usuário</label>
                                        {/* <input value={idTipoUsuario}
                                            onChange={(campo) => setIdTipoUsuario(campo.target.value)} type="number" name="moedas" placeholder="Digite o id do tipo do Usuario" /> */}
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
                            {isLoading && (
                                <button className='G1_btn_Cadastrar' type="submit" >Carregando...</button>
                            )}
                            {!isLoading && (
                                <button className='G1_btn_Cadastrar' type="submit" >Cadastrar</button>
                            )}
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );

}
import React, { useState, useEffect } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/verPerfis.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";
import FtPerfil from '../../assets/img/perfil.svg';
import HeaderUsuario from "../../components/header/header";

export default function VerPerfis() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [idUsuario, setIdUsuario] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalValidar, setShowModalValidar] = useState(false);
    const [idAtividadeModal, setIdAtividadeModal] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [verifyRole, setVerifyRole] = useState(parseJwt().role);



    var history = useHistory()

    function redirecionarTela(id) {
        localStorage.setItem('perfil-edit', id)
        history.push('/Perfil')
    }

    function excluirUsuario(id) {
        // debugger;
        // console.log(id);
        // console.log(parseJwt().role);
        // console.log(parseJwt());
        // console.log(localStorage.getItem('usuario-login'));
        axios.post("http://localhost:5000/api/Usuarios/ExcluirUsuario/" + id
            , {} , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    listarUsuarios()
                }
            })

            .catch(erro => console.log(erro))
        // axios.post("http://localhost:5000/api/Usuarios/ExcluirUsuario/" + id
        //     , {
        //         headers: {
        //             'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
        //         }
        //     })
        //     .then(resposta => {
        //         if (resposta.status === 200) {
        //             listarUsuarios()
        //         }
        //     })
    }

    function listarUsuarios() {
        axios.get("http://localhost:5000/api/Usuarios/ListarTodos"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    let lista = resposta.data
                    setListaUsuarios(lista)
                    console.log(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };


    useEffect(listarUsuarios, []);

    return (
        <div className="div_container_list G1_tela_atividades_container">
            <HeaderUsuario />
            <main className="container_atividades">
                <div className="G1_organizar_main">
                    <h1 className="G1_titulo_atividades">Todos Usuarios</h1>
                    <div className="G1_container_atividades">
                        {listaUsuarios.map((usuario) => {
                            return (
                                <div key={usuario.idUsuario}>
                                    <div className="G1_atividade_box">
                                        {/* <div className="G1_header_atividade"></div> */}
                                        <div className="G1_box_container">
                                            <div className="G1_organizar_spams">
                                                <div className="container_spans">
                                                    <span className="G1_titulo_atividade_box">Nome</span>
                                                    <span className="G1_titulo_atividade_box">{usuario.nome}</span>
                                                </div>
                                                <div className="container_spans">
                                                    <span className="G1_titulo_atividade_box">Email</span>
                                                    <span className="G1_titulo_atividade_box">{usuario.email}</span>
                                                </div>
                                                <div className="container_spans">
                                                    <span className="G1_titulo_atividade_box">Tipo de Usuario</span>
                                                    <span className="G1_titulo_atividade_box">{usuario.idTipoUsuarioNavigation.tipo}</span>
                                                </div>
                                                <div className="container_spans">
                                                    <span className="G1_titulo_atividade_box">Situação</span>
                                                    {usuario.situacao == true && (
                                                        <span className="G1_titulo_atividade_box">Ativo</span>
                                                    )}
                                                    {usuario.situacao == false && (
                                                        <span className="G1_titulo_atividade_box">Inativo</span>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="G1_organizar_btn">
                                                <button onClick={() => { redirecionarTela(usuario.idUsuario) }} className="G1_btn_vizualizar">Visualizar</button>
                                                {verifyRole == 3 && (
                                                    <button onClick={() => { excluirUsuario(usuario.idUsuario) }} className="G1_btn_vizualizar">Excluir</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
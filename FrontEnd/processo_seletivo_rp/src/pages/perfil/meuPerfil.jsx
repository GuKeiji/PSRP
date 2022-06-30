import React, { useState, useEffect } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/perfil.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";
import FtPerfil from '../../assets/img/perfil.svg';
import HeaderUsuario from "../../components/header/header";

export default function Perfil() {
    const [listaUsuarios, setListaUsuario] = useState([])
    const [idUsuario, setIdUsuario] = useState(0)




    function listarUsuario() {
        axios.post('http://localhost:5000/api/Usuarios/BuscarUsuario/' + parseJwt().jti, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }
        )
            .then(resposta => {
                if (resposta.status === 200) {
                    // console.log('Lista')
                    console.log(resposta)
                    setListaUsuario(resposta.data)
                    // setNome(resposta.data.nome)
                    // console.log('aqui' + resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(listarUsuario, [])

    return (
        <div className="geral_g2">

            <HeaderUsuario />

            <div className="container_meuPerfil container_perfil_g2">

                <div className="box_perfil_g2">

                    <div className="organizar_box_perfil">
                        <div>
                            <h1 className="title_box">Perfil</h1>
                        </div>
                        <div className="container_label_foto">
                            <p className="p_perfil_g2">Foto Perfil</p>

                            <div className="foto_perfil_g2">
                                <img src={FtPerfil} alt="Foto Perfil" />
                                {/* {listaUsuarios.idUsuario} */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p className="p_perfil_g2">Informações Gerais </p>
                        </div>

                        <div className="box_dados_perfil_g2">
                            <label className="label_info">Nome</label>
                            <span>{listaUsuarios.nome}</span>
                            <label className="label_info" >Email</label>
                            <span>{listaUsuarios.email} </span>
                            <label className="label_info">Situação</label>
                            {listaUsuarios.situacao == true && (
                                <span> Ativo </span>
                            )}
                            {listaUsuarios.situacao == false && (
                                <span> Inativo </span>
                            )}
                            <label className="label_info">Tipo Usuario</label>
                            {listaUsuarios.idTipoUsuario == 1 && (
                                <span> Geral </span>
                            )}
                            {listaUsuarios.idTipoUsuario == 2 && (
                                <span> Administrador </span>
                            )}
                            {listaUsuarios.idTipoUsuario == 3 && (
                                <span> Root </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
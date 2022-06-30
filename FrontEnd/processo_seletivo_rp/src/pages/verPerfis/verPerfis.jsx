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
    



    function listarUsuario(idUsuarioBusca) {


        axios.post('http://localhost:5000/api/Usuarios/BuscarUsuario/' + idUsuarioBusca, {
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

    return (
        <div></div>
    )
}
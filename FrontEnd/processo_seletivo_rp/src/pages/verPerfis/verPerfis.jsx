import React, { useState, useEffect } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/verPerfis.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";
import FtPerfil from '../../assets/img/perfil.svg';
import HeaderUsuario from "../../components/header/header";

export default function VerPerfis() {
    const [listaAtividades, setListaAtividades] = useState([]);
    const [idAtividade, setIdAtividade] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalValidar, setShowModalValidar] = useState(false);
    const [idAtividadeModal, setIdAtividadeModal] = useState()
    const [isLoading, setIsLoading] = useState(false);

    var history = useHistory()

    function redirecionarTela() {
        localStorage.setItem('perfil-edit', parseJwt().jti)
        history.push('/EditarPerfil')
    }


    function listarAtividades() {
        axios.get("http://apirhsenaigp1.azurewebsites.net/api/Atividades"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    let lista = resposta.data

                    let listaAtualizada = lista.filter(a => a.idGestorCadastro == parseJwt().jti)
                    setListaAtividades(listaAtualizada)
                    console.log(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };


    useEffect(listarAtividades, []);

    return (
        <div className="div_container G1_tela_atividades_container">
            <Modall atividade={listaAtividades.find(atividade => atividade.idAtividade == idAtividadeModal)} showModal={showModal} setShowModal={setShowModal} />
            <div className='navbarF'>
                <Navbar />
            </div>
            <div className='headerF'>
                <HeaderFuncionario />
            </div>
            <main className="container_atividades">
                <div className="G1_organizar_main">
                    <h1 className="G1_titulo_atividades">Todas Atividades</h1>
                    <div className="G1_container_atividades">
                        {listaAtividades.map((atividade) => {
                            return (
                                <div key={atividade.idAtividade}>
                                    <div className="G1_atividade_box">
                                        <div className="G1_header_atividade"></div>
                                        <div className="G1_box_container">
                                            <div className="G1_organizar_spams">
                                                <span className="G1_titulo_atividade_box">{atividade.nomeAtividade}</span>
                                                <div className="organiza_coins_text">
                                                    <span className="G1_recompensa_box">{atividade.recompensaMoeda} CashS</span>
                                                    <img className="img_coins" src={moedas} alt="moedas" />
                                                </div>
                                            </div>
                                            <p className="G1_descricao_atividade">{atividade.descricaoAtividade}</p>
                                            <div className="G1_organizar_btn">
                                                <button onClick={redirecionarTela} onClickCapture={() => setIdAtividadeModal(atividade.idAtividade)} className="G1_btn_vizualizar">Visualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
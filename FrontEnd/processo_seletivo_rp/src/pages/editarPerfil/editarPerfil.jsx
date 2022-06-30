import React, { useState } from "react"
import Logo from "../../assets/img/2rpnet.svg"
import axios from 'axios';
import '../../assets/css/cadastroUsuarios.css'
import { useHistory } from 'react-router-dom'
import { parseJwt } from "../../services/auth";
import HeaderUsuario from "../../components/header/header";
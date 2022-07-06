# Processo Seletivo 2RP

## Sobre
A proposta do projeto é desenvolver uma aplicação que possibilita o cadastro, login, vizualização e alteração de usuários.

## Tecnologias
<div>
  <h3>Modelagem</h3>
  <img align = "center" alt = "Draw.io" height = "40" width = "40" src = "https://avatars.githubusercontent.com/u/1769238?s=200&v=4">
  <h3>Banco De Dados</h3>
  <img align = "center" alt = "SQL Server" height = "40" width = "40" src ="https://img.icons8.com/color/48/000000/microsoft-sql-server.png">
  <h3>Layout</h3>
  <img align = "center" alt = "Figma" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg">
  <h3>Versionamento</h3>
  <img align = "center" alt = "Git" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg">
  <h3>Back-End</h3>
  <img align = "center" alt = "C#" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/csharp/csharp-original.svg">
  <h3>Front-End</h3>
  <img align = "center" alt = "Html" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg">
  <img align = "center" alt = "CSS" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg">
  <img align = "center" alt = "JavaScript" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg">
  <img align = "center" alt = "ReactJs" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg">
  <img align = "center" alt = "NodeJs" height = "40" width = "40" src = "https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg">
</div>
<h2>Back-End</h2>
<p>O Back-End foi feito com uma API, com a IDE Microsoft Visual studio.</p>
<p><strong>Api</strong> é um conjunto de padrões e instruções estabelecidos para utilização do software, definindo as requisições e as respostas seguindo o protocolo HTTP, neste caso expresso no formato JSON, para que seja possível acessar o sistema em diversos dispositivos distintos sem a preocupação com a linguagem que será utilizada por estes.</p>
<p>Além disso, foi utilizado o estilo de arquitetura REST.</p>
<p><strong>API -</strong> Application Programming Interface – Interface de Programação de Aplicativos.</p>
<p><strong>HTTP -</strong> Hypertext Transfer Protocol – Protocolo de Transferência de Hipertexto.</p>
<p><strong>JSON -</strong> JavaScript Object Notation – Notação de Objetos JavaScript.</p>
<p><strong>REST -</strong> Representational State Transfer – Interface de Programação de Aplicativos.</p>
<p><strong>Entity Framework</strong> é um conjunto de tecnologias no ADO.NET que dão suporte ao desenvolvimento de aplicativos de software orientado a dados. O Entity Framework permite que os desenvolvedores trabalhem com dados na forma de objetos e propriedades específicos de domínio, como clientes e endereços de clientes, sem ter que se preocupar com as tabelas e colunas de banco de dados subjacentes em que esses data são armazenados.</p>
<p><strong>DataBase First </strong>é o método de construção da API onde se usa as tabelas preexististentes no banco de dados, e os transforma em classes dentro da API</p>
<p><strong>JWT </strong>é o método de autenticação usado, onde a autenticação é por meio de tokens.</p>

Como executar a API passo a passo:  
•	Clone o repositório do GIT  
•	Abra a pasta BackEnd  
•	Abra a pasta api_processo_seletivo_2rp  
•	Abra solução api_processo_seletivo_2rp.sln (irá abrir o visual studio)  
•	Abra o arquivo “appsettings.json“ na aba "Gerenciador de Soluções" à direita  
•	Substitua os dados de "ConnectionStrings" de acordo com os dados da sua máquina  
•	Inicie a API na aba superior  

<h2>Front-End</h2>
<p>Interface gráfica do sistema, desenvolvida com a biblioteca React.Js.</p>
<p>Foram desenvolvidas 7 páginas:</p>
<ul>
  <li>Login: Página que ao preencher os campos de email e senha gera um token e redireciona para as outras páginas baseado nas permissões no token gerado.</li>
  <li>Cadastro: Página onde os administradores e roots podem cadastrar novos usuários.</li>
  <li>EditarPerfil: Página onde os administradores e roots podem alterar as informações de outros usuários.</li>
  <li>EditarMeuPerfil: Página onde os usuários podem alterar as próprias informações.</li>
  <li>MeuPerfil: Página onde os usuários podem vizualizar as próprias informações detalhadas.</li>
  <li>Perfil: Página onde os administradores e roots podem vizualizar as informações detalhadas de outros usuários.</li>
  <li>VerPerfil: Página onde os administradores e roots podem vizualizar todos os usuários e suas informações.</li>
</ul>

Como executar o Front-End passo a passo:  
•	Clone o repositório do GIT  
•	Abra a pasta FrontEnd  
•	Abra a pasta "processo_seletivo_rp" clicando com o botão direito do mouse e selecionando "Abrir com VS Code"  
•	Ao abrir, na parte superior selecione "Terminal"  
•	Ao abrir o terminal na parte inferior, digite "npm i"  
•	Depois que baixar os pacotes, digite "npm start", e abrirá a aplicação no seu navegador  
•	Com o Banco instalado na máquina, a API rodando, e a aplicação aberta no navegador, será possível testar a aplicação perfeitamente de ponta a ponta

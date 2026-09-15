/* =====================================================
   MEGA SENHA - MEGA SHOW
   DUPLAS FIXAS + 3 RODADAS + DESEMPATE
===================================================== */


/* =====================================================
   PALAVRAS
===================================================== */

const palavrasFaceis = [
"MAÇÃ","BANANA","CACHORRO","GATO","BOLA","CARRO",
"CASA","PIZZA","BOLO","SORVETE","PRAIA","ESCOLA",
"LIVRO","CELULAR","TELEVISÃO","MESA","CADEIRA","CAMA",
"SAPATO","CAMISETA","CHUVA","SOL","LUA","ESTRELA",
"ÁRVORE","FLOR","PEIXE","CAVALO","VACA","MACACO",
"CAFÉ","ÁGUA","PÃO","QUEIJO","ARROZ","ÔNIBUS",
"TREM","BICICLETA","AVIÃO","MOTO","ESCOVA","ESPELHO",
"RELÓGIO","MOCHILA","CANETA","LÁPIS","FUTEBOL","MÚSICA",
"DANÇA","PRESENTE","FESTA","BALÃO","CHOCOLATE","MORANGO",
"MELANCIA","UVA","LARANJA","LIMÃO","MANGA","GELADEIRA",
"FOGÃO","TELEFONE","JANELA","PORTA","QUARTO","COZINHA",
"BANHEIRO","SOFÁ","JARDIM","CADERNO","PROFESSOR","ALUNO",
"PROVA","MÉDICO","DENTISTA","POLICIAL","BOMBEIRO","PINTOR"
];

const palavrasMedias = [
"AEROPORTO","HOSPITAL","RESTAURANTE","SHOPPING","MERCADO",
"BIBLIOTECA","CINEMA","TEATRO","ACADEMIA","ESCRITÓRIO",
"COMPUTADOR","INTERNET","SENHA","APLICATIVO","CÂMERA",
"MICROFONE","VIOLÃO","PIANO","BATERIA","PISCINA",
"CACHOEIRA","MONTANHA","FLORESTA","DESERTO","ILHA",
"NAVIO","HELICÓPTERO","AMBULÂNCIA","TRATOR","TÁXI",
"ANIVERSÁRIO","CASAMENTO","CARNAVAL","NATAL","PÁSCOA",
"FÉRIAS","VIAGEM","HOTEL","MALA","PASSAPORTE","PROFISSÃO",
"ENTREVISTA","REUNIÃO","PROJETO","EQUIPE","GERENTE","EMPRESA",
"PLANILHA","RELATÓRIO","RECEITA","COZINHEIRO","PADARIA",
"SORVETERIA","LANCHONETE","SUPERMERCADO","FARMÁCIA",
"CONSULTÓRIO","FACULDADE","UNIVERSIDADE","ESTÁDIO",
"CAMPEONATO","TORCIDA","JOGADOR","TREINADOR","MÚSICO",
"CANTOR","ATOR","DIRETOR","FOTÓGRAFO","JORNALISTA","REPÓRTER"
];

const palavrasDificeis = [
"CRIATIVIDADE","PERSISTÊNCIA","RESPONSABILIDADE",
"LIDERANÇA","SUSTENTABILIDADE","TECNOLOGIA","INOVAÇÃO",
"ESTRATÉGIA","COMUNICAÇÃO","COLABORAÇÃO","EMPATIA",
"CONFIANÇA","DEMOCRACIA","LIBERDADE","JUSTIÇA","IGUALDADE",
"UNIVERSO","GRAVIDADE","ASTRONAUTA","GALÁXIA","EXPERIMENTO",
"CIÊNCIA","DESCOBERTA","INVENÇÃO","PSICOLOGIA","FILOSOFIA",
"HISTÓRIA","GEOGRAFIA","ECONOMIA","POLÍTICA","CULTURA",
"TRADIÇÃO","IMAGINAÇÃO","CURIOSIDADE","CONCENTRAÇÃO",
"MOTIVAÇÃO","DETERMINAÇÃO","GENEROSIDADE","SOLIDARIEDADE",
"COMPETITIVIDADE","OPORTUNIDADE","PLANEJAMENTO",
"ORGANIZAÇÃO","PRODUTIVIDADE","QUALIDADE","SEGURANÇA",
"PRESERVAÇÃO","RECICLAGEM","MEIO AMBIENTE"
];


/* =====================================================
   VARIÁVEIS
===================================================== */

let jogadores = [];
let duplas = [];

let rodada = 1;
let indiceDupla = 0;

let duplaAtual = null;

let jogadorPista = null;
let jogadorAdivinha = null;

let vezAtual = 1;

let acertos = 0;
let passes = 0;

let tempo = 60;
let intervalo = null;

let indiceDificuldade = 0;
let palavrasUsadas = [];

let desempate = false;
let duplasDesempate = [];
let placarDesempate = {};

let indiceDuplaDesempate = 0;


/* =====================================================
   ELEMENTOS
===================================================== */

const btnComecar =
document.getElementById("btnComecar");

const btnComecarRodada =
document.getElementById("btnComecarRodada");

const btnAcertou =
document.getElementById("btnAcertou");

const btnPular =
document.getElementById("btnPular");

const btnAnular =
document.getElementById("btnAnular");

const btnTrocarTurno =
document.getElementById("btnTrocarTurno");

const btnProximaDupla =
document.getElementById("btnProximaDupla");

const btnContinuar =
document.getElementById("btnContinuar");

const btnNovoJogo =
document.getElementById("btnNovoJogo");


/* =====================================================
   TROCAR TELA
===================================================== */

function mostrarTela(id){

document.querySelectorAll(".tela").forEach(tela=>{
tela.classList.remove("ativa");
});

const tela=document.getElementById(id);

if(tela){
tela.classList.add("ativa");
}

}


/* =====================================================
   COMEÇAR JOGO
===================================================== */

btnComecar.addEventListener("click", iniciarJogo);


function iniciarJogo(){

jogadores=[];

for(let i=1;i<=6;i++){

const campo=document.getElementById(`nome${i}`);

const nome=campo.value.trim();

if(nome===""){

alert(`Digite o nome do participante ${i}.`);

campo.focus();

return;

}

jogadores.push({
id:i,
nome:nome,
pontos:0
});

}

rodada=1;
indiceDupla=0;

desempate=false;

duplasDesempate=[];
placarDesempate={};

palavrasUsadas=[];
indiceDificuldade=0;

prepararRodada();

}


/* =====================================================
   PREPARAR RODADA
===================================================== */

function prepararRodada(){

clearInterval(intervalo);

indiceDupla=0;

criarDuplas();

document.getElementById("numeroRodada").textContent=rodada;

mostrarListaDuplas();

mostrarTela("duplasTela");

}


/* =====================================================
   CRIAR DUPLAS FIXAS
===================================================== */

function criarDuplas(){

/*
   PARTICIPANTES FIXOS:

   DUPLA 1 = 1 + 2
   DUPLA 2 = 3 + 4
   DUPLA 3 = 5 + 6

   NÃO EMBARALHA.
*/

duplas=[
[jogadores[0],jogadores[1]],
[jogadores[2],jogadores[3]],
[jogadores[4],jogadores[5]]
];

}


/* =====================================================
   MOSTRAR DUPLAS
===================================================== */

function mostrarListaDuplas(){

const container=document.getElementById("duplasContainer");

container.innerHTML="";

duplas.forEach((dupla,index)=>{

const card=document.createElement("div");

card.className="dupla";

card.innerHTML=`

<h3>DUPLA ${index+1}</h3>

<p>${dupla[0].nome}</p>

<p>+</p>

<p>${dupla[1].nome}</p>

`;

container.appendChild(card);

});

}


/* =====================================================
   COMEÇAR RODADA
===================================================== */

btnComecarRodada.addEventListener(
"click",
()=>{

indiceDupla=0;

iniciarDupla();

}
);


/* =====================================================
   INICIAR DUPLA
===================================================== */

function iniciarDupla(){

if(desempate){

iniciarDuplaDesempate();

return;

}

if(indiceDupla>=duplas.length){

finalizarRodada();

return;

}

duplaAtual=duplas[indiceDupla];

indiceDupla++;

jogadorPista=duplaAtual[0];

jogadorAdivinha=duplaAtual[1];

vezAtual=1;

iniciarTurno();

}


/* =====================================================
   INICIAR TURNO
===================================================== */

function iniciarTurno(){

clearInterval(intervalo);

tempo=60;

acertos=0;

passes=0;

document.getElementById("rodadaTopo").textContent=
desempate ? "DESEMPATE" : rodada;

document.getElementById("jogadorPista").textContent=
jogadorPista.nome;

document.getElementById("jogadorAdivinha").textContent=
jogadorAdivinha.nome;

document.getElementById("acertos").textContent="0";

document.getElementById("pulos").textContent="0";

document.getElementById("cronometro").textContent="01:00";

document.getElementById("cronometro")
.classList.remove("urgente");

btnAcertou.disabled=false;
btnPular.disabled=false;

if(btnAnular){
btnAnular.disabled=false;
}

novaPalavra();

mostrarTela("jogoTela");

iniciarCronometro();

}


/* =====================================================
   CRONÔMETRO
===================================================== */

function iniciarCronometro(){

clearInterval(intervalo);

intervalo=setInterval(()=>{

tempo--;

atualizarCronometro();

if(tempo<=0){

clearInterval(intervalo);

finalizarTurno();

}

},1000);

}


/* =====================================================
   CRONÔMETRO VISUAL
===================================================== */

function atualizarCronometro(){

const minutos=Math.floor(tempo/60);

const segundos=tempo%60;

document.getElementById("cronometro").textContent=
`${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;

if(tempo<=10){

document.getElementById("cronometro")
.classList.add("urgente");

}

}


/* =====================================================
   NOVA PALAVRA
===================================================== */

function novaPalavra(){

let lista;

if(indiceDificuldade===0){

lista=palavrasFaceis;

}else if(indiceDificuldade===1){

lista=palavrasMedias;

}else{

lista=palavrasDificeis;

}

let disponiveis=lista.filter(
palavra=>!palavrasUsadas.includes(palavra)
);

if(disponiveis.length===0){

disponiveis=[...lista];

}

const palavra=
disponiveis[
Math.floor(Math.random()*disponiveis.length)
];

palavrasUsadas.push(palavra);

document.getElementById("palavra").textContent=palavra;

indiceDificuldade++;

if(indiceDificuldade>=3){

indiceDificuldade=0;

}

}


/* =====================================================
   ACERTOU
===================================================== */

btnAcertou.addEventListener(
"click",
()=>{

if(tempo<=0)return;

acertos++;

if(desempate){

placarDesempate[duplaAtual.id]++;
    
}else{

duplaAtual[0].pontos++;
duplaAtual[1].pontos++;

}

document.getElementById("acertos").textContent=acertos;

novaPalavra();

}
);


/* =====================================================
   PULAR
===================================================== */

btnPular.addEventListener(
"click",
()=>{

if(tempo<=0)return;

if(passes>=3)return;

passes++;

document.getElementById("pulos").textContent=passes;

if(passes>=3){

btnPular.disabled=true;

}

novaPalavra();

}
);


/* =====================================================
   PALAVRA ANULADA
===================================================== */

if(btnAnular){

btnAnular.addEventListener(
"click",
()=>{

if(tempo<=0)return;

/*
   A PALAVRA É ANULADA.

   Não soma ponto.
   Não gasta pulo.
   Não para o cronômetro.
   Apenas troca a palavra.
*/

novaPalavra();

}
);

}


/* =====================================================
   FINALIZAR TURNO
===================================================== */

function finalizarTurno(){

clearInterval(intervalo);

tempo=0;

document.getElementById("cronometro")
.textContent="00:00";

document.getElementById("cronometro")
.classList.remove("urgente");

btnAcertou.disabled=true;
btnPular.disabled=true;

if(btnAnular){
btnAnular.disabled=true;
}


/*
   PRIMEIRO TURNO

   Troca as funções dos mesmos dois jogadores.
*/

if(vezAtual===1){

document.getElementById("jogadorSai")
.textContent=jogadorPista.nome;

document.getElementById("jogadorEntra")
.textContent=jogadorAdivinha.nome;

document.getElementById("mensagemTroca")
.textContent=
"Agora os jogadores devem trocar de função.";

mostrarTela("trocaDuplaTela");

return;

}


/*
   SEGUNDO TURNO

   Dupla terminou.
*/

prepararTrocaDeDupla();

}


/* =====================================================
   SEGUNDO TURNO
===================================================== */

btnTrocarTurno.addEventListener(
"click",
()=>{

const temporario=jogadorPista;

jogadorPista=jogadorAdivinha;

jogadorAdivinha=temporario;

vezAtual=2;

iniciarTurno();

}
);


/* =====================================================
   PAUSA ENTRE DUPLAS
===================================================== */

function prepararTrocaDeDupla(){

clearInterval(intervalo);

const duplaAnterior=
duplas[indiceDupla-1];

const proxima=
duplas[indiceDupla];

document.getElementById("duplaAnterior")
.textContent=
duplaAnterior
.map(jogador=>jogador.nome)
.join(" + ");

if(proxima){

document.getElementById("proximaDupla")
.textContent=
proxima
.map(jogador=>jogador.nome)
.join(" + ");

btnProximaDupla.textContent=
"INICIAR PRÓXIMA DUPLA";

mostrarTela("trocaProximaDuplaTela");

}else{

finalizarRodada();

}

}


/* =====================================================
   PRÓXIMA DUPLA
===================================================== */

btnProximaDupla.addEventListener(
"click",
()=>{

iniciarDupla();

}
);


/* =====================================================
   FINALIZAR RODADA
===================================================== */

function finalizarRodada(){

clearInterval(intervalo);

mostrarResultadoRodada();

}


/* =====================================================
   RESULTADO DA RODADA
===================================================== */

function mostrarResultadoRodada(){

const container=
document.getElementById("resultadoContainer");

container.innerHTML="";

duplas.forEach((dupla,index)=>{

const total=dupla[0].pontos;

const item=document.createElement("div");

item.className="resultado-item";

item.innerHTML=`

<span>
<strong>DUPLA ${index+1}</strong><br>
${dupla[0].nome} + ${dupla[1].nome}
</span>

<strong>
${total} pontos
</strong>

`;

container.appendChild(item);

});


const maiores=
duplas.map(dupla=>dupla[0].pontos);

const maior=Math.max(...maiores);

const lideres=
duplas.filter(
dupla=>dupla[0].pontos===maior
);

if(rodada<3){

document.getElementById("mensagemEliminacao")
.textContent=
`Rodada ${rodada} finalizada.`;

btnContinuar.textContent=
"PRÓXIMA RODADA";

}else{

if(lideres.length>1){

document.getElementById("mensagemEliminacao")
.textContent=
"⚡ EMPATE! VAMOS PARA O DESEMPATE!";

btnContinuar.textContent=
"INICIAR DESEMPATE";

}else{

document.getElementById("mensagemEliminacao")
.textContent=
"🏆 Temos uma dupla campeã!";

btnContinuar.textContent=
"VER CAMPEÃO";

}

}

mostrarTela("resultadoTela");

}


/* =====================================================
   CONTINUAR
===================================================== */

btnContinuar.addEventListener(
"click",
()=>{

/*
   MENOS DE 3 RODADAS
*/

if(rodada<3){

rodada++;

prepararRodada();

return;

}


/*
   3 RODADAS TERMINARAM.

   VERIFICA EMPATE.
*/

const totais=duplas.map(
dupla=>dupla[0].pontos
);

const maior=Math.max(...totais);

const empatadas=
duplas.filter(
dupla=>dupla[0].pontos===maior
);

if(empatadas.length>1){

iniciarDesempate(empatadas);

}else{

mostrarCampeao();

}

}
);


/* =====================================================
   INICIAR DESEMPATE
===================================================== */

function iniciarDesempate(lista){

desempate=true;

duplasDesempate=[...lista];

placarDesempate={};

duplasDesempate.forEach((dupla,index)=>{

dupla.id=
`desempate_${index}`;

placarDesempate[dupla.id]=0;

});

indiceDuplaDesempate=0;

document.getElementById("numeroRodada")
.textContent="DESEMPATE";

mostrarListaDuplasDesempate();

mostrarTela("duplasTela");

btnComecarRodada.textContent=
"COMEÇAR DESEMPATE";

}


/* =====================================================
   MOSTRAR DUPLAS DO DESEMPATE
===================================================== */

function mostrarListaDuplasDesempate(){

const container=
document.getElementById("duplasContainer");

container.innerHTML="";

duplasDesempate.forEach(
(dupla,index)=>{

const card=document.createElement("div");

card.className="dupla";

card.innerHTML=`

<h3>DUPLA ${index+1}</h3>

<p>${dupla[0].nome}</p>

<p>+</p>

<p>${dupla[1].nome}</p>

`;

container.appendChild(card);

});

}


/* =====================================================
   INICIAR DUPLA DO DESEMPATE
===================================================== */

function iniciarDuplaDesempate(){

if(
indiceDuplaDesempate>=
duplasDesempate.length
){

finalizarDesempate();

return;

}

duplaAtual=
duplasDesempate[indiceDuplaDesempate];

indiceDuplaDesempate++;

jogadorPista=duplaAtual[0];

jogadorAdivinha=duplaAtual[1];

vezAtual=1;

iniciarTurno();

}


/* =====================================================
   PAUSA ENTRE DUPLAS NO DESEMPATE
===================================================== */

function prepararTrocaDeDuplaDesempate(){

clearInterval(intervalo);

const anterior=
duplasDesempate[
indiceDuplaDesempate-1
];

const proxima=
duplasDesempate[
indiceDuplaDesempate
];

document.getElementById("duplaAnterior")
.textContent=
anterior
.map(j=>j.nome)
.join(" + ");

if(proxima){

document.getElementById("proximaDupla")
.textContent=
proxima
.map(j=>j.nome)
.join(" + ");

btnProximaDupla.textContent=
"INICIAR PRÓXIMA DUPLA";

mostrarTela("trocaProximaDuplaTela");

}else{

finalizarDesempate();

}

}


/* =====================================================
   CORREÇÃO DA TROCA NO DESEMPATE
===================================================== */

const finalizarTurnoOriginal=finalizarTurno;


/*
   Substitui somente a parte final do turno
   quando for desempate.
*/

function prepararTrocaDeDupla(){

clearInterval(intervalo);

if(desempate){

const anterior=
duplasDesempate[
indiceDuplaDesempate-1
];

const proxima=
duplasDesempate[
indiceDuplaDesempate
];

document.getElementById("duplaAnterior")
.textContent=
anterior
.map(j=>j.nome)
.join(" + ");

if(proxima){

document.getElementById("proximaDupla")
.textContent=
proxima
.map(j=>j.nome)
.join(" + ");

btnProximaDupla.textContent=
"INICIAR PRÓXIMA DUPLA";

mostrarTela("trocaProximaDuplaTela");

}else{

finalizarDesempate();

}

return;

}

const duplaAnterior=
duplas[indiceDupla-1];

const proxima=
duplas[indiceDupla];

document.getElementById("duplaAnterior")
.textContent=
duplaAnterior
.map(jogador=>jogador.nome)
.join(" + ");

if(proxima){

document.getElementById("proximaDupla")
.textContent=
proxima
.map(jogador=>jogador.nome)
.join(" + ");

btnProximaDupla.textContent=
"INICIAR PRÓXIMA DUPLA";

mostrarTela("trocaProximaDuplaTela");

}else{

finalizarRodada();

}

}


/* =====================================================
   FINALIZAR DESEMPATE
===================================================== */

function finalizarDesempate(){

clearInterval(intervalo);

const maiores=
duplasDesempate.map(
dupla=>placarDesempate[dupla.id]
);

const maior=Math.max(...maiores);

const vencedoras=
duplasDesempate.filter(
dupla=>
placarDesempate[dupla.id]===maior
);

const container=
document.getElementById("resultadoContainer");

container.innerHTML="";

duplasDesempate.forEach(
(dupla,index)=>{

const item=document.createElement("div");

item.className="resultado-item";

item.innerHTML=`

<span>
<strong>DUPLA ${index+1}</strong><br>
${dupla[0].nome} + ${dupla[1].nome}
</span>

<strong>
${placarDesempate[dupla.id]} pontos
</strong>

`;

container.appendChild(item);

});


if(vencedoras.length>1){

document.getElementById("mensagemEliminacao")
.textContent=
"⚡ EMPATE NOVAMENTE! TEREMOS MAIS UM DESEMPATE.";

btnContinuar.textContent=
"NOVO DESEMPATE";

}else{

const campea=vencedoras[0];

window.duplaCampea=campea;

document.getElementById("mensagemEliminacao")
.textContent=
`🏆 ${campea[0].nome} + ${campea[1].nome} VENCERAM O DESEMPATE!`;

btnContinuar.textContent=
"VER CAMPEÃO";

}

mostrarTela("resultadoTela");

}


/* =====================================================
   AJUSTE DO BOTÃO CONTINUAR NO DESEMPATE
===================================================== */

btnContinuar.addEventListener(
"click",
()=>{

if(!desempate){

return;

}

if(window.duplaCampea){

mostrarCampeao();

return;

}

/*
   Empatou novamente.
   Começa outro desempate apenas
   com as duplas que empataram.
*/

const maiores=
duplasDesempate.map(
dupla=>placarDesempate[dupla.id]
);

const maior=Math.max(...maiores);

const empatadas=
duplasDesempate.filter(
dupla=>placarDesempate[dupla.id]===maior
);

window.duplaCampea=null;

iniciarDesempate(empatadas);

}
);


/* =====================================================
   CAMPEÃO
===================================================== */

function mostrarCampeao(){

clearInterval(intervalo);

let campeao;

if(window.duplaCampea){

campeao=window.duplaCampea;

}else{

const maiores=
duplas.map(
dupla=>dupla[0].pontos
);

const maior=Math.max(...maiores);

campeao=
duplas.find(
dupla=>dupla[0].pontos===maior
);

}

document.getElementById("campeaoNome")
.textContent=
`${campeao[0].nome.toUpperCase()} + ${campeao[1].nome.toUpperCase()}`;

mostrarTela("campeaoTela");

}


/* =====================================================
   NOVO JOGO
===================================================== */

btnNovoJogo.addEventListener(
"click",
()=>{

location.reload();

});

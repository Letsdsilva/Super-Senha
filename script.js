/* =====================================================
   MEGA SENHA - MEGA SHOW
   6 PARTICIPANTES
   3 DUPLAS FIXAS
   3 RODADAS
   DESEMPATE
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
   ELEMENTOS
===================================================== */

const btnComecar = document.getElementById("btnComecar");
const btnComecarRodada = document.getElementById("btnComecarRodada");
const btnAcertou = document.getElementById("btnAcertou");
const btnPular = document.getElementById("btnPular");
const btnAnular = document.getElementById("btnAnular");
const btnTrocarTurno = document.getElementById("btnTrocarTurno");
const btnProximaDupla = document.getElementById("btnProximaDupla");
const btnContinuar = document.getElementById("btnContinuar");
const btnNovoJogo = document.getElementById("btnNovoJogo");


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

let palavrasUsadas = [];

let indiceDificuldade = 0;

let fase = "normal";

let duplasTiebreak = [];

let indiceTiebreak = 0;

let placarTiebreak = new Map();

let campea = null;


/* =====================================================
   TROCAR TELA
===================================================== */

function mostrarTela(id){

  document
    .querySelectorAll(".tela")
    .forEach(tela => {
      tela.classList.remove("ativa");
    });

  const tela = document.getElementById(id);

  if(tela){
    tela.classList.add("ativa");
  }

}


/* =====================================================
   PARAR CRONÔMETRO
===================================================== */

function pararCronometro(){

  clearInterval(intervalo);

  intervalo = null;

}


/* =====================================================
   INICIAR JOGO
===================================================== */

function iniciarJogo(){

  const novosJogadores = [];

  for(let i = 1; i <= 6; i++){

    const campo = document.getElementById(`nome${i}`);

    const nome = campo.value.trim();

    if(nome === ""){

      alert(`Digite o nome do participante ${i}.`);

      campo.focus();

      return;

    }

    novosJogadores.push({
      id: i,
      nome: nome,
      pontos: 0
    });

  }


  jogadores = novosJogadores;


  /* DUPLAS FIXAS */

  duplas = [

    [jogadores[0], jogadores[1]],

    [jogadores[2], jogadores[3]],

    [jogadores[4], jogadores[5]]

  ];


  rodada = 1;

  indiceDupla = 0;

  fase = "normal";

  campea = null;

  duplasTiebreak = [];

  indiceTiebreak = 0;

  placarTiebreak = new Map();

  palavrasUsadas = [];

  indiceDificuldade = 0;


  prepararRodada();

}


/* =====================================================
   PREPARAR RODADA
===================================================== */

function prepararRodada(){

  pararCronometro();

  fase = "normal";

  indiceDupla = 0;


  document.getElementById("numeroRodada").textContent = rodada;

  document.getElementById("btnComecarRodada").textContent =
    "COMEÇAR RODADA";


  mostrarListaDuplas(duplas);

  mostrarTela("duplasTela");

}


/* =====================================================
   MOSTRAR DUPLAS
===================================================== */

function mostrarListaDuplas(lista){

  const container =
    document.getElementById("duplasContainer");

  container.innerHTML = "";


  lista.forEach((dupla,index)=>{

    const card = document.createElement("div");

    card.className = "dupla";


    const numero =
      dupla.numero ||
      (duplas.indexOf(dupla) + 1) ||
      (index + 1);


    card.innerHTML = `

      <h3>DUPLA ${numero}</h3>

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

function iniciarRodada(){

  if(fase === "tiebreak"){

    indiceTiebreak = 0;

  }else{

    indiceDupla = 0;

  }

  iniciarProximaDupla();

}


/* =====================================================
   INICIAR PRÓXIMA DUPLA
===================================================== */

function iniciarProximaDupla(){

  if(fase === "tiebreak"){

    if(
      indiceTiebreak >= duplasTiebreak.length
    ){

      finalizarTiebreak();

      return;

    }


    duplaAtual =
      duplasTiebreak[indiceTiebreak];

    indiceTiebreak++;

  }

  else{

    if(
      indiceDupla >= duplas.length
    ){

      finalizarRodada();

      return;

    }


    duplaAtual =
      duplas[indiceDupla];

    indiceDupla++;

  }


  jogadorPista = duplaAtual[0];

  jogadorAdivinha = duplaAtual[1];

  vezAtual = 1;


  iniciarTurno();

}


/* =====================================================
   INICIAR TURNO
===================================================== */

function iniciarTurno(){

  pararCronometro();


  tempo = 60;

  acertos = 0;

  passes = 0;


  document.getElementById("rodadaTopo").textContent =
    fase === "tiebreak"
      ? "DESEMPATE"
      : rodada;


  document.getElementById("nomeDuplaAtual").textContent =
    `DUPLA ${duplaNumero(duplaAtual)}`;


  document.getElementById("jogadorPista").textContent =
    jogadorPista.nome;


  document.getElementById("jogadorAdivinha").textContent =
    jogadorAdivinha.nome;


  document.getElementById("acertos").textContent = "0";

  document.getElementById("pulos").textContent = "0";

  document.getElementById("cronometro").textContent = "01:00";


  document
    .getElementById("cronometro")
    .classList.remove("urgente");


  btnAcertou.disabled = false;

  btnPular.disabled = false;

  btnAnular.disabled = false;


  novaPalavra();


  mostrarTela("jogoTela");


  intervalo = setInterval(()=>{

    tempo--;

    atualizarCronometro();


    if(tempo <= 0){

      finalizarTurno();

    }

  },1000);

}


/* =====================================================
   CRONÔMETRO
===================================================== */

function atualizarCronometro(){

  const minutos =
    Math.floor(tempo / 60);

  const segundos =
    tempo % 60;


  document.getElementById("cronometro").textContent =
    `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;


  document
    .getElementById("cronometro")
    .classList.toggle(
      "urgente",
      tempo <= 10
    );

}


/* =====================================================
   NOVA PALAVRA
===================================================== */

function novaPalavra(){

  const listas = [

    palavrasFaceis,

    palavrasMedias,

    palavrasDificeis

  ];


  const lista =
    listas[indiceDificuldade];


  let disponiveis =
    lista.filter(
      palavra =>
        !palavrasUsadas.includes(palavra)
    );


  if(disponiveis.length === 0){

    palavrasUsadas = [];

    disponiveis = [...lista];

  }


  const palavra =
    disponiveis[
      Math.floor(
        Math.random() *
        disponiveis.length
      )
    ];


  palavrasUsadas.push(palavra);


  document.getElementById("palavra").textContent =
    palavra;


  indiceDificuldade++;

  if(indiceDificuldade >= 3){

    indiceDificuldade = 0;

  }

}


/* =====================================================
   ACERTO
===================================================== */

function registrarAcerto(){

  if(tempo <= 0){

    return;

  }


  acertos++;


  if(fase === "tiebreak"){

    const atual =
      placarTiebreak.get(duplaAtual) || 0;

    placarTiebreak.set(
      duplaAtual,
      atual + 1
    );

  }

  else{

    /* PONTO PERTENCE À DUPLA */

    duplaAtual[0].pontos++;

  }


  document.getElementById("acertos").textContent =
    acertos;


  novaPalavra();

}


/* =====================================================
   PULAR
===================================================== */

function pular(){

  if(tempo <= 0){

    return;

  }


  if(passes >= 3){

    return;

  }


  passes++;


  document.getElementById("pulos").textContent =
    passes;


  if(passes >= 3){

    btnPular.disabled = true;

  }


  novaPalavra();

}


/* =====================================================
   PALAVRA ANULADA
===================================================== */

function anular(){

  if(tempo <= 0){

    return;

  }


  /*

    NÃO soma ponto.

    NÃO gasta pulo.

    NÃO reinicia cronômetro.

    NÃO encerra turno.

  */


  novaPalavra();

}


/* =====================================================
   FINALIZAR TURNO
===================================================== */

function finalizarTurno(){

  pararCronometro();


  tempo = 0;


  document.getElementById("cronometro").textContent =
    "00:00";


  btnAcertou.disabled = true;

  btnPular.disabled = true;

  btnAnular.disabled = true;


  /* PRIMEIRO TURNO */

  if(vezAtual === 1){

    document.getElementById("jogadorSai").textContent =
      jogadorAdivinha.nome;


    document.getElementById("jogadorEntra").textContent =
      jogadorPista.nome;


    document.getElementById("mensagemTroca").textContent =
      "Agora os jogadores devem trocar de função.";


    mostrarTela("trocaDuplaTela");

    return;

  }


  /* SEGUNDO TURNO */

  prepararTrocaDeDupla();

}


/* =====================================================
   TROCAR FUNÇÕES
===================================================== */

function trocarTurno(){

  const temporario =
    jogadorPista;


  jogadorPista =
    jogadorAdivinha;


  jogadorAdivinha =
    temporario;


  vezAtual = 2;


  iniciarTurno();

}


/* =====================================================
   PREPARAR TROCA DA DUPLA
===================================================== */

function prepararTrocaDeDupla(){

  const lista =
    fase === "tiebreak"
      ? duplasTiebreak
      : duplas;


  const indice =
    fase === "tiebreak"
      ? indiceTiebreak
      : indiceDupla;


  const anterior =
    lista[indice - 1];


  const proxima =
    lista[indice];


  if(proxima){

    document.getElementById("duplaAnterior").textContent =
      `${anterior[0].nome} + ${anterior[1].nome}`;


    document.getElementById("proximaDupla").textContent =
      `${proxima[0].nome} + ${proxima[1].nome}`;


    btnProximaDupla.textContent =
      "INICIAR PRÓXIMA DUPLA";


    mostrarTela("trocaProximaDuplaTela");

  }

  else{

    if(fase === "tiebreak"){

      finalizarTiebreak();

    }

    else{

      finalizarRodada();

    }

  }

}


/* =====================================================
   FINALIZAR RODADA
===================================================== */

function finalizarRodada(){

  pararCronometro();

  mostrarResultado(false);

}


/* =====================================================
   MOSTRAR RESULTADO
===================================================== */

function mostrarResultado(ehTiebreak){

  const container =
    document.getElementById("resultadoContainer");


  container.innerHTML = "";


  const lista =
    ehTiebreak
      ? duplasTiebreak
      : duplas;


  lista.forEach((dupla,index)=>{

    let pontos;


    if(ehTiebreak){

      pontos =
        placarTiebreak.get(dupla) || 0;

    }

    else{

      pontos =
        dupla[0].pontos;

    }


    const item =
      document.createElement("div");


    item.className =
      "resultado-item";


    const numero =
      duplaNumero(dupla);


    item.innerHTML = `

      <span>

        <strong>DUPLA ${numero}</strong>

        <br>

        ${dupla[0].nome}
        +
        ${dupla[1].nome}

      </span>

      <strong>

        ${pontos}
        ponto${pontos === 1 ? "" : "s"}

      </strong>

    `;


    container.appendChild(item);

  });


  /* RESULTADO NORMAL */

  if(!ehTiebreak){

    document.getElementById(
      "numeroRodadaResultado"
    ).textContent = rodada;


    const maior =
      Math.max(
        ...duplas.map(
          dupla => dupla[0].pontos
        )
      );


    const lideres =
      duplas.filter(
        dupla =>
          dupla[0].pontos === maior
      );


    if(rodada < 3){

      document.getElementById(
        "mensagemResultado"
      ).textContent =
        `Rodada ${rodada} finalizada.`;


      btnContinuar.textContent =
        "PRÓXIMA RODADA";

    }

    else if(lideres.length > 1){

      document.getElementById(
        "mensagemResultado"
      ).textContent =
        "⚡ EMPATE! Vamos para o desempate.";


      btnContinuar.textContent =
        "INICIAR DESEMPATE";

    }

    else{

      campea =
        lideres[0];


      document.getElementById(
        "mensagemResultado"
      ).textContent =
        "🏆 Temos uma dupla campeã!";


      btnContinuar.textContent =
        "VER CAMPEÃO";

    }

  }


  /* RESULTADO DESEMPATE */

  else{

    document.getElementById(
      "numeroRodadaResultado"
    ).textContent =
      "DESEMPATE";


    const maior =
      Math.max(
        ...duplasTiebreak.map(
          dupla =>
            placarTiebreak.get(dupla) || 0
        )
      );


    const lideres =
      duplasTiebreak.filter(
        dupla =>
          (placarTiebreak.get(dupla) || 0)
          === maior
      );


    if(lideres.length > 1){

      document.getElementById(
        "mensagemResultado"
      ).textContent =
        "⚡ EMPATE NOVAMENTE! Teremos outro desempate.";


      btnContinuar.textContent =
        "NOVO DESEMPATE";

    }

    else{

      campea =
        lideres[0];


      document.getElementById(
        "mensagemResultado"
      ).textContent =
        `🏆 ${campea[0].nome} + ${campea[1].nome} venceram o desempate!`;


      btnContinuar.textContent =
        "VER CAMPEÃO";

    }

  }


  mostrarTela("resultadoTela");

}


/* =====================================================
   INICIAR DESEMPATE
===================================================== */

function iniciarDesempate(){

  const maior =
    Math.max(
      ...duplas.map(
        dupla =>
          dupla[0].pontos
      )
    );


  duplasTiebreak =
    duplas.filter(
      dupla =>
        dupla[0].pontos === maior
    );


  /* Guarda o número original da dupla */

  duplasTiebreak.forEach(dupla =>{

    dupla.numero =
      duplas.indexOf(dupla) + 1;

  });


  placarTiebreak =
    new Map();


  duplasTiebreak.forEach(dupla =>{

    placarTiebreak.set(
      dupla,
      0
    );

  });


  indiceTiebreak = 0;

  fase = "tiebreak";

  campea = null;


  document.getElementById(
    "numeroRodada"
  ).textContent =
    "DESEMPATE";


  btnComecarRodada.textContent =
    "COMEÇAR DESEMPATE";


  mostrarListaDuplas(
    duplasTiebreak
  );


  mostrarTela("duplasTela");

}


/* =====================================================
   FINALIZAR DESEMPATE
===================================================== */

function finalizarTiebreak(){

  pararCronometro();

  mostrarResultado(true);

}


/* =====================================================
   CONTINUAR
===================================================== */

function continuar(){

  /* RODADAS 1 E 2 */

  if(rodada < 3){

    rodada++;

    prepararRodada();

    return;

  }


  /* DESEMPATE */

  if(fase === "tiebreak"){

    const maior =
      Math.max(
        ...duplasTiebreak.map(
          dupla =>
            placarTiebreak.get(dupla) || 0
        )
      );


    const empatadas =
      duplasTiebreak.filter(
        dupla =>
          (placarTiebreak.get(dupla) || 0)
          === maior
      );


    /* Empatou novamente */

    if(empatadas.length > 1){

      duplasTiebreak =
        empatadas;


      placarTiebreak =
        new Map();


      duplasTiebreak.forEach(dupla =>{

        placarTiebreak.set(
          dupla,
          0
        );

      });


      indiceTiebreak = 0;


      document.getElementById(
        "numeroRodada"
      ).textContent =
        "DESEMPATE";


      btnComecarRodada.textContent =
        "COMEÇAR DESEMPATE";


      mostrarListaDuplas(
        duplasTiebreak
      );


      mostrarTela(
        "duplasTela"
      );


    }

    else{

      mostrarCampeao();

    }


    return;

  }


  /* DEPOIS DA 3ª RODADA */

  const maior =
    Math.max(
      ...duplas.map(
        dupla =>
          dupla[0].pontos
      )
    );


  const empatadas =
    duplas.filter(
      dupla =>
        dupla[0].pontos === maior
    );


  if(empatadas.length > 1){

    iniciarDesempate();

  }

  else{

    mostrarCampeao();

  }

}


/* =====================================================
   MOSTRAR CAMPEÃO
===================================================== */

function mostrarCampeao(){

  if(!campea){

    const maior =
      Math.max(
        ...duplas.map(
          dupla =>
            dupla[0].pontos
        )
      );


    campea =
      duplas.find(
        dupla =>
          dupla[0].pontos === maior
      );

  }


  document.getElementById(
    "campeaoNome"
  ).textContent =
    `DUPLA ${duplaNumero(campea)}`;


  document.getElementById(
    "campeaoIntegrantes"
  ).textContent =
    `${campea[0].nome} + ${campea[1].nome}`;


  document.getElementById(
    "campeaoPontos"
  ).textContent =
    `${campea[0].pontos} PONTOS NAS 3 RODADAS`;


  mostrarTela(
    "campeaoTela"
  );

}


/* =====================================================
   NÚMERO DA DUPLA
===================================================== */

function duplaNumero(dupla){

  if(!dupla){

    return "";

  }


  if(
    typeof dupla.numero === "number"
  ){

    return dupla.numero;

  }


  const indice =
    duplas.indexOf(dupla);


  if(indice >= 0){

    return indice + 1;

  }


  return "";

}


/* =====================================================
   BOTÕES
===================================================== */

btnComecar.addEventListener(
  "click",
  iniciarJogo
);


btnComecarRodada.addEventListener(
  "click",
  iniciarRodada
);


btnAcertou.addEventListener(
  "click",
  registrarAcerto
);


btnPular.addEventListener(
  "click",
  pular
);


btnAnular.addEventListener(
  "click",
  anular
);


btnTrocarTurno.addEventListener(
  "click",
  trocarTurno
);


btnProximaDupla.addEventListener(
  "click",
  iniciarProximaDupla
);


btnContinuar.addEventListener(
  "click",
  continuar
);


btnNovoJogo.addEventListener(
  "click",
  ()=>{
    location.reload();
  }
);

/* =====================================================
   MEGA SENHA - MEGA SHOW
   VERSÃO COMPLETA COM PAUSAS
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
let jogadoresAtivos = [];
let duplas = [];

let rodada = 1;

let indiceDupla = 0;

let vezAtual = 1;

let jogadorPista = null;
let jogadorAdivinha = null;

let acertos = 0;
let passes = 0;

let tempo = 60;
let intervalo = null;

let indiceDificuldade = 0;

let palavrasUsadas = [];


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

const btnTrocarTurno =
    document.getElementById("btnTrocarTurno");

const btnProximaDupla =
    document.getElementById("btnProximaDupla");

const btnContinuar =
    document.getElementById("btnContinuar");

const btnNovoJogo =
    document.getElementById("btnNovoJogo");


/* =====================================================
   TROCAR DE TELA
===================================================== */

function mostrarTela(id) {

    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    const tela = document.getElementById(id);

    if (tela) {
        tela.classList.add("ativa");
    }
}


/* =====================================================
   EMBARALHAR
===================================================== */

function embaralhar(lista) {

    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] =
        [copia[j], copia[i]];
    }

    return copia;
}


/* =====================================================
   COMEÇAR JOGO
===================================================== */

btnComecar.addEventListener("click", iniciarJogo);


function iniciarJogo() {

    jogadores = [];

    for (let i = 1; i <= 6; i++) {

        const campo =
            document.getElementById(`nome${i}`);

        const nome =
            campo.value.trim();

        if (nome === "") {

            alert(
                `Digite o nome do participante ${i}.`
            );

            campo.focus();

            return;
        }

        jogadores.push({
            id: i,
            nome: nome,
            pontos: 0
        });
    }

    jogadoresAtivos = [...jogadores];

    rodada = 1;

    indiceDupla = 0;

    indiceDificuldade = 0;

    palavrasUsadas = [];

    prepararRodada();
}


/* =====================================================
   PREPARAR RODADA
===================================================== */

function prepararRodada() {

    clearInterval(intervalo);

    criarDuplas();

    document.getElementById(
        "numeroRodada"
    ).textContent = rodada;

    mostrarListaDuplas();

    mostrarTela("duplasTela");
}


/* =====================================================
   CRIAR DUPLAS
===================================================== */

function criarDuplas() {

    const lista =
        embaralhar(jogadoresAtivos);

    duplas = [];

    if (lista.length === 6) {

        duplas = [
            [lista[0], lista[1]],
            [lista[2], lista[3]],
            [lista[4], lista[5]]
        ];

        return;
    }

    if (lista.length === 5) {

        duplas = [
            [lista[0], lista[1]],
            [lista[2], lista[3]],
            [lista[4], lista[0]]
        ];

        return;
    }

    if (lista.length === 4) {

        duplas = [
            [lista[0], lista[1]],
            [lista[2], lista[3]]
        ];

        return;
    }

    if (lista.length === 3) {

        duplas = [
            [lista[0], lista[1]],
            [lista[1], lista[2]],
            [lista[2], lista[0]]
        ];

        return;
    }

    if (lista.length === 2) {

        duplas = [
            [lista[0], lista[1]]
        ];
    }
}


/* =====================================================
   MOSTRAR DUPLAS
===================================================== */

function mostrarListaDuplas() {

    const container =
        document.getElementById(
            "duplasContainer"
        );

    container.innerHTML = "";

    duplas.forEach((dupla, index) => {

        const card =
            document.createElement("div");

        card.className = "dupla";

        card.innerHTML = `
            <h3>DUPLA ${index + 1}</h3>

            <p>${dupla[0].nome}</p>

            <p>+</p>

            <p>${dupla[1].nome}</p>
        `;

        container.appendChild(card);
    });
}


/* =====================================================
   COMEÇAR PRIMEIRA DUPLA
===================================================== */

btnComecarRodada.addEventListener(
    "click",
    () => {

        indiceDupla = 0;

        iniciarDupla();
    }
);


/* =====================================================
   INICIAR DUPLA
===================================================== */

function iniciarDupla() {

    if (indiceDupla >= duplas.length) {

        finalizarRodada();

        return;
    }

    const dupla =
        duplas[indiceDupla];

    indiceDupla++;

    jogadorPista = dupla[0];

    jogadorAdivinha = dupla[1];

    vezAtual = 1;

    iniciarTurno();
}


/* =====================================================
   INICIAR TURNO
===================================================== */

function iniciarTurno() {

    clearInterval(intervalo);

    tempo = 60;

    acertos = 0;

    passes = 0;

    document.getElementById(
        "rodadaTopo"
    ).textContent = rodada;

    document.getElementById(
        "jogadorPista"
    ).textContent =
        jogadorPista.nome;

    document.getElementById(
        "jogadorAdivinha"
    ).textContent =
        jogadorAdivinha.nome;

    document.getElementById(
        "acertos"
    ).textContent = "0";

    document.getElementById(
        "pulos"
    ).textContent = "0";

    document.getElementById(
        "cronometro"
    ).textContent = "01:00";

    document.getElementById(
        "cronometro"
    ).classList.remove("urgente");

    btnAcertou.disabled = false;

    btnPular.disabled = false;

    novaPalavra();

    mostrarTela("jogoTela");

    iniciarCronometro();
}


/* =====================================================
   CRONÔMETRO
===================================================== */

function iniciarCronometro() {

    clearInterval(intervalo);

    intervalo = setInterval(() => {

        tempo--;

        atualizarCronometro();

        if (tempo <= 0) {

            clearInterval(intervalo);

            finalizarTurno();
        }

    }, 1000);
}


/* =====================================================
   CRONÔMETRO VISUAL
===================================================== */

function atualizarCronometro() {

    const minutos =
        Math.floor(tempo / 60);

    const segundos =
        tempo % 60;

    document.getElementById(
        "cronometro"
    ).textContent =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    if (tempo <= 10) {

        document.getElementById(
            "cronometro"
        ).classList.add("urgente");
    }
}


/* =====================================================
   NOVA PALAVRA
===================================================== */

function novaPalavra() {

    let lista;

    if (indiceDificuldade === 0) {

        lista = palavrasFaceis;

    } else if (indiceDificuldade === 1) {

        lista = palavrasMedias;

    } else {

        lista = palavrasDificeis;
    }

    let disponiveis =
        lista.filter(
            palavra =>
                !palavrasUsadas.includes(palavra)
        );

    if (disponiveis.length === 0) {

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

    document.getElementById(
        "palavra"
    ).textContent = palavra;

    indiceDificuldade++;

    if (indiceDificuldade >= 3) {

        indiceDificuldade = 0;
    }
}


/* =====================================================
   ACERTOU
===================================================== */

btnAcertou.addEventListener(
    "click",
    () => {

        if (tempo <= 0) return;

        jogadorAdivinha.pontos++;

        acertos++;

        document.getElementById(
            "acertos"
        ).textContent = acertos;

        novaPalavra();
    }
);


/* =====================================================
   PULAR
===================================================== */

btnPular.addEventListener(
    "click",
    () => {

        if (tempo <= 0) return;

        if (passes >= 3) return;

        passes++;

        document.getElementById(
            "pulos"
        ).textContent = passes;

        if (passes >= 3) {

            btnPular.disabled = true;
        }

        novaPalavra();
    }
);


/* =====================================================
   FINALIZAR TURNO
===================================================== */

function finalizarTurno() {

    clearInterval(intervalo);

    tempo = 0;

    document.getElementById(
        "cronometro"
    ).textContent = "00:00";

    document.getElementById(
        "cronometro"
    ).classList.remove("urgente");

    btnAcertou.disabled = true;

    btnPular.disabled = true;


    /*
       PRIMEIRO TURNO:

       Os mesmos dois jogadores trocam
       as funções de pista e adivinha.
    */

    if (vezAtual === 1) {

        document.getElementById(
            "jogadorSai"
        ).textContent =
            jogadorPista.nome;

        document.getElementById(
            "jogadorEntra"
        ).textContent =
            jogadorAdivinha.nome;

        document.getElementById(
            "mensagemTroca"
        ).textContent =
            "Agora os jogadores devem trocar de função.";

        mostrarTela("trocaDuplaTela");

        return;
    }


    /*
       SEGUNDO TURNO:

       A dupla terminou.
    */

    prepararTrocaDeDupla();
}


/* =====================================================
   BOTÃO PARA COMEÇAR SEGUNDO TURNO
===================================================== */

btnTrocarTurno.addEventListener(
    "click",
    () => {

        /*
           Agora sim troca os papéis.
        */

        const temporario =
            jogadorPista;

        jogadorPista =
            jogadorAdivinha;

        jogadorAdivinha =
            temporario;

        vezAtual = 2;

        iniciarTurno();
    }
);


/* =====================================================
   PAUSA ENTRE DUPLAS
===================================================== */

function prepararTrocaDeDupla() {

    clearInterval(intervalo);

    const duplaAnterior =
        duplas[indiceDupla - 1];

    const proxima =
        duplas[indiceDupla];


    document.getElementById(
        "duplaAnterior"
    ).textContent =
        duplaAnterior
            .map(jogador => jogador.nome)
            .join(" + ");


    if (proxima) {

        document.getElementById(
            "proximaDupla"
        ).textContent =
            proxima
                .map(jogador => jogador.nome)
                .join(" + ");

        btnProximaDupla.textContent =
            "INICIAR PRÓXIMA DUPLA";

        mostrarTela(
            "trocaProximaDuplaTela"
        );

    } else {

        finalizarRodada();
    }
}


/* =====================================================
   BOTÃO PRÓXIMA DUPLA
===================================================== */

btnProximaDupla.addEventListener(
    "click",
    () => {

        iniciarDupla();
    }
);


/* =====================================================
   FINALIZAR RODADA
===================================================== */

function finalizarRodada() {

    clearInterval(intervalo);

    const ranking =
        [...jogadoresAtivos]
        .sort(
            (a, b) =>
                b.pontos - a.pontos
        );


    const menorPontuacao =
        Math.min(
            ...jogadoresAtivos.map(
                jogador =>
                    jogador.pontos
            )
        );


    const candidatos =
        jogadoresAtivos.filter(
            jogador =>
                jogador.pontos ===
                menorPontuacao
        );


    const eliminado =
        candidatos[
            Math.floor(
                Math.random() *
                candidatos.length
            )
        ];


    jogadoresAtivos =
        jogadoresAtivos.filter(
            jogador =>
                jogador.id !==
                eliminado.id
        );


    mostrarResultado(
        ranking,
        eliminado
    );
}


/* =====================================================
   RESULTADO
===================================================== */

function mostrarResultado(
    ranking,
    eliminado
) {

    const container =
        document.getElementById(
            "resultadoContainer"
        );

    container.innerHTML = "";


    ranking.forEach(jogador => {

        const item =
            document.createElement("div");

        item.className =
            "resultado-item";


        if (
            jogador.id ===
            eliminado.id
        ) {

            item.classList.add(
                "eliminado"
            );
        }


        item.innerHTML = `
            <span>${jogador.nome}</span>

            <strong>
                ${jogador.pontos} pontos
            </strong>
        `;


        container.appendChild(item);
    });


    document.getElementById(
        "mensagemEliminacao"
    ).textContent =
        `❌ ${eliminado.nome.toUpperCase()} FOI ELIMINADO!`;


    if (
        jogadoresAtivos.length === 1
    ) {

        btnContinuar.textContent =
            "VER CAMPEÃO";

    } else {

        btnContinuar.textContent =
            "PRÓXIMA RODADA";
    }


    mostrarTela("resultadoTela");
}


/* =====================================================
   PRÓXIMA RODADA
===================================================== */

btnContinuar.addEventListener(
    "click",
    () => {

        if (
            jogadoresAtivos.length === 1
        ) {

            mostrarCampeao();

            return;
        }


        rodada++;

        prepararRodada();
    }
);


/* =====================================================
   CAMPEÃO
===================================================== */

function mostrarCampeao() {

    clearInterval(intervalo);

    const campeao =
        jogadoresAtivos[0];

    document.getElementById(
        "campeaoNome"
    ).textContent =
        campeao.nome.toUpperCase();

    mostrarTela("campeaoTela");
}


/* =====================================================
   NOVO JOGO
===================================================== */

btnNovoJogo.addEventListener(
    "click",
    () => {

        location.reload();
    }
);
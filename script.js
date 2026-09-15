/* =====================================================
   MEGA SENHA / MEGA SHOW
   SISTEMA DE DUPLAS FIXAS
   3 RODADAS + DESEMPATE
   ===================================================== */


/* =====================================================
   PALAVRAS DO JOGO
   ===================================================== */

const palavras = [

    // FÁCIL
    {
        palavra: "ÁRVORE",
        categoria: "Natureza",
        dificuldade: "facil"
    },
    {
        palavra: "BOLA",
        categoria: "Objeto",
        dificuldade: "facil"
    },
    {
        palavra: "CACHORRO",
        categoria: "Animal",
        dificuldade: "facil"
    },
    {
        palavra: "CELULAR",
        categoria: "Objeto",
        dificuldade: "facil"
    },
    {
        palavra: "CARRO",
        categoria: "Transporte",
        dificuldade: "facil"
    },
    {
        palavra: "CASA",
        categoria: "Lugar",
        dificuldade: "facil"
    },
    {
        palavra: "GATO",
        categoria: "Animal",
        dificuldade: "facil"
    },
    {
        palavra: "ESCOLA",
        categoria: "Lugar",
        dificuldade: "facil"
    },
    {
        palavra: "TELEVISÃO",
        categoria: "Objeto",
        dificuldade: "facil"
    },
    {
        palavra: "CHOCOLATE",
        categoria: "Comida",
        dificuldade: "facil"
    },

    // MÉDIO
    {
        palavra: "COMPUTADOR",
        categoria: "Tecnologia",
        dificuldade: "medio"
    },
    {
        palavra: "HOSPITAL",
        categoria: "Lugar",
        dificuldade: "medio"
    },
    {
        palavra: "AVIÃO",
        categoria: "Transporte",
        dificuldade: "medio"
    },
    {
        palavra: "BICICLETA",
        categoria: "Transporte",
        dificuldade: "medio"
    },
    {
        palavra: "ELEFANTE",
        categoria: "Animal",
        dificuldade: "medio"
    },
    {
        palavra: "GELADEIRA",
        categoria: "Objeto",
        dificuldade: "medio"
    },
    {
        palavra: "PISCINA",
        categoria: "Lugar",
        dificuldade: "medio"
    },
    {
        palavra: "FUTEBOL",
        categoria: "Esporte",
        dificuldade: "medio"
    },
    {
        palavra: "TELEFONE",
        categoria: "Tecnologia",
        dificuldade: "medio"
    },
    {
        palavra: "RESTAURANTE",
        categoria: "Lugar",
        dificuldade: "medio"
    },

    // DIFÍCIL
    {
        palavra: "SUSTENTABILIDADE",
        categoria: "Tema",
        dificuldade: "dificil"
    },
    {
        palavra: "RECICLAGEM",
        categoria: "Meio ambiente",
        dificuldade: "dificil"
    },
    {
        palavra: "RESPONSABILIDADE",
        categoria: "Conceito",
        dificuldade: "dificil"
    },
    {
        palavra: "TECNOLOGIA",
        categoria: "Conceito",
        dificuldade: "dificil"
    },
    {
        palavra: "COLABORAÇÃO",
        categoria: "Conceito",
        dificuldade: "dificil"
    },
    {
        palavra: "COMUNICAÇÃO",
        categoria: "Conceito",
        dificuldade: "dificil"
    },
    {
        palavra: "CRIATIVIDADE",
        categoria: "Conceito",
        dificuldade: "dificil"
    },
    {
        palavra: "ORGANIZAÇÃO",
        categoria: "Conceito",
        dificuldade: "dificil"
    }
];


/* =====================================================
   ESTADO DO JOGO
   ===================================================== */

let jogadores = [];

let jogadoresAtivos = [];

let duplas = [];

let duplasAtivas = [];

let rodada = 1;

let indiceDupla = 0;

let vezAtual = 1;

let jogadorPista = null;

let jogadorAdivinha = null;

let duplaAtual = null;

let acertos = 0;

let passes = 0;

let tempo = 60;

let intervalo = null;

let indiceDificuldade = 0;

let palavrasUsadas = [];


/* =====================================================
   DESEMPATE
   ===================================================== */

let modoDesempate = false;

let duplasDesempate = [];

let indiceDuplaDesempate = 0;

let placarDesempate = new Map();

let campeaoDupla = null;


/* =====================================================
   ELEMENTOS DA TELA
   ===================================================== */

const telaInicial =
    document.getElementById("telaInicial");

const duplasTela =
    document.getElementById("duplasTela");

const jogoTela =
    document.getElementById("jogoTela");

const trocaDuplaTela =
    document.getElementById("trocaDuplaTela");

const resultadoTela =
    document.getElementById("resultadoTela");

const campeaoTela =
    document.getElementById("campeaoTela");


const nomes = [

    document.getElementById("nome1"),

    document.getElementById("nome2"),

    document.getElementById("nome3"),

    document.getElementById("nome4"),

    document.getElementById("nome5"),

    document.getElementById("nome6")

];


const duplasContainer =
    document.getElementById(
        "duplasContainer"
    );


const jogadorPistaElemento =
    document.getElementById(
        "jogadorPista"
    );


const jogadorAdivinhaElemento =
    document.getElementById(
        "jogadorAdivinha"
    );


const acertosElemento =
    document.getElementById(
        "acertos"
    );


const pulosElemento =
    document.getElementById(
        "pulos"
    );


const palavraElemento =
    document.getElementById(
        "palavra"
    );


const categoriaElemento =
    document.getElementById(
        "categoria"
    );


const tempoElemento =
    document.getElementById(
        "tempo"
    );


/* =====================================================
   BOTÕES
   ===================================================== */

const btnComecar =
    document.getElementById(
        "btnComecar"
    );


const btnComecarRodada =
    document.getElementById(
        "btnComecarRodada"
    );


const btnAcertou =
    document.getElementById(
        "btnAcertou"
    );


const btnPular =
    document.getElementById(
        "btnPular"
    );


const btnAnular =
    document.getElementById(
        "btnAnular"
    );


const btnTrocarTurno =
    document.getElementById(
        "btnTrocarTurno"
    );


const btnProximaDupla =
    document.getElementById(
        "btnProximaDupla"
    );


const btnContinuar =
    document.getElementById(
        "btnContinuar"
    );


const btnNovoJogo =
    document.getElementById(
        "btnNovoJogo"
    );


/* =====================================================
   MOSTRAR TELA
   ===================================================== */

function mostrarTela(tela) {

    document
        .querySelectorAll(".tela")
        .forEach(
            elemento => {

                elemento.classList.remove(
                    "ativa"
                );

                elemento.style.display =
                    "none";
            }
        );


    if (!tela) return;


    tela.style.display =
        "flex";


    tela.classList.add(
        "ativa"
    );
}


/* =====================================================
   PARAR CRONÔMETRO
   ===================================================== */

function pararCronometro() {

    clearInterval(intervalo);

    intervalo = null;

}


/* =====================================================
   INICIAR JOGO
   ===================================================== */

function iniciarJogo() {

    jogadores = [];


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const nome =
            nomes[i]
                ? nomes[i].value.trim()
                : "";


        if (!nome) {

            alert(
                "Digite o nome dos 6 participantes."
            );

            if (nomes[i]) {

                nomes[i].focus();

            }

            return;

        }


        jogadores.push({

            id: i + 1,

            nome: nome

        });

    }


    criarDuplas();


    jogadoresAtivos =
        duplas.flatMap(
            dupla =>
                dupla.jogadores
        );


    rodada = 1;

    indiceDupla = 0;

    vezAtual = 1;

    palavrasUsadas = [];

    indiceDificuldade = 0;


    modoDesempate = false;

    duplasDesempate = [];

    indiceDuplaDesempate = 0;

    placarDesempate =
        new Map();

    campeaoDupla = null;


    prepararRodada();

}


/* =====================================================
   CRIAR DUPLAS FIXAS
   ===================================================== */

function criarDuplas() {

    duplas = [

        {

            id: 1,

            jogadores: [

                jogadores[0],

                jogadores[1]

            ],

            pontos: 0

        },


        {

            id: 2,

            jogadores: [

                jogadores[2],

                jogadores[3]

            ],

            pontos: 0

        },


        {

            id: 3,

            jogadores: [

                jogadores[4],

                jogadores[5]

            ],

            pontos: 0

        }

    ];


    duplasAtivas =
        [...duplas];

}


/* =====================================================
   PREPARAR RODADA
   ===================================================== */

function prepararRodada() {

    pararCronometro();


    modoDesempate = false;


    indiceDupla = 0;


    jogadoresAtivos =
        duplas.flatMap(
            dupla =>
                dupla.jogadores
        );


    mostrarListaDuplas();


    if (duplasTela) {

        duplasTela.style.display =
            "flex";

    }

}


/* =====================================================
   MOSTRAR DUPLAS
   ===================================================== */

function mostrarListaDuplas() {

    if (!duplasContainer)
        return;


    duplasContainer.innerHTML =
        "";


    const lista =
        modoDesempate
            ? duplasDesempate
            : duplas;


    lista.forEach(
        (dupla, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "dupla";


            const jogador1 =
                dupla.jogadores[0];


            const jogador2 =
                dupla.jogadores[1];


            const pontos =
                modoDesempate
                    ? (
                        placarDesempate
                            .get(dupla) || 0
                    )
                    : dupla.pontos;


            card.innerHTML = `

                <div class="dupla-numero">
                    DUPLA ${dupla.id}
                </div>

                <div class="dupla-nomes">

                    ${jogador1.nome}

                    <span>+</span>

                    ${jogador2.nome}

                </div>

                <div class="dupla-pontos">

                    Pontos: ${pontos}

                </div>

            `;


            duplasContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   INICIAR RODADA
   ===================================================== */

function iniciarRodada() {

    if (modoDesempate) {

        indiceDuplaDesempate =
            0;

        iniciarDuplaDesempate();

        return;

    }


    indiceDupla = 0;

    iniciarDupla();

}


/* =====================================================
   INICIAR DUPLA
   ===================================================== */

function iniciarDupla() {

    const dupla =
        duplas[
            indiceDupla
        ];


    if (!dupla) {

        finalizarRodada();

        return;

    }


    duplaAtual =
        dupla;


    jogadorPista =
        dupla.jogadores[0];


    jogadorAdivinha =
        dupla.jogadores[1];


    vezAtual = 1;


    iniciarTurno();

}


/* =====================================================
   INICIAR DUPLA DE DESEMPATE
   ===================================================== */

function iniciarDuplaDesempate() {

    const dupla =
        duplasDesempate[
            indiceDuplaDesempate
        ];


    if (!dupla) {

        finalizarTiebreak();

        return;

    }


    duplaAtual =
        dupla;


    jogadorPista =
        dupla.jogadores[0];


    jogadorAdivinha =
        dupla.jogadores[1];


    vezAtual = 1;


    iniciarTurno();

}


/* =====================================================
   INICIAR TURNO
   ===================================================== */

function iniciarTurno() {

    pararCronometro();


    acertos = 0;

    passes = 0;

    tempo = 60;


    if (acertosElemento) {

        acertosElemento.textContent =
            acertos;

    }


    if (pulosElemento) {

        pulosElemento.textContent =
            passes;

    }


    if (tempoElemento) {

        tempoElemento.textContent =
            "01:00";

    }


    if (jogadorPistaElemento) {

        jogadorPistaElemento.textContent =
            jogadorPista.nome;

    }


    if (jogadorAdivinhaElemento) {

        jogadorAdivinhaElemento.textContent =
            jogadorAdivinha.nome;

    }


    if (jogoTela) {

        jogoTela.style.display =
            "flex";

    }


    if (duplasTela) {

        duplasTela.style.display =
            "none";

    }


    novaPalavra();


    iniciarTemporizador();

}


/* =====================================================
   TEMPORIZADOR
   ===================================================== */

function iniciarTemporizador() {

    pararCronometro();


    intervalo =
        setInterval(
            () => {

                tempo--;


                atualizarTemporizador();


                if (tempo <= 0) {

                    pararCronometro();

                    finalizarTurno();

                }

            },
            1000
        );

}


/* =====================================================
   ATUALIZAR TEMPO
   ===================================================== */

function atualizarTemporizador() {

    if (!tempoElemento)
        return;


    const minutos =
        Math.floor(
            tempo / 60
        );


    const segundos =
        tempo % 60;


    tempoElemento.textContent =

        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;


    tempoElemento.classList.toggle(
        "urgente",
        tempo <= 10
    );

}


/* =====================================================
   NOVA PALAVRA
   ===================================================== */

function novaPalavra() {

    let disponiveis =
        palavras.filter(
            item =>
                !palavrasUsadas.includes(
                    item.palavra
                )
        );


    if (
        disponiveis.length === 0
    ) {

        palavrasUsadas = [];

        disponiveis =
            [...palavras];

    }


    let dificuldade;


    if (
        indiceDificuldade === 0
    ) {

        dificuldade =
            "facil";

    }
    else if (
        indiceDificuldade === 1
    ) {

        dificuldade =
            "medio";

    }
    else {

        dificuldade =
            "dificil";

    }


    let filtradas =
        disponiveis.filter(
            item =>
                item.dificuldade ===
                dificuldade
        );


    if (
        filtradas.length === 0
    ) {

        filtradas =
            disponiveis;

    }


    const indice =
        Math.floor(
            Math.random() *
            filtradas.length
        );


    const escolhida =
        filtradas[indice];


    palavrasUsadas.push(
        escolhida.palavra
    );


    if (palavraElemento) {

        palavraElemento.textContent =
            escolhida.palavra;

    }


    if (categoriaElemento) {

        categoriaElemento.textContent =
            escolhida.categoria;

    }


    indiceDificuldade++;


    if (
        indiceDificuldade >= 3
    ) {

        indiceDificuldade = 0;

    }

}


/* =====================================================
   ACERTOU
   ===================================================== */

if (btnAcertou) {

    btnAcertou.addEventListener(
        "click",
        () => {

            if (
                tempo <= 0 ||
                !duplaAtual
            ) {

                return;

            }


            acertos++;


            if (modoDesempate) {

                const pontosAtuais =
                    placarDesempate.get(
                        duplaAtual
                    ) || 0;


                placarDesempate.set(
                    duplaAtual,
                    pontosAtuais + 1
                );

            }
            else {

                /*
                   PONTO DA DUPLA.
                */

                duplaAtual.pontos++;

            }


            if (acertosElemento) {

                acertosElemento.textContent =
                    acertos;

            }


            novaPalavra();

        }
    );

}


/* =====================================================
   PULAR
   ===================================================== */

if (btnPular) {

    btnPular.addEventListener(
        "click",
        () => {

            if (tempo <= 0)
                return;


            if (passes >= 3)
                return;


            passes++;


            if (pulosElemento) {

                pulosElemento.textContent =
                    passes;

            }


            if (
                passes >= 3
            ) {

                btnPular.disabled =
                    true;

            }


            novaPalavra();

        }
    );

}


/* =====================================================
   PALAVRA ANULADA
   ===================================================== */

if (btnAnular) {

    btnAnular.addEventListener(
        "click",
        () => {

            if (tempo <= 0)
                return;


            /*
               NÃO DÁ PONTO.
               NÃO GASTA PULO.
               NÃO PARA O TEMPO.
            */

            novaPalavra();

        }
    );

}


/* =====================================================
   FINALIZAR TURNO
   ===================================================== */

function finalizarTurno() {

    pararCronometro();


    tempo = 0;


    if (tempoElemento) {

        tempoElemento.textContent =
            "00:00";

        tempoElemento.classList.remove(
            "urgente"
        );

    }


    if (btnAcertou) {

        btnAcertou.disabled =
            true;

    }


    if (btnPular) {

        btnPular.disabled =
            true;

    }


    if (btnAnular) {

        btnAnular.disabled =
            true;

    }


    /*
       PRIMEIRO TURNO:
       troca a função dos MESMOS
       dois participantes.
    */

    if (vezAtual === 1) {

        vezAtual = 2;


        const temp =
            jogadorPista;


        jogadorPista =
            jogadorAdivinha;


        jogadorAdivinha =
            temp;


        prepararTrocaDeTurno();


        return;

    }


    /*
       SEGUNDO TURNO:
       vai para a próxima dupla.
    */

    prepararTrocaDeDupla();

}


/* =====================================================
   TROCA DE TURNO
   ===================================================== */

function prepararTrocaDeTurno() {

    const mensagem =
        document.getElementById(
            "mensagemTrocaTurno"
        );


    if (mensagem) {

        mensagem.innerHTML = `

            <strong>
                Agora é a vez de trocar!
            </strong>

            <br><br>

            <b>
                ${jogadorPista.nome}
            </b>

            dará as pistas.

            <br>

            <b>
                ${jogadorAdivinha.nome}
            </b>

            deverá adivinhar.

        `;

    }


    const entra =
        document.getElementById(
            "jogadorEntra"
        );


    const sai =
        document.getElementById(
            "jogadorSai"
        );


    if (entra) {

        entra.textContent =
            jogadorPista.nome;

    }


    if (sai) {

        sai.textContent =
            jogadorAdivinha.nome;

    }


    if (trocaDuplaTela) {

        trocaDuplaTela.style.display =
            "flex";

    }

}


/* =====================================================
   BOTÃO TROCAR TURNO
   ===================================================== */

if (btnTrocarTurno) {

    btnTrocarTurno.addEventListener(
        "click",
        () => {

            if (trocaDuplaTela) {

                trocaDuplaTela.style.display =
                    "none";

            }


            iniciarTurno();

        }
    );

}


/* =====================================================
   PREPARAR TROCA DE DUPLA
   ===================================================== */

function prepararTrocaDeDupla() {

    const lista =
        modoDesempate
            ? duplasDesempate
            : duplas;


    const indice =
        modoDesempate
            ? indiceDuplaDesempate
            : indiceDupla;


    const duplaTerminou =
        lista[indice];


    const proximaDupla =
        lista[indice + 1];


    if (!proximaDupla) {

        if (modoDesempate) {

            finalizarTiebreak();

        }
        else {

            finalizarRodada();

        }

        return;

    }


    const anteriorElemento =
        document.getElementById(
            "duplaAnterior"
        );


    const proximaElemento =
        document.getElementById(
            "proximaDupla"
        );


    if (
        anteriorElemento &&
        duplaTerminou
    ) {

        anteriorElemento.textContent =

            duplaTerminou.jogadores
                .map(
                    jogador =>
                        jogador.nome
                )
                .join(" + ");

    }


    if (proximaElemento) {

        proximaElemento.textContent =

            proximaDupla.jogadores
                .map(
                    jogador =>
                        jogador.nome
                )
                .join(" + ");

    }


    if (trocaDuplaTela) {

        trocaDuplaTela.style.display =
            "flex";

    }

}


/* =====================================================
   PRÓXIMA DUPLA
   ===================================================== */

if (btnProximaDupla) {

    btnProximaDupla.addEventListener(
        "click",
        () => {

            if (trocaDuplaTela) {

                trocaDuplaTela.style.display =
                    "none";

            }


            if (modoDesempate) {

                indiceDuplaDesempate++;

                iniciarDuplaDesempate();

            }
            else {

                indiceDupla++;

                iniciarDupla();

            }

        }
    );

}


/* =====================================================
   FINALIZAR RODADA
   ===================================================== */

function finalizarRodada() {

    pararCronometro();


    mostrarResultado();

}


/* =====================================================
   MOSTRAR RESULTADO
   ===================================================== */

function mostrarResultado() {

    if (!resultadoTela)
        return;


    const rankingContainer =
        document.getElementById(
            "rankingContainer"
        );


    const resultadoContainer =
        document.getElementById(
            "resultadoContainer"
        );


    const container =
        rankingContainer ||
        resultadoContainer;


    if (!container)
        return;


    container.innerHTML =
        "";


    /*
       MOSTRA TODAS AS DUPLAS.
       NINGUÉM É ELIMINADO.
    */

    duplas.forEach(
        (dupla) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "resultado-item";


            const nomesDupla =
                dupla.jogadores
                    .map(
                        jogador =>
                            jogador.nome
                    )
                    .join(" + ");


            card.innerHTML = `

                <span>

                    <strong>
                        DUPLA ${dupla.id}
                    </strong>

                    <br>

                    ${nomesDupla}

                </span>

                <strong>

                    ${dupla.pontos}
                    ponto(s)

                </strong>

            `;


            container.appendChild(
                card
            );

        }
    );


    const maior =
        Math.max(
            ...duplas.map(
                dupla =>
                    dupla.pontos
            )
        );


    const empatadas =
        duplas.filter(
            dupla =>
                dupla.pontos ===
                maior
        );


    const mensagem =
        document.getElementById(
            "mensagemEliminacao"
        );


    const mensagemResultado =
        document.getElementById(
            "mensagemResultado"
        );


    const texto =
        rodada < 3

            ? `Rodada ${rodada} finalizada. A pontuação continua acumulada.`

            : empatadas.length > 1

                ? "⚡ EMPATE! As duplas empatadas irão para o desempate."

                : "🏆 Temos uma dupla campeã!";


    if (mensagem) {

        mensagem.textContent =
            texto;

    }


    if (mensagemResultado) {

        mensagemResultado.textContent =
            texto;

    }


    if (btnContinuar) {

        if (rodada < 3) {

            btnContinuar.textContent =
                "PRÓXIMA RODADA";

        }
        else if (
            empatadas.length > 1
        ) {

            btnContinuar.textContent =
                "INICIAR DESEMPATE";

        }
        else {

            btnContinuar.textContent =
                "VER CAMPEÃO";

        }

    }


    mostrarTela(
        resultadoTela
    );

}


/* =====================================================
   INICIAR DESEMPATE
   ===================================================== */

function iniciarDesempate() {

    const maior =
        Math.max(
            ...duplas.map(
                dupla =>
                    dupla.pontos
            )
        );


    duplasDesempate =
        duplas.filter(
            dupla =>
                dupla.pontos ===
                maior
        );


    placarDesempate =
        new Map();


    duplasDesempate.forEach(
        dupla => {

            placarDesempate.set(
                dupla,
                0
            );

        }
    );


    indiceDuplaDesempate =
        0;


    modoDesempate =
        true;


    campeaoDupla =
        null;


    mostrarListaDuplas();


    mostrarTela(
        duplasTela
    );


    if (btnComecarRodada) {

        btnComecarRodada.textContent =
            "COMEÇAR DESEMPATE";

    }

}


/* =====================================================
   FINALIZAR DESEMPATE
   ===================================================== */

function finalizarTiebreak() {

    pararCronometro();


    mostrarResultadoTiebreak();

}


/* =====================================================
   RESULTADO DO DESEMPATE
   ===================================================== */

function mostrarResultadoTiebreak() {

    const container =
        document.getElementById(
            "rankingContainer"
        ) ||
        document.getElementById(
            "resultadoContainer"
        );


    if (!container)
        return;


    container.innerHTML =
        "";


    duplasDesempate.forEach(
        dupla => {

            const pontos =
                placarDesempate.get(
                    dupla
                ) || 0;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "resultado-item";


            card.innerHTML = `

                <span>

                    <strong>
                        DUPLA ${dupla.id}
                    </strong>

                    <br>

                    ${dupla.jogadores[0].nome}
                    +
                    ${dupla.jogadores[1].nome}

                </span>

                <strong>

                    ${pontos}
                    ponto(s)

                </strong>

            `;


            container.appendChild(
                card
            );

        }
    );


    const maior =
        Math.max(
            ...duplasDesempate.map(
                dupla =>
                    placarDesempate.get(
                        dupla
                    ) || 0
            )
        );


    const empatadas =
        duplasDesempate.filter(
            dupla =>
                (
                    placarDesempate
                        .get(dupla) || 0
                ) === maior
        );


    const mensagem =
        document.getElementById(
            "mensagemEliminacao"
        );


    const mensagemResultado =
        document.getElementById(
            "mensagemResultado"
        );


    if (
        empatadas.length > 1
    ) {

        if (mensagem) {

            mensagem.textContent =
                "⚡ EMPATE NOVAMENTE! Será feito outro desempate.";

        }


        if (mensagemResultado) {

            mensagemResultado.textContent =
                "⚡ EMPATE NOVAMENTE! Será feito outro desempate.";

        }


        if (btnContinuar) {

            btnContinuar.textContent =
                "NOVO DESEMPATE";

        }

    }
    else {

        campeaoDupla =
            empatadas[0];


        const texto =
            `🏆 DUPLA ${campeaoDupla.id} venceu o desempate!`;


        if (mensagem) {

            mensagem.textContent =
                texto;

        }


        if (mensagemResultado) {

            mensagemResultado.textContent =
                texto;

        }


        if (btnContinuar) {

            btnContinuar.textContent =
                "VER CAMPEÃO";

        }

    }


    mostrarTela(
        resultadoTela
    );

}


/* =====================================================
   CONTINUAR
   ===================================================== */

if (btnContinuar) {

    btnContinuar.addEventListener(
        "click",
        () => {

            /*
               PRIMEIRO E SEGUNDO MOMENTO:
               rodadas normais.
            */

            if (!modoDesempate) {

                /*
                   Rodadas 1 e 2.
                */

                if (rodada < 3) {

                    rodada++;

                    prepararRodada();

                    return;

                }


                /*
                   Depois da terceira rodada.
                */

                const maior =
                    Math.max(
                        ...duplas.map(
                            dupla =>
                                dupla.pontos
                        )
                    );


                const empatadas =
                    duplas.filter(
                        dupla =>
                            dupla.pontos ===
                            maior
                    );


                if (
                    empatadas.length > 1
                ) {

                    iniciarDesempate();

                }
                else {

                    campeaoDupla =
                        empatadas[0];

                    mostrarCampeao();

                }


                return;

            }


            /*
               Estamos no desempate.
            */

            const maior =
                Math.max(
                    ...duplasDesempate.map(
                        dupla =>
                            placarDesempate.get(
                                dupla
                            ) || 0
                    )
                );


            const empatadas =
                duplasDesempate.filter(
                    dupla =>
                        (
                            placarDesempate.get(
                                dupla
                            ) || 0
                        ) === maior
                );


            /*
               Empatou de novo:
               novo desempate somente
               entre as empatadas.
            */

            if (
                empatadas.length > 1
            ) {

                duplasDesempate =
                    [...empatadas];


                placarDesempate =
                    new Map();


                duplasDesempate.forEach(
                    dupla => {

                        placarDesempate.set(
                            dupla,
                            0
                        );

                    }
                );


                indiceDuplaDesempate =
                    0;


                mostrarListaDuplas();


                mostrarTela(
                    duplasTela
                );


                if (btnComecarRodada) {

                    btnComecarRodada.textContent =
                        "COMEÇAR DESEMPATE";

                }


            }
            else {

                campeaoDupla =
                    empatadas[0];


                mostrarCampeao();

            }

        }
    );

}


/* =====================================================
   MOSTRAR CAMPEÃO
   ===================================================== */

function mostrarCampeao() {

    if (!campeaoDupla) {

        const maior =
            Math.max(
                ...duplas.map(
                    dupla =>
                        dupla.pontos
                )
            );


        campeaoDupla =
            duplas.find(
                dupla =>
                    dupla.pontos ===
                    maior
            );

    }


    if (!campeaoDupla)
        return;


    const nomesCampeoes =
        campeaoDupla.jogadores
            .map(
                jogador =>
                    jogador.nome
            )
            .join(" + ");


    if (campeaoNomeElemento) {

        campeaoNomeElemento.textContent =
            nomesCampeoes.toUpperCase();

    }


    if (campeaoPontosElemento) {

        campeaoPontosElemento.textContent =
            `${campeaoDupla.pontos} ponto(s)`;

    }


    if (campeaoTela) {

        mostrarTela(
            campeaoTela
        );

    }

}


/* =====================================================
   ELEMENTOS DO CAMPEÃO
   ===================================================== */

const campeaoNomeElemento =
    document.getElementById(
        "campeaoNome"
    );


const campeaoPontosElemento =
    document.getElementById(
        "campeaoPontos"
    );


/* =====================================================
   NOVO JOGO
   ===================================================== */

if (btnNovoJogo) {

    btnNovoJogo.addEventListener(
        "click",
        () => {

            pararCronometro();


            jogadores = [];

            jogadoresAtivos = [];

            duplas = [];

            duplasAtivas = [];


            rodada = 1;

            indiceDupla = 0;

            vezAtual = 1;


            jogadorPista =
                null;

            jogadorAdivinha =
                null;

            duplaAtual =
                null;


            acertos = 0;

            passes = 0;

            tempo = 60;


            indiceDificuldade =
                0;

            palavrasUsadas = [];


            modoDesempate =
                false;

            duplasDesempate =
                [];

            indiceDuplaDesempate =
                0;

            placarDesempate =
                new Map();

            campeaoDupla =
                null;


            nomes.forEach(
                campo => {

                    if (campo) {

                        campo.value =
                            "";

                    }

                }
            );


            mostrarTela(
                telaInicial
            );

        }
    );

}


/* =====================================================
   FIM DO SCRIPT
   ===================================================== */

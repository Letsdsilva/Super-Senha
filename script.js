/* =====================================================
   MEGA SENHA - MEGA SHOW
   DUPLAS FIXAS + 3 RODADAS + DESEMPATE
   COMPATÍVEL COM O INDEX.HTML E STYLE.CSS ORIGINAIS
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
   ESTADO DO JOGO
   ===================================================== */

let jogadores = [];
let duplas = [];

let rodada = 1;
let indiceDupla = 0;

let vezAtual = 1;

let duplaAtual = null;

let jogadorPista = null;
let jogadorAdivinha = null;

let acertos = 0;
let passes = 0;

let tempo = 60;
let intervalo = null;

let indiceDificuldade = 0;
let palavrasUsadas = [];


/* =====================================================
   ESTADO DO DESEMPATE
   ===================================================== */

let modoDesempate = false;

let duplasEmpatadas = [];

let indiceDuplaDesempate = 0;

let placarDesempate = new Map();

let campea = null;


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

function mostrarTela(id) {

    document
        .querySelectorAll(".tela")
        .forEach(tela => {

            tela.classList.remove("ativa");

        });


    const tela =
        document.getElementById(id);


    if (tela) {

        tela.classList.add("ativa");

    }

}


/* =====================================================
   COMEÇAR JOGO
   ===================================================== */

if (btnComecar) {

    btnComecar.addEventListener(
        "click",
        iniciarJogo
    );

}


function iniciarJogo() {

    jogadores = [];


    for (
        let i = 1;
        i <= 6;
        i++
    ) {

        const campo =
            document.getElementById(
                `nome${i}`
            );


        const nome =
            campo
                ? campo.value.trim()
                : "";


        if (!nome) {

            alert(
                `Digite o nome do participante ${i}.`
            );


            if (campo) {

                campo.focus();

            }


            return;

        }


        jogadores.push({

            id: i,

            nome: nome

        });

    }


    rodada = 1;

    indiceDupla = 0;

    vezAtual = 1;

    indiceDificuldade = 0;

    palavrasUsadas = [];


    modoDesempate = false;

    duplasEmpatadas = [];

    indiceDuplaDesempate = 0;

    placarDesempate =
        new Map();

    campea = null;


    criarDuplas();


    prepararRodada();

}


/* =====================================================
   CRIAR DUPLAS FIXAS
   ===================================================== */

function criarDuplas() {

    /*
       DUPLA 1 = 1 + 2
       DUPLA 2 = 3 + 4
       DUPLA 3 = 5 + 6

       NÃO EMBARALHA.
    */

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

}


/* =====================================================
   PREPARAR RODADA
   ===================================================== */

function prepararRodada() {

    clearInterval(intervalo);


    indiceDupla = 0;

    modoDesempate = false;


    const numeroRodada =
        document.getElementById(
            "numeroRodada"
        );


    if (numeroRodada) {

        numeroRodada.textContent =
            rodada;

    }


    if (btnComecarRodada) {

        btnComecarRodada.textContent =
            "COMEÇAR RODADA";

    }


    mostrarListaDuplas();


    mostrarTela(
        "duplasTela"
    );

}


/* =====================================================
   MOSTRAR DUPLAS
   ===================================================== */

function mostrarListaDuplas() {

    const container =
        document.getElementById(
            "duplasContainer"
        );


    if (!container)
        return;


    container.innerHTML =
        "";


    const lista =
        modoDesempate
            ? duplasEmpatadas
            : duplas;


    lista.forEach(
        (dupla) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "dupla";


            card.innerHTML = `

                <h3>
                    DUPLA ${dupla.id}
                </h3>

                <p>
                    ${dupla.jogadores[0].nome}
                </p>

                <p>
                    +
                </p>

                <p>
                    ${dupla.jogadores[1].nome}
                </p>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   COMEÇAR RODADA
   ===================================================== */

if (btnComecarRodada) {

    btnComecarRodada.addEventListener(
        "click",
        () => {

            if (modoDesempate) {

                indiceDuplaDesempate = 0;

                iniciarDuplaDesempate();

            }
            else {

                indiceDupla = 0;

                iniciarDupla();

            }

        }
    );

}


/* =====================================================
   INICIAR DUPLA
   ===================================================== */

function iniciarDupla() {

    if (
        indiceDupla >=
        duplas.length
    ) {

        finalizarRodada();

        return;

    }


    duplaAtual =
        duplas[indiceDupla];


    indiceDupla++;


    jogadorPista =
        duplaAtual.jogadores[0];


    jogadorAdivinha =
        duplaAtual.jogadores[1];


    vezAtual = 1;


    iniciarTurno();

}


/* =====================================================
   INICIAR DUPLA DO DESEMPATE
   ===================================================== */

function iniciarDuplaDesempate() {

    if (
        indiceDuplaDesempate >=
        duplasEmpatadas.length
    ) {

        finalizarDesempate();

        return;

    }


    duplaAtual =
        duplasEmpatadas[
            indiceDuplaDesempate
        ];


    indiceDuplaDesempate++;


    jogadorPista =
        duplaAtual.jogadores[0];


    jogadorAdivinha =
        duplaAtual.jogadores[1];


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


    const rodadaTopo =
        document.getElementById(
            "rodadaTopo"
        );


    if (rodadaTopo) {

        rodadaTopo.textContent =
            modoDesempate
                ? "DESEMPATE"
                : rodada;

    }


    const pista =
        document.getElementById(
            "jogadorPista"
        );


    const adivinha =
        document.getElementById(
            "jogadorAdivinha"
        );


    const acertosEl =
        document.getElementById(
            "acertos"
        );


    const pulosEl =
        document.getElementById(
            "pulos"
        );


    const cronometro =
        document.getElementById(
            "cronometro"
        );


    if (pista) {

        pista.textContent =
            jogadorPista.nome;

    }


    if (adivinha) {

        adivinha.textContent =
            jogadorAdivinha.nome;

    }


    if (acertosEl) {

        acertosEl.textContent =
            "0";

    }


    if (pulosEl) {

        pulosEl.textContent =
            "0";

    }


    if (cronometro) {

        cronometro.textContent =
            "01:00";

        cronometro.classList.remove(
            "urgente"
        );

    }


    if (btnAcertou) {

        btnAcertou.disabled =
            false;

    }


    if (btnPular) {

        btnPular.disabled =
            false;

    }


    if (btnAnular) {

        btnAnular.disabled =
            false;

    }


    novaPalavra();


    mostrarTela(
        "jogoTela"
    );


    iniciarCronometro();

}


/* =====================================================
   CRONÔMETRO
   ===================================================== */

function iniciarCronometro() {

    clearInterval(intervalo);


    intervalo =
        setInterval(
            () => {

                tempo--;

                atualizarCronometro();


                if (
                    tempo <= 0
                ) {

                    clearInterval(
                        intervalo
                    );

                    finalizarTurno();

                }

            },
            1000
        );

}


/* =====================================================
   ATUALIZAR CRONÔMETRO
   ===================================================== */

function atualizarCronometro() {

    const cronometro =
        document.getElementById(
            "cronometro"
        );


    if (!cronometro)
        return;


    const minutos =
        Math.floor(
            tempo / 60
        );


    const segundos =
        tempo % 60;


    cronometro.textContent =

        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;


    if (
        tempo <= 10
    ) {

        cronometro.classList.add(
            "urgente"
        );

    }
    else {

        cronometro.classList.remove(
            "urgente"
        );

    }

}


/* =====================================================
   NOVA PALAVRA
   ===================================================== */

function novaPalavra() {

    let lista;


    if (
        indiceDificuldade === 0
    ) {

        lista =
            palavrasFaceis;

    }
    else if (
        indiceDificuldade === 1
    ) {

        lista =
            palavrasMedias;

    }
    else {

        lista =
            palavrasDificeis;

    }


    let disponiveis =
        lista.filter(
            palavra =>
                !palavrasUsadas.includes(
                    palavra
                )
        );


    if (
        disponiveis.length === 0
    ) {

        palavrasUsadas = [];

        disponiveis =
            [...lista];

    }


    const palavra =
        disponiveis[
            Math.floor(
                Math.random() *
                disponiveis.length
            )
        ];


    palavrasUsadas.push(
        palavra
    );


    const palavraEl =
        document.getElementById(
            "palavra"
        );


    const categoriaEl =
        document.getElementById(
            "categoria"
        );


    if (palavraEl) {

        palavraEl.textContent =
            palavra;

    }


    if (categoriaEl) {

        categoriaEl.textContent =
            "";

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

                const atual =
                    placarDesempate.get(
                        duplaAtual
                    ) || 0;


                placarDesempate.set(
                    duplaAtual,
                    atual + 1
                );

            }
            else {

                /*
                   O PONTO É DA DUPLA.
                */

                duplaAtual.pontos++;

            }


            const acertosEl =
                document.getElementById(
                    "acertos"
                );


            if (acertosEl) {

                acertosEl.textContent =
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

            if (
                tempo <= 0
            )
                return;


            if (
                passes >= 3
            )
                return;


            passes++;


            const pulosEl =
                document.getElementById(
                    "pulos"
                );


            if (pulosEl) {

                pulosEl.textContent =
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

            if (
                tempo <= 0
            )
                return;


            /*
               Não dá ponto.
               Não gasta pulo.
               Não reinicia o tempo.
            */

            novaPalavra();

        }
    );

}


/* =====================================================
   FINALIZAR TURNO
   ===================================================== */

function finalizarTurno() {

    clearInterval(
        intervalo
    );


    tempo = 0;


    const cronometro =
        document.getElementById(
            "cronometro"
        );


    if (cronometro) {

        cronometro.textContent =
            "00:00";

        cronometro.classList.remove(
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
       PRIMEIRO TURNO
    */

    if (
        vezAtual === 1
    ) {

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


        mostrarTela(
            "trocaDuplaTela"
        );


        return;

    }


    /*
       SEGUNDO TURNO
    */

    prepararTrocaDeDupla();

}


/* =====================================================
   TROCAR FUNÇÃO
   ===================================================== */

if (btnTrocarTurno) {

    btnTrocarTurno.addEventListener(
        "click",
        () => {

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

}


/* =====================================================
   PREPARAR PRÓXIMA DUPLA
   ===================================================== */

function prepararTrocaDeDupla() {

    const lista =
        modoDesempate
            ? duplasEmpatadas
            : duplas;


    const indice =
        modoDesempate
            ? indiceDuplaDesempate
            : indiceDupla;


    const anterior =
        lista[indice - 1];


    const proxima =
        lista[indice];


    if (!proxima) {

        if (modoDesempate) {

            finalizarDesempate();

        }
        else {

            finalizarRodada();

        }

        return;

    }


    const duplaAnterior =
        document.getElementById(
            "duplaAnterior"
        );


    const proximaDupla =
        document.getElementById(
            "proximaDupla"
        );


    if (
        duplaAnterior &&
        anterior
    ) {

        duplaAnterior.textContent =

            anterior.jogadores
                .map(
                    jogador =>
                        jogador.nome
                )
                .join(" + ");

    }


    if (
        proximaDupla &&
        proxima
    ) {

        proximaDupla.textContent =

            proxima.jogadores
                .map(
                    jogador =>
                        jogador.nome
                )
                .join(" + ");

    }


    mostrarTela(
        "trocaProximaDuplaTela"
    );

}


/* =====================================================
   PRÓXIMA DUPLA
   ===================================================== */

if (btnProximaDupla) {

    btnProximaDupla.addEventListener(
        "click",
        () => {

            if (modoDesempate) {

                iniciarDuplaDesempate();

            }
            else {

                iniciarDupla();

            }

        }
    );

}


/* =====================================================
   FINALIZAR RODADA
   ===================================================== */

function finalizarRodada() {

    clearInterval(
        intervalo
    );


    const container =
        document.getElementById(
            "resultadoContainer"
        );


    if (!container)
        return;


    container.innerHTML =
        "";


    duplas.forEach(
        dupla => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "resultado-item";


            item.innerHTML = `

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

                    ${dupla.pontos}
                    pontos

                </strong>

            `;


            container.appendChild(
                item
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


    const lideres =
        duplas.filter(
            dupla =>
                dupla.pontos ===
                maior
        );


    const mensagem =
        document.getElementById(
            "mensagemEliminacao"
        );


    if (rodada < 3) {

        if (mensagem) {

            mensagem.textContent =
                `Rodada ${rodada} finalizada. A pontuação continua acumulada.`;

        }


        if (btnContinuar) {

            btnContinuar.textContent =
                "PRÓXIMA RODADA";

        }

    }
    else if (
        lideres.length > 1
    ) {

        if (mensagem) {

            mensagem.textContent =
                "⚡ EMPATE! Vamos para o desempate.";

        }


        if (btnContinuar) {

            btnContinuar.textContent =
                "INICIAR DESEMPATE";

        }

    }
    else {

        campea =
            lideres[0];


        if (mensagem) {

            mensagem.textContent =
                "🏆 Temos uma dupla campeã!";

        }


        if (btnContinuar) {

            btnContinuar.textContent =
                "VER CAMPEÃO";

        }

    }


    mostrarTela(
        "resultadoTela"
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
               RODADAS 1 E 2
            */

            if (
                !modoDesempate &&
                rodada < 3
            ) {

                rodada++;

                prepararRodada();

                return;

            }


            /*
               APÓS A 3ª RODADA
            */

            if (
                !modoDesempate
            ) {

                iniciarDesempateSeNecessario();

                return;

            }


            /*
               NO DESEMPATE
            */

            continuarDesempate();

        }
    );

}


/* =====================================================
   INICIAR DESEMPATE
   ===================================================== */

function iniciarDesempateSeNecessario() {

    const maior =
        Math.max(
            ...duplas.map(
                dupla =>
                    dupla.pontos
            )
        );


    duplasEmpatadas =
        duplas.filter(
            dupla =>
                dupla.pontos ===
                maior
        );


    if (
        duplasEmpatadas.length === 1
    ) {

        campea =
            duplasEmpatadas[0];


        mostrarCampeao();

        return;

    }


    modoDesempate =
        true;


    indiceDuplaDesempate =
        0;


    placarDesempate =
        new Map();


    duplasEmpatadas.forEach(
        dupla => {

            placarDesempate.set(
                dupla,
                0
            );

        }
    );


    const numeroRodada =
        document.getElementById(
            "numeroRodada"
        );


    if (numeroRodada) {

        numeroRodada.textContent =
            "DESEMPATE";

    }


    if (btnComecarRodada) {

        btnComecarRodada.textContent =
            "COMEÇAR DESEMPATE";

    }


    mostrarListaDuplas();


    mostrarTela(
        "duplasTela"
    );

}


/* =====================================================
   FINALIZAR DESEMPATE
   ===================================================== */

function finalizarDesempate() {

    clearInterval(
        intervalo
    );


    const container =
        document.getElementById(
            "resultadoContainer"
        );


    if (!container)
        return;


    container.innerHTML =
        "";


    duplasEmpatadas.forEach(
        dupla => {

            const pontos =
                placarDesempate.get(
                    dupla
                ) || 0;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "resultado-item";


            item.innerHTML = `

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
                    pontos

                </strong>

            `;


            container.appendChild(
                item
            );

        }
    );


    const maior =
        Math.max(
            ...duplasEmpatadas.map(
                dupla =>
                    placarDesempate.get(
                        dupla
                    ) || 0
            )
        );


    const vencedoras =
        duplasEmpatadas.filter(
            dupla =>
                (
                    placarDesempate.get(
                        dupla
                    ) || 0
                ) === maior
        );


    const mensagem =
        document.getElementById(
            "mensagemEliminacao"
        );


    if (
        vencedoras.length > 1
    ) {

        if (mensagem) {

            mensagem.textContent =
                "⚡ EMPATE NOVAMENTE! Teremos outro desempate.";

        }


        if (btnContinuar) {

            btnContinuar.textContent =
                "NOVO DESEMPATE";

        }

    }
    else {

        campea =
            vencedoras[0];


        if (mensagem) {

            mensagem.textContent =
                `🏆 DUPLA ${campea.id} venceu o desempate!`;

        }


        if (btnContinuar) {

            btnContinuar.textContent =
                "VER CAMPEÃO";

        }

    }


    mostrarTela(
        "resultadoTela"
    );

}


/* =====================================================
   CONTINUAR DESEMPATE
   ===================================================== */

function continuarDesempate() {

    const maior =
        Math.max(
            ...duplasEmpatadas.map(
                dupla =>
                    placarDesempate.get(
                        dupla
                    ) || 0
            )
        );


    const empatadasNovamente =
        duplasEmpatadas.filter(
            dupla =>
                (
                    placarDesempate.get(
                        dupla
                    ) || 0
                ) === maior
        );


    if (
        empatadasNovamente.length === 1
    ) {

        campea =
            empatadasNovamente[0];


        mostrarCampeao();

        return;

    }


    /*
       Empatou novamente.
       Só essas continuam.
    */

    duplasEmpatadas =
        [...empatadasNovamente];


    indiceDuplaDesempate =
        0;


    placarDesempate =
        new Map();


    duplasEmpatadas.forEach(
        dupla => {

            placarDesempate.set(
                dupla,
                0
            );

        }
    );


    if (btnComecarRodada) {

        btnComecarRodada.textContent =
            "COMEÇAR DESEMPATE";

    }


    const numeroRodada =
        document.getElementById(
            "numeroRodada"
        );


    if (numeroRodada) {

        numeroRodada.textContent =
            "DESEMPATE";

    }


    mostrarListaDuplas();


    mostrarTela(
        "duplasTela"
    );

}


/* =====================================================
   CAMPEÃO
   ===================================================== */

function mostrarCampeao() {

    clearInterval(
        intervalo
    );


    if (!campea)
        return;


    const nome =
        document.getElementById(
            "campeaoNome"
        );


    const pontos =
        document.getElementById(
            "campeaoPontos"
        );


    if (nome) {

        nome.textContent =

            `${campea.jogadores[0].nome} + ${campea.jogadores[1].nome}`
                .toUpperCase();

    }


    if (pontos) {

        const pontosDesempate =
            placarDesempate.get(
                campea
            ) || 0;


        pontos.textContent =

            pontosDesempate > 0

                ? `${campea.pontos} ponto(s) nas 3 rodadas • ${pontosDesempate} no desempate`

                : `${campea.pontos} ponto(s) nas 3 rodadas`;

    }


    mostrarTela(
        "campeaoTela"
    );

}


/* =====================================================
   NOVO JOGO
   ===================================================== */

if (btnNovoJogo) {

    btnNovoJogo.addEventListener(
        "click",
        () => {

            clearInterval(
                intervalo
            );

            location.reload();

        }
    );

}


/* =====================================================
   FIM
   ===================================================== */

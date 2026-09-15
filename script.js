/* =====================================================
   MEGA SENHA - MEGA SHOW
   VERSÃO FINAL
   =====================================================

   REGRAS:

   - 6 participantes
   - Dupla 1 = Participante 1 + Participante 2
   - Dupla 2 = Participante 3 + Participante 4
   - Dupla 3 = Participante 5 + Participante 6
   - Duplas nunca são misturadas
   - 3 rodadas
   - 60 segundos por turno
   - 3 pulos por turno
   - Palavra anulada não vale ponto e não gasta pulo
   - Pontuação pertence à dupla
   - Os jogadores trocam apenas a função
   - Em caso de empate após 3 rodadas:
     entra rodada de desempate
   - Se empatar novamente:
     faz novo desempate
===================================================== */


/* =====================================================
   PALAVRAS
===================================================== */

const palavrasFaceis = [
    "MAÇÃ",
    "BANANA",
    "CACHORRO",
    "GATO",
    "BOLA",
    "CARRO",
    "CASA",
    "PIZZA",
    "BOLO",
    "SORVETE",
    "PRAIA",
    "ESCOLA",
    "LIVRO",
    "CELULAR",
    "TELEVISÃO",
    "MESA",
    "CADEIRA",
    "CAMA",
    "SAPATO",
    "CAMISETA",
    "CHUVA",
    "SOL",
    "LUA",
    "ESTRELA",
    "ÁRVORE",
    "FLOR",
    "PEIXE",
    "CAVALO",
    "VACA",
    "MACACO",
    "CAFÉ",
    "ÁGUA",
    "PÃO",
    "QUEIJO",
    "ARROZ",
    "ÔNIBUS",
    "TREM",
    "BICICLETA",
    "AVIÃO",
    "MOTO",
    "ESCOVA",
    "ESPELHO",
    "RELÓGIO",
    "MOCHILA",
    "CANETA",
    "LÁPIS",
    "FUTEBOL",
    "MÚSICA",
    "DANÇA",
    "PRESENTE",
    "FESTA",
    "BALÃO",
    "CHOCOLATE",
    "MORANGO",
    "MELANCIA",
    "UVA",
    "LARANJA",
    "LIMÃO",
    "MANGA",
    "GELADEIRA",
    "FOGÃO",
    "TELEFONE",
    "JANELA",
    "PORTA",
    "QUARTO",
    "COZINHA",
    "BANHEIRO",
    "SOFÁ",
    "JARDIM",
    "CADERNO",
    "PROFESSOR",
    "ALUNO",
    "PROVA",
    "MÉDICO",
    "DENTISTA",
    "POLICIAL",
    "BOMBEIRO",
    "PINTOR"
];


const palavrasMedias = [
    "AEROPORTO",
    "HOSPITAL",
    "RESTAURANTE",
    "SHOPPING",
    "MERCADO",
    "BIBLIOTECA",
    "CINEMA",
    "TEATRO",
    "ACADEMIA",
    "ESCRITÓRIO",
    "COMPUTADOR",
    "INTERNET",
    "SENHA",
    "APLICATIVO",
    "CÂMERA",
    "MICROFONE",
    "VIOLÃO",
    "PIANO",
    "BATERIA",
    "PISCINA",
    "CACHOEIRA",
    "MONTANHA",
    "FLORESTA",
    "DESERTO",
    "ILHA",
    "NAVIO",
    "HELICÓPTERO",
    "AMBULÂNCIA",
    "TRATOR",
    "TÁXI",
    "ANIVERSÁRIO",
    "CASAMENTO",
    "CARNAVAL",
    "NATAL",
    "PÁSCOA",
    "FÉRIAS",
    "VIAGEM",
    "HOTEL",
    "MALA",
    "PASSAPORTE",
    "PROFISSÃO",
    "ENTREVISTA",
    "REUNIÃO",
    "PROJETO",
    "EQUIPE",
    "GERENTE",
    "EMPRESA",
    "PLANILHA",
    "RELATÓRIO",
    "RECEITA",
    "COZINHEIRO",
    "PADARIA",
    "SORVETERIA",
    "LANCHONETE",
    "SUPERMERCADO",
    "FARMÁCIA",
    "CONSULTÓRIO",
    "FACULDADE",
    "UNIVERSIDADE",
    "ESTÁDIO",
    "CAMPEONATO",
    "TORCIDA",
    "JOGADOR",
    "TREINADOR",
    "MÚSICO",
    "CANTOR",
    "ATOR",
    "DIRETOR",
    "FOTÓGRAFO",
    "JORNALISTA",
    "REPÓRTER"
];


const palavrasDificeis = [
    "CRIATIVIDADE",
    "PERSISTÊNCIA",
    "RESPONSABILIDADE",
    "LIDERANÇA",
    "SUSTENTABILIDADE",
    "TECNOLOGIA",
    "INOVAÇÃO",
    "ESTRATÉGIA",
    "COMUNICAÇÃO",
    "COLABORAÇÃO",
    "EMPATIA",
    "CONFIANÇA",
    "DEMOCRACIA",
    "LIBERDADE",
    "JUSTIÇA",
    "IGUALDADE",
    "UNIVERSO",
    "GRAVIDADE",
    "ASTRONAUTA",
    "GALÁXIA",
    "EXPERIMENTO",
    "CIÊNCIA",
    "DESCOBERTA",
    "INVENÇÃO",
    "PSICOLOGIA",
    "FILOSOFIA",
    "HISTÓRIA",
    "GEOGRAFIA",
    "ECONOMIA",
    "POLÍTICA",
    "CULTURA",
    "TRADIÇÃO",
    "IMAGINAÇÃO",
    "CURIOSIDADE",
    "CONCENTRAÇÃO",
    "MOTIVAÇÃO",
    "DETERMINAÇÃO",
    "GENEROSIDADE",
    "SOLIDARIEDADE",
    "COMPETITIVIDADE",
    "OPORTUNIDADE",
    "PLANEJAMENTO",
    "ORGANIZAÇÃO",
    "PRODUTIVIDADE",
    "QUALIDADE",
    "SEGURANÇA",
    "PRESERVAÇÃO",
    "RECICLAGEM",
    "MEIO AMBIENTE"
];


/* =====================================================
   VARIÁVEIS
===================================================== */

let jogadores = [];

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
   VARIÁVEIS DO DESEMPATE
===================================================== */

let modoDesempate = false;

let duplasDesempate = [];

let rodadaDesempate = 1;

let pontosDesempate = new Map();

let duplaAtual = null;


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
   TROCAR DE TELA
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

btnComecar.addEventListener(
    "click",
    iniciarJogo
);


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


    /* ================================================
       RESET COMPLETO
    ================================================= */

    duplas = [];

    rodada = 1;

    indiceDupla = 0;

    vezAtual = 1;

    indiceDificuldade = 0;

    palavrasUsadas = [];

    modoDesempate = false;

    duplasDesempate = [];

    rodadaDesempate = 1;

    pontosDesempate =
        new Map();

    duplaAtual = null;


    prepararRodada();

}


/* =====================================================
   PREPARAR RODADA
===================================================== */

function prepararRodada() {

    clearInterval(
        intervalo
    );


    criarDuplas();


    document
        .querySelectorAll("#numeroRodada")
        .forEach(elemento => {

            elemento.textContent =
                rodada;

        });


    mostrarListaDuplas();


    mostrarTela(
        "duplasTela"
    );

}


/* =====================================================
   CRIAR DUPLAS FIXAS
===================================================== */

function criarDuplas() {

    /*
       NUNCA EMBARALHA.

       Dupla 1 = jogador 1 + jogador 2
       Dupla 2 = jogador 3 + jogador 4
       Dupla 3 = jogador 5 + jogador 6
    */


    if (
        duplas.length === 3
    ) {

        return;

    }


    duplas = [

        [
            jogadores[0],
            jogadores[1]
        ],

        [
            jogadores[2],
            jogadores[3]
        ],

        [
            jogadores[4],
            jogadores[5]
        ]

    ];


    duplas.forEach(
        dupla => {

            dupla.pontos = 0;

            dupla.pontosRodadas = [];

        }
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


    container.innerHTML = "";


    duplas.forEach(
        (
            dupla,
            index
        ) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "dupla";


            card.innerHTML = `

                <h3>
                    DUPLA ${index + 1}
                </h3>

                <p>
                    ${dupla[0].nome}
                </p>

                <p>
                    +
                </p>

                <p>
                    ${dupla[1].nome}
                </p>

            `;


            container.appendChild(
                card
            );

        }
    );

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
   OBTER LISTA DE DUPLAS ATIVAS
===================================================== */

function obterDuplasAtivas() {

    if (
        modoDesempate
    ) {

        return duplasDesempate;

    }


    return duplas;

}


/* =====================================================
   INICIAR DUPLA
===================================================== */

function iniciarDupla() {

    const lista =
        obterDuplasAtivas();


    if (
        indiceDupla >=
        lista.length
    ) {

        finalizarRodada();

        return;

    }


    duplaAtual =
        lista[indiceDupla];


    indiceDupla++;


    jogadorPista =
        duplaAtual[0];


    jogadorAdivinha =
        duplaAtual[1];


    vezAtual = 1;


    iniciarTurno();

}


/* =====================================================
   INICIAR TURNO
===================================================== */

function iniciarTurno() {

    clearInterval(
        intervalo
    );


    tempo = 60;

    acertos = 0;

    passes = 0;


    const numeroRodada =
        document.getElementById(
            "rodadaTopo"
        );


    if (numeroRodada) {

        numeroRodada.textContent =
            modoDesempate
                ? `DESEMPATE ${rodadaDesempate}`
                : rodada;

    }


    const nomeDupla =
        document.getElementById(
            "nomeDuplaAtual"
        );


    if (nomeDupla) {

        const numero =
            duplas.indexOf(
                duplaAtual
            ) + 1;


        nomeDupla.textContent =
            `DUPLA ${numero}`;

    }


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
    ).textContent =
        "0";


    document.getElementById(
        "pulos"
    ).textContent =
        "0";


    document.getElementById(
        "cronometro"
    ).textContent =
        "01:00";


    document.getElementById(
        "cronometro"
    ).classList.remove(
        "urgente"
    );


    btnAcertou.disabled =
        false;


    btnPular.disabled =
        false;


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

    clearInterval(
        intervalo
    );


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

    const minutos =
        Math.floor(
            tempo / 60
        );


    const segundos =
        tempo % 60;


    document.getElementById(
        "cronometro"
    ).textContent =

        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;


    if (
        tempo <= 10
    ) {

        document.getElementById(
            "cronometro"
        ).classList.add(
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


    document.getElementById(
        "palavra"
    ).textContent =
        palavra;


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

btnAcertou.addEventListener(
    "click",
    () => {

        if (
            tempo <= 0
        ) {

            return;

        }


        /*
           PONTUAÇÃO NORMAL
        */

        if (
            !modoDesempate
        ) {

            duplaAtual.pontos =
                (
                    duplaAtual.pontos ||
                    0
                ) + 1;

        }


        /*
           PONTUAÇÃO DO DESEMPATE
        */

        else {

            const atual =
                pontosDesempate.get(
                    duplaAtual
                ) || 0;


            pontosDesempate.set(
                duplaAtual,
                atual + 1
            );

        }


        acertos++;


        document.getElementById(
            "acertos"
        ).textContent =
            acertos;


        novaPalavra();

    }
);


/* =====================================================
   PULAR
===================================================== */

btnPular.addEventListener(
    "click",
    () => {

        if (
            tempo <= 0
        ) {

            return;

        }


        if (
            passes >= 3
        ) {

            return;

        }


        passes++;


        document.getElementById(
            "pulos"
        ).textContent =
            passes;


        if (
            passes >= 3
        ) {

            btnPular.disabled =
                true;

        }


        novaPalavra();

    }
);


/* =====================================================
   PALAVRA ANULADA
===================================================== */

if (btnAnular) {

    btnAnular.addEventListener(
        "click",
        () => {

            if (
                tempo <= 0
            ) {

                return;

            }


            /*
               Não ganha ponto.
               Não perde ponto.
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

function finalizarTurno() {

    clearInterval(
        intervalo
    );


    tempo = 0;


    document.getElementById(
        "cronometro"
    ).textContent =
        "00:00";


    document.getElementById(
        "cronometro"
    ).classList.remove(
        "urgente"
    );


    btnAcertou.disabled =
        true;


    btnPular.disabled =
        true;


    if (btnAnular) {

        btnAnular.disabled =
            true;

    }


    /*
       PRIMEIRO TURNO:
       troca as funções.
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
       SEGUNDO TURNO:
       dupla terminou.
    */

    prepararTrocaDeDupla();

}


/* =====================================================
   TROCAR FUNÇÃO
===================================================== */

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


/* =====================================================
   PAUSA ENTRE DUPLAS
===================================================== */

function prepararTrocaDeDupla() {

    clearInterval(
        intervalo
    );


    const lista =
        obterDuplasAtivas();


    const duplaAnterior =
        lista[
            indiceDupla - 1
        ];


    const proxima =
        lista[
            indiceDupla
        ];


    document.getElementById(
        "duplaAnterior"
    ).textContent =

        duplaAnterior
            .map(
                jogador =>
                    jogador.nome
            )
            .join(" + ");


    if (proxima) {

        document.getElementById(
            "proximaDupla"
        ).textContent =

            proxima
                .map(
                    jogador =>
                        jogador.nome
                )
                .join(" + ");


        btnProximaDupla.textContent =
            modoDesempate
                ? "INICIAR DESEMPATE"
                : "INICIAR PRÓXIMA DUPLA";


        mostrarTela(
            "trocaProximaDuplaTela"
        );

    }

    else {

        finalizarRodada();

    }

}


/* =====================================================
   PRÓXIMA DUPLA
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

    clearInterval(
        intervalo
    );


    /*
       SE ESTIVER NO DESEMPATE
    */

    if (
        modoDesempate
    ) {

        finalizarRodadaDesempate();

        return;

    }


    /*
       GUARDA A PONTUAÇÃO DA RODADA
    */

    duplas.forEach(
        dupla => {

            if (
                !Array.isArray(
                    dupla.pontosRodadas
                )
            ) {

                dupla.pontosRodadas =
                    [];

            }


            dupla.pontosRodadas.push(
                dupla.pontos || 0
            );

        }
    );


    mostrarResultado();

}


/* =====================================================
   MOSTRAR RESULTADO
===================================================== */

function mostrarResultado() {

    const container =
        document.getElementById(
            "resultadoContainer"
        );


    container.innerHTML =
        "";


    duplas.forEach(
        (
            dupla,
            index
        ) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "resultado-item";


            const pontosRodada =
                dupla.pontosRodadas[
                    dupla.pontosRodadas.length - 1
                ] || 0;


            const total =
                dupla.pontosRodadas.reduce(
                    (
                        soma,
                        pontos
                    ) =>
                        soma + pontos,
                    0
                );


            item.innerHTML = `

                <span>

                    <strong>
                        DUPLA ${index + 1}
                    </strong>

                    <br>

                    ${dupla[0].nome}
                    +
                    ${dupla[1].nome}

                </span>

                <strong>

                    Rodada:
                    ${pontosRodada}

                    |

                    Total:
                    ${total}

                </strong>

            `;


            container.appendChild(
                item
            );

        }
    );


    const mensagem =
        document.getElementById(
            "mensagemEliminacao"
        );


    if (mensagem) {

        mensagem.textContent =
            `Rodada ${rodada} finalizada.`;

    }


    /*
       SE CHEGOU NA TERCEIRA RODADA,
       VERIFICA EMPATE.
    */

    if (
        rodada >= 3
    ) {

        const resultado =
            verificarEmpate();


        if (
            resultado.temEmpate
        ) {

            btnContinuar.textContent =
                "⚡ INICIAR DESEMPATE";

        }

        else {

            btnContinuar.textContent =
                "VER CAMPEÃO";

        }

    }

    else {

        btnContinuar.textContent =
            "PRÓXIMA RODADA";

    }


    mostrarTela(
        "resultadoTela"
    );

}


/* =====================================================
   VERIFICAR EMPATE
===================================================== */

function verificarEmpate() {

    const totais =
        duplas.map(
            dupla =>
                dupla.pontosRodadas.reduce(
                    (
                        soma,
                        pontos
                    ) =>
                        soma + pontos,
                    0
                )
        );


    const maior =
        Math.max(
            ...totais
        );


    const empatadas =
        duplas.filter(
            (
                dupla,
                index
            ) =>
                totais[index] === maior
        );


    return {

        temEmpate:
            empatadas.length > 1,

        empatadas:
            empatadas,

        maior:
            maior

    };

}


/* =====================================================
   BOTÃO CONTINUAR
===================================================== */

btnContinuar.addEventListener(
    "click",
    () => {

        /*
           SE ESTAMOS NA TELA FINAL
           DAS 3 RODADAS
        */

        if (
            !modoDesempate &&
            rodada >= 3
        ) {

            const resultado =
                verificarEmpate();


            /*
               TEM EMPATE
            */

            if (
                resultado.temEmpate
            ) {

                iniciarDesempate(
                    resultado.empatadas
                );

                return;

            }


            /*
               NÃO TEM EMPATE
            */

            mostrarCampeao();

            return;

        }


        /*
           PRÓXIMA RODADA NORMAL
        */

        if (
            !modoDesempate
        ) {

            rodada++;


            /*
               Zera apenas os pontos
               da rodada atual.
            */

            duplas.forEach(
                dupla => {

                    dupla.pontos =
                        0;

                }
            );


            indiceDupla = 0;

            vezAtual = 1;


            prepararRodada();

        }

    }
);


/* =====================================================
   INICIAR DESEMPATE
===================================================== */

function iniciarDesempate(
    empatadas
) {

    modoDesempate =
        true;


    duplasDesempate =
        [...empatadas];


    rodadaDesempate = 1;


    indiceDupla = 0;


    vezAtual = 1;


    pontosDesempate =
        new Map();


    duplasDesempate.forEach(
        dupla => {

            pontosDesempate.set(
                dupla,
                0
            );

        }
    );


    mostrarTelaDesempate();

}


/* =====================================================
   MOSTRAR TELA DE DESEMPATE
===================================================== */

function mostrarTelaDesempate() {

    const container =
        document.getElementById(
            "resultadoContainer"
        );


    container.innerHTML =
        "";


    const titulo =
        document.createElement(
            "div"
        );


    titulo.className =
        "resultado-item";


    titulo.innerHTML = `

        <span>

            <strong>
                ⚡ RODADA DE DESEMPATE
            </strong>

            <br><br>

            Houve empate após as
            3 rodadas!

            <br><br>

            ${duplasDesempate
                .map(
                    dupla => {

                        const numero =
                            duplas.indexOf(
                                dupla
                            ) + 1;

                        return `
                            DUPLA ${numero}:
                            ${dupla[0].nome}
                            +
                            ${dupla[1].nome}
                            <br>
                        `;

                    }
                )
                .join("")}

        </span>

    `;


    container.appendChild(
        titulo
    );


    document
        .querySelectorAll("#numeroRodada")
        .forEach(elemento => {

            elemento.textContent =
                `DESEMPATE ${rodadaDesempate}`;

        });


    btnContinuar.textContent =
        "⚡ COMEÇAR DESEMPATE";


    mostrarTela(
        "resultadoTela"
    );


    /*
       Remove o listener antigo
       apenas para controlar o próximo clique.
    */

    btnContinuar.onclick =
        iniciarPrimeiroTurnoDesempate;

}


/* =====================================================
   PRIMEIRO TURNO DO DESEMPATE
===================================================== */

function iniciarPrimeiroTurnoDesempate() {

    /*
       Restaura o comportamento normal
       do botão depois.
    */

    btnContinuar.onclick =
        null;


    indiceDupla = 0;


    iniciarDupla();

}


/* =====================================================
   FINALIZAR RODADA DO DESEMPATE
===================================================== */

function finalizarRodadaDesempate() {

    clearInterval(
        intervalo
    );


    const maior =
        Math.max(
            ...duplasDesempate.map(
                dupla =>
                    pontosDesempate.get(
                        dupla
                    ) || 0
            )
        );


    const empatadas =
        duplasDesempate.filter(
            dupla =>
                (
                    pontosDesempate.get(
                        dupla
                    ) || 0
                ) === maior
        );


    /*
       SE EMPATOU NOVAMENTE
    */

    if (
        empatadas.length > 1
    ) {

        duplasDesempate =
            [...empatadas];


        rodadaDesempate++;


        pontosDesempate =
            new Map();


        duplasDesempate.forEach(
            dupla => {

                pontosDesempate.set(
                    dupla,
                    0
                );

            }
        );


        indiceDupla = 0;


        mostrarNovoDesempate();


        return;

    }


    /*
       TEMOS UMA VENCEDORA
    */

    const campea =
        empatadas[0];


    mostrarCampeao(
        campea
    );

}


/* =====================================================
   NOVO DESEMPATE
===================================================== */

function mostrarNovoDesempate() {

    const container =
        document.getElementById(
            "resultadoContainer"
        );


    container.innerHTML =
        "";


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "resultado-item";


    item.innerHTML = `

        <span>

            <strong>
                ⚡ NOVO DESEMPATE
            </strong>

            <br><br>

            O empate continua!

            <br><br>

            ${duplasDesempate
                .map(
                    dupla => {

                        const numero =
                            duplas.indexOf(
                                dupla
                            ) + 1;

                        return `
                            DUPLA ${numero}:
                            ${dupla[0].nome}
                            +
                            ${dupla[1].nome}
                            <br>
                        `;

                    }
                )
                .join("")}

            <br>

            Cada dupla terá
            novamente 60 segundos.

        </span>

    `;


    container.appendChild(
        item
    );


    document
        .querySelectorAll("#numeroRodada")
        .forEach(elemento => {

            elemento.textContent =
                `DESEMPATE ${rodadaDesempate}`;

        });


    btnContinuar.textContent =
        "⚡ INICIAR NOVO DESEMPATE";


    btnContinuar.onclick =
        iniciarPrimeiroTurnoDesempate;


    mostrarTela(
        "resultadoTela"
    );

}


/* =====================================================
   CAMPEÃO
===================================================== */

function mostrarCampeao(
    campeaoForcado = null
) {

    clearInterval(
        intervalo
    );


    let campeao;


    let pontosFinais;


    /*
       CAMPEÃO VINDO DO DESEMPATE
    */

    if (
        campeaoForcado
    ) {

        campeao =
            campeaoForcado;


        pontosFinais =
            pontosDesempate.get(
                campeao
            ) || 0;

    }

    else {

        /*
           SOMA AS 3 RODADAS
        */

        duplas.forEach(
            dupla => {

                dupla.totalFinal =
                    dupla.pontosRodadas.reduce(
                        (
                            soma,
                            pontos
                        ) =>
                            soma + pontos,
                        0
                    );

            }
        );


        const maiorPontuacao =
            Math.max(
                ...duplas.map(
                    dupla =>
                        dupla.totalFinal
                )
            );


        campeao =
            duplas.find(
                dupla =>
                    dupla.totalFinal ===
                    maiorPontuacao
            );


        pontosFinais =
            maiorPontuacao;

    }


    const numero =
        duplas.indexOf(
            campeao
        ) + 1;


    const campeaoNome =
        document.getElementById(
            "campeaoNome"
        );


    const campeaoIntegrantes =
        document.getElementById(
            "campeaoIntegrantes"
        );


    const campeaoPontos =
        document.getElementById(
            "campeaoPontos"
        );


    campeaoNome.textContent =
        `DUPLA ${numero}`;


    if (
        campeaoIntegrantes
    ) {

        campeaoIntegrantes.textContent =

            `${campeao[0].nome} + ${campeao[1].nome}`;

    }


    if (
        campeaoPontos
    ) {

        if (
            campeaoForcado
        ) {

            campeaoPontos.textContent =
                `${pontosFinais} PONTOS NO DESEMPATE`;

        }

        else {

            campeaoPontos.textContent =
                `${pontosFinais} PONTOS`;

        }

    }


    mostrarTela(
        "campeaoTela"
    );

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

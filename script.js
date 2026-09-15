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

let btnAnular =
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

    document.querySelectorAll(".tela").forEach(tela => {

        tela.classList.remove("ativa");

    });


    const tela =
        document.getElementById(id);


    if (tela) {

        tela.classList.add("ativa");

    }

}


/* =====================================================
   EMBARALHAR
===================================================== */

/*
   Mantido no código original para não alterar
   a estrutura do projeto.

   IMPORTANTE:
   Essa função NÃO é mais usada para criar as duplas.
*/

function embaralhar(lista) {

    const copia = [...lista];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [copia[i], copia[j]] =
        [copia[j], copia[i]];

    }

    return copia;
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


    jogadoresAtivos =
        [...jogadores];


    /*
       Reinicia completamente as duplas
       apenas quando começa um novo jogo.
    */

    duplas = [];


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


    mostrarTela(
        "duplasTela"
    );

}


/* =====================================================
   CRIAR DUPLAS
===================================================== */

/*
   ====================================================
   DUPLAS FIXAS
   ====================================================

   DUPLA 1
   Participante 1 + Participante 2

   DUPLA 2
   Participante 3 + Participante 4

   DUPLA 3
   Participante 5 + Participante 6

   NÃO EXISTE SORTEIO.
   NÃO EXISTE EMBARALHAMENTO.
   NÃO EXISTE TROCA DE PARCEIRO.

   Essas duplas permanecem iguais nas 3 rodadas.
*/

function criarDuplas() {


    /*
       Só cria as duplas uma vez.

       Nas próximas rodadas, mantém
       exatamente as mesmas duplas.
    */

    if (
        duplas.length !== 3
    ) {

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


        /*
           Pontuação pertence à dupla.
        */

        duplas.forEach(
            dupla => {

                dupla.pontos = 0;

                dupla.pontosRodadas = [];

            }
        );

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


    duplas.forEach(
        (dupla, index) => {


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


    /*
       Pega a dupla pela posição fixa.

       índice 0 = Dupla 1
       índice 1 = Dupla 2
       índice 2 = Dupla 3
    */

    const dupla =
        duplas[indiceDupla];


    /*
       Avança somente para a próxima dupla.

       Os jogadores dentro da dupla
       nunca são alterados.
    */

    indiceDupla++;


    /*
       Primeiro turno:

       jogador 1 da dupla dá pista
       jogador 2 da dupla adivinha
    */

    jogadorPista =
        dupla[0];


    jogadorAdivinha =
        dupla[1];


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


    document.getElementById(
        "rodadaTopo"
    ).textContent =
        rodada;


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
   CRONÔMETRO VISUAL
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
        ) return;


        /*
           O ponto é da DUPLA.

           Não pertence individualmente
           ao jogador que adivinhou.
        */

        const duplaAtual =
            duplas[
                indiceDupla - 1
            ];


        if (duplaAtual) {

            duplaAtual.pontos =
                (duplaAtual.pontos || 0) + 1;

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
        ) return;


        if (
            passes >= 3
        ) return;


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

/*
   Se o botão já existir no seu HTML,
   ele será usado normalmente.

   Se ainda não existir, o JavaScript
   cria o botão ao lado do botão PULAR.

   Assim não precisamos reconstruir
   seu index.html.
*/

if (
    !btnAnular &&
    btnPular
) {

    btnAnular =
        document.createElement(
            "button"
        );


    btnAnular.id =
        "btnAnular";


    btnAnular.type =
        "button";


    btnAnular.textContent =
        "🚫 PALAVRA ANULADA";


    /*
       Mantém a classe do botão PULAR
       para não quebrar o layout original.
    */

    btnAnular.className =
        btnPular.className;


    btnPular.parentNode.insertBefore(
        btnAnular,
        btnPular.nextSibling
    );

}


/*
   Clique em PALAVRA ANULADA
*/

if (
    btnAnular
) {

    btnAnular.addEventListener(
        "click",
        () => {


            if (
                tempo <= 0
            ) return;


            /*
               Palavra anulada:

               - não ganha ponto
               - não perde ponto
               - não gasta pulo
               - não troca dupla
               - simplesmente passa para outra palavra
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

       Os mesmos dois jogadores
       trocam as funções.

       A dupla continua exatamente igual.
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
           Troca SOMENTE as funções.

           Não troca os parceiros.
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

    clearInterval(
        intervalo
    );


    const duplaAnterior =
        duplas[
            indiceDupla - 1
        ];


    const proxima =
        duplas[
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
            "INICIAR PRÓXIMA DUPLA";


        mostrarTela(
            "trocaProximaDuplaTela"
        );


    }

    else {

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

    clearInterval(
        intervalo
    );


    /*
       Guarda a pontuação da rodada
       de cada dupla.

       Não elimina ninguém.
       Não mistura ninguém.
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
   RESULTADO
===================================================== */

function mostrarResultado() {

    const container =
        document.getElementById(
            "resultadoContainer"
        );


    container.innerHTML = "";


    duplas.forEach(
        (dupla, index) => {


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


    if (
        rodada >= 3
    ) {

        btnContinuar.textContent =
            "VER CAMPEÃO";

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
   PRÓXIMA RODADA
===================================================== */

btnContinuar.addEventListener(
    "click",
    () => {


        /*
           Depois da terceira rodada,
           mostra o resultado final.
        */

        if (
            rodada >= 3
        ) {

            mostrarCampeao();

            return;

        }


        rodada++;


        /*
           Zera somente os pontos
           da rodada atual.

           O histórico fica salvo.
        */

        duplas.forEach(
            dupla => {

                dupla.pontos = 0;

            }
        );


        indiceDupla = 0;

        vezAtual = 1;


        /*
           As duplas continuam:

           1 + 2
           3 + 4
           5 + 6
        */

        prepararRodada();

    }
);


/* =====================================================
   CAMPEÃO
===================================================== */

function mostrarCampeao() {

    clearInterval(
        intervalo
    );


    /*
       Soma as 3 rodadas.
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


    const campeas =
        duplas.filter(
            dupla =>
                dupla.totalFinal ===
                maiorPontuacao
        );


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


    /*
       EMPATE
    */

    if (
        campeas.length > 1
    ) {


        campeaoNome.textContent =
            "EMPATE!";


        if (
            campeaoIntegrantes
        ) {

            campeaoIntegrantes.textContent =

                campeas
                    .map(
                        dupla =>

                            `Dupla ${
                                duplas.indexOf(
                                    dupla
                                ) + 1
                            }:
                            ${dupla[0].nome}
                            +
                            ${dupla[1].nome}`
                    )
                    .join(" | ");

        }


    }

    else {


        const campeao =
            campeas[0];


        const numero =
            duplas.indexOf(
                campeao
            ) + 1;


        campeaoNome.textContent =
            `DUPLA ${numero}`;


        if (
            campeaoIntegrantes
        ) {

            campeaoIntegrantes.textContent =

                `${campeao[0].nome}
                 +
                 ${campeao[1].nome}`;

        }

    }


    if (
        campeaoPontos
    ) {

        campeaoPontos.textContent =
            `${maiorPontuacao} PONTOS`;

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

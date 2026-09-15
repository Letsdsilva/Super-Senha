/* =====================================================
   MEGA SENHA - MEGA SHOW
   6 PARTICIPANTES
   3 DUPLAS FIXAS
   3 RODADAS
===================================================== */


/* =====================================================
   PALAVRAS
===================================================== */

const palavrasFaceis = [
    "MAÇÃ","BANANA","CACHORRO","GATO","BOLA","CARRO",
    "CASA","PIZZA","BOLO","SORVETE","PRAIA","ESCOLA",
    "LIVRO","CELULAR","TELEVISÃO","MESA","CADEIRA","CAMA",
    "SAPATO","CAMISETA","CHUVA","SOL","LUA","ESTRELA",
    "ÁRVORE","FLOR","PEIXE","CAVALO","MACACO","CAFÉ",
    "ÁGUA","PÃO","QUEIJO","ARROZ","ÔNIBUS","TREM",
    "BICICLETA","AVIÃO","MOTO","ESCOVA","ESPELHO","RELÓGIO",
    "MOCHILA","CANETA","LÁPIS","FUTEBOL","MÚSICA","DANÇA",
    "PRESENTE","FESTA","BALÃO","CHOCOLATE","MORANGO","UVA",
    "LARANJA","LIMÃO","MANGA","GELADEIRA","FOGÃO","TELEFONE",
    "JANELA","PORTA","QUARTO","COZINHA","BANHEIRO","SOFÁ",
    "JARDIM","CADERNO","PROFESSOR","ALUNO","PROVA","MÉDICO",
    "DENTISTA","POLICIAL","BOMBEIRO","PINTOR"
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
   VARIÁVEIS DO JOGO
===================================================== */

let jogadores = [];

let duplas = [];

let rodada = 1;

const TOTAL_RODADAS = 3;

let indiceDupla = 0;

let vezAtual = 1;

let jogadorPista = null;

let jogadorAdivinha = null;

let tempo = 60;

let intervalo = null;

let passes = 0;

let acertosTurno = 0;

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
   TROCA DE TELA
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
   INICIAR JOGO
===================================================== */

btnComecar.addEventListener("click", iniciarJogo);

function iniciarJogo() {

    jogadores = [];

    /* ================================================
       CAPTURA OS 6 PARTICIPANTES
    ================================================ */

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
            nome: nome
        });
    }


    /* ================================================
       DUPLAS FIXAS

       NUNCA ALTERAR ESSA ORDEM.

       PARTICIPANTE 1 + 2 = DUPLA 1
       PARTICIPANTE 3 + 4 = DUPLA 2
       PARTICIPANTE 5 + 6 = DUPLA 3

       NÃO EXISTE SORTEIO.
       NÃO EXISTE EMBARALHAMENTO.
       NÃO EXISTE TROCA DE PARCEIRO.
    ================================================ */

    duplas = [

        {
            numero: 1,

            jogadores: [
                jogadores[0],
                jogadores[1]
            ],

            pontos: 0,

            pontosRodadas: []
        },

        {
            numero: 2,

            jogadores: [
                jogadores[2],
                jogadores[3]
            ],

            pontos: 0,

            pontosRodadas: []
        },

        {
            numero: 3,

            jogadores: [
                jogadores[4],
                jogadores[5]
            ],

            pontos: 0,

            pontosRodadas: []
        }

    ];


    rodada = 1;

    indiceDupla = 0;

    vezAtual = 1;

    palavrasUsadas = [];

    indiceDificuldade = 0;


    prepararRodada();
}


/* =====================================================
   PREPARAR RODADA
===================================================== */

function prepararRodada() {

    clearInterval(intervalo);

    indiceDupla = 0;

    document.getElementById(
        "numeroRodada"
    ).textContent = rodada;

    mostrarListaDuplas();

    mostrarTela("duplasTela");
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


    duplas.forEach(dupla => {

        const card =
            document.createElement("div");

        card.className = "dupla";


        card.innerHTML = `

            <h3>
                DUPLA ${dupla.numero}
            </h3>

            <p>
                ${dupla.jogadores[0].nome}
            </p>

            <p>+</p>

            <p>
                ${dupla.jogadores[1].nome}
            </p>

            <strong>
                ${dupla.pontos} PONTOS
            </strong>

        `;


        container.appendChild(card);

    });
}


/* =====================================================
   COMEÇAR RODADA
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
        indiceDupla >= duplas.length
    ) {

        finalizarRodada();

        return;
    }


    /*
       PEGA EXATAMENTE A DUPLA ATUAL.

       DUPLA 1 → 1 + 2
       DUPLA 2 → 3 + 4
       DUPLA 3 → 5 + 6
    */

    const duplaAtual =
        duplas[indiceDupla];


    /*
       PRIMEIRO TURNO

       PRIMEIRO JOGADOR DÁ A PISTA.
       SEGUNDO JOGADOR ADIVINHA.
    */

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

    passes = 0;

    acertosTurno = 0;


    const duplaAtual =
        duplas[indiceDupla];


    document.getElementById(
        "rodadaTopo"
    ).textContent = rodada;


    document.getElementById(
        "nomeDuplaAtual"
    ).textContent =
        `DUPLA ${duplaAtual.numero}`;


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
        duplaAtual.pontos;


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

    btnAnular.disabled = false;


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
   ATUALIZAR CRONÔMETRO
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

    }

    else if (indiceDificuldade === 1) {

        lista = palavrasMedias;

    }

    else {

        lista = palavrasDificeis;

    }


    let disponiveis =
        lista.filter(
            palavra =>
                !palavrasUsadas.includes(palavra)
        );


    if (
        disponiveis.length === 0
    ) {

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

        if (tempo <= 0) return;


        const duplaAtual =
            duplas[indiceDupla];


        /*
           O PONTO É DA DUPLA.
           NÃO É DO PARTICIPANTE.
        */

        duplaAtual.pontos++;


        acertosTurno++;


        document.getElementById(
            "acertos"
        ).textContent =
            duplaAtual.pontos;


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

            btnPular.disabled = true;

        }


        novaPalavra();

    }
);


/* =====================================================
   PALAVRA ANULADA
===================================================== */

btnAnular.addEventListener(
    "click",
    () => {

        if (tempo <= 0) return;


        /*
           PALAVRA ANULADA:

           - NÃO GANHA PONTO
           - NÃO PERDE PONTO
           - NÃO GASTA PULO
           - NÃO TROCA DE DUPLA

           Apenas aparece uma nova palavra.
        */

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


    btnAcertou.disabled = true;

    btnPular.disabled = true;

    btnAnular.disabled = true;


    /*
       PRIMEIRO TURNO DA DUPLA ACABOU.

       AGORA TROCA APENAS AS FUNÇÕES.

       A DUPLA CONTINUA A MESMA.
    */

    if (
        vezAtual === 1
    ) {

        document.getElementById(
            "jogadorSai"
        ).textContent =
            jogadorAdivinha.nome;


        document.getElementById(
            "jogadorEntra"
        ).textContent =
            jogadorPista.nome;


        document.getElementById(
            "mensagemTroca"
        ).textContent =
            "Agora troquem as funções! A dupla continua a mesma.";


        mostrarTela(
            "trocaDuplaTela"
        );


        return;
    }


    /*
       OS DOIS TURNOS DA DUPLA TERMINARAM.
    */

    prepararTrocaDeDupla();
}


/* =====================================================
   TROCAR FUNÇÕES
===================================================== */

btnTrocarTurno.addEventListener(
    "click",
    () => {

        /*
           TROCA SOMENTE PISTA/ADIVINHA.

           NÃO TROCA A DUPLA.
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
   PREPARAR PRÓXIMA DUPLA
===================================================== */

function prepararTrocaDeDupla() {

    clearInterval(intervalo);


    const duplaAtual =
        duplas[indiceDupla];


    const proximaDupla =
        duplas[indiceDupla + 1];


    document.getElementById(
        "duplaAnterior"
    ).textContent =

        `DUPLA ${duplaAtual.numero}: ` +

        duplaAtual.jogadores[0].nome +

        " + " +

        duplaAtual.jogadores[1].nome;


    if (proximaDupla) {

        document.getElementById(
            "proximaDupla"
        ).textContent =

            `DUPLA ${proximaDupla.numero}: ` +

            proximaDupla.jogadores[0].nome +

            " + " +

            proximaDupla.jogadores[1].nome;


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
   PRÓXIMA DUPLA
===================================================== */

btnProximaDupla.addEventListener(
    "click",
    () => {

        /*
           AVANÇA:

           DUPLA 1 → DUPLA 2
           DUPLA 2 → DUPLA 3

           SEM ALTERAR OS JOGADORES.
        */

        indiceDupla++;

        iniciarDupla();

    }
);


/* =====================================================
   FINALIZAR RODADA
===================================================== */

function finalizarRodada() {

    clearInterval(intervalo);


    /*
       SALVA A PONTUAÇÃO DA RODADA
       PARA CADA DUPLA.
    */

    duplas.forEach(
        dupla => {

            dupla.pontosRodadas.push(
                dupla.pontos
            );

        }
    );


    mostrarResultado();
}


/* =====================================================
   RESULTADO DA RODADA
===================================================== */

function mostrarResultado() {

    const container =
        document.getElementById(
            "resultadoContainer"
        );


    container.innerHTML = "";


    duplas.forEach(
        dupla => {

            const item =
                document.createElement("div");


            item.className =
                "resultado-item";


            const pontosRodada =
                dupla.pontosRodadas[
                    dupla.pontosRodadas.length - 1
                ];


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
                        DUPLA ${dupla.numero}
                    </strong>

                    <br>

                    ${dupla.jogadores[0].nome}
                    +
                    ${dupla.jogadores[1].nome}

                    <br>

                    <small>
                        Rodada ${rodada}:
                        ${pontosRodada} pontos
                    </small>

                </span>

                <strong>
                    TOTAL:
                    ${total}
                </strong>

            `;


            container.appendChild(item);

        }
    );


    if (
        rodada === TOTAL_RODADAS
    ) {

        btnContinuar.textContent =
            "VER RESULTADO FINAL";

    }

    else {

        btnContinuar.textContent =
            "PRÓXIMA RODADA";

    }


    mostrarTela("resultadoTela");
}


/* =====================================================
   CONTINUAR
===================================================== */

btnContinuar.addEventListener(
    "click",
    () => {

        if (
            rodada === TOTAL_RODADAS
        ) {

            mostrarCampeao();

            return;
        }


        rodada++;


        /*
           ZERA SOMENTE A RODADA.

           O HISTÓRICO CONTINUA SALVO.
        */

        duplas.forEach(
            dupla => {

                dupla.pontos = 0;

            }
        );


        indiceDificuldade = 0;


        /*
           IMPORTANTE:

           NOVA RODADA VOLTA PARA
           A DUPLA 1.

           E AS DUPLAS CONTINUAM:

           1 + 2
           3 + 4
           5 + 6
        */

        prepararRodada();

    }
);


/* =====================================================
   RESULTADO FINAL
===================================================== */

function mostrarCampeao() {

    clearInterval(intervalo);


    /*
       SOMA AS 3 RODADAS
       DE CADA DUPLA.
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


    /*
       VERIFICA EMPATE.
    */

    const empatadas =
        duplas.filter(
            dupla =>
                dupla.totalFinal ===
                maiorPontuacao
        );


    if (
        empatadas.length > 1
    ) {

        document.getElementById(
            "campeaoNome"
        ).textContent =
            "EMPATE!";


        document.getElementById(
            "campeaoIntegrantes"
        ).textContent =

            empatadas
                .map(
                    dupla =>
                        `DUPLA ${dupla.numero} - ` +
                        `${dupla.jogadores[0].nome} + ` +
                        `${dupla.jogadores[1].nome}`
                )
                .join(" | ");


        document.getElementById(
            "campeaoPontos"
        ).textContent =

            `${maiorPontuacao} PONTOS`;


        mostrarTela(
            "campeaoTela"
        );


        return;
    }


    const campea =
        empatadas[0];


    document.getElementById(
        "campeaoNome"
    ).textContent =

        `DUPLA ${campea.numero}`;


    document.getElementById(
        "campeaoIntegrantes"
    ).textContent =

        `${campea.jogadores[0].nome} + ` +
        `${campea.jogadores[1].nome}`;


    document.getElementById(
        "campeaoPontos"
    ).textContent =

        `${campea.totalFinal} PONTOS NO TOTAL`;


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

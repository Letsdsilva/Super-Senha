/* =====================================================
   MEGA SENHA - MEGA SHOW
   6 PARTICIPANTES
   3 DUPLAS FIXAS
   3 RODADAS
   PONTUAÇÃO POR DUPLA
   PALAVRA ANULADA
===================================================== */


/* =====================================================
   PALAVRAS FÁCEIS
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


/* =====================================================
   PALAVRAS MÉDIAS
===================================================== */

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


/* =====================================================
   PALAVRAS DIFÍCEIS
===================================================== */

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
   ELEMENTOS HTML
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
   INICIAR JOGO
===================================================== */

btnComecar.addEventListener(
    "click",
    iniciarJogo
);


function iniciarJogo() {

    jogadores = [];


    /*
       PEGA OS 6 PARTICIPANTES
    */

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


    /*
       =================================================
       DUPLAS FIXAS
       =================================================

       NUNCA EMBARALHA.

       DUPLA 1 = PARTICIPANTE 1 + 2
       DUPLA 2 = PARTICIPANTE 3 + 4
       DUPLA 3 = PARTICIPANTE 5 + 6

       ESSAS DUPLAS PERMANECEM IGUAIS
       NAS 3 RODADAS.
    */

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

    indiceDificuldade = 0;

    palavrasUsadas = [];


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


    container.innerHTML = "";


    duplas.forEach(dupla => {

        const card =
            document.createElement("div");


        card.className =
            "dupla";


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
                TOTAL: ${dupla.pontos} PONTOS
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

    /*
       Se já passaram pelas 3 duplas,
       termina a rodada.
    */

    if (
        indiceDupla >= duplas.length
    ) {

        finalizarRodada();

        return;
    }


    /*
       PEGA A DUPLA ATUAL.

       IMPORTANTE:
       NÃO HÁ EMBARALHAMENTO.
    */

    const dupla =
        duplas[indiceDupla];


    /*
       PRIMEIRO TURNO:

       Jogador 1 dá a pista.
       Jogador 2 adivinha.
    */

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


    /*
       Mostra o total de pontos
       da dupla na rodada.
    */

    document.getElementById(
        "acertos"
    ).textContent =
        duplaAtual.pontos;


    document.getElementById(
        "pulos"
    ).textContent = "0";


    document.getElementById(
        "cronometro"
    ).textContent =
        "01:00";


    document.getElementById(
        "cronometro"
    ).classList.remove(
        "urgente"
    );


    btnAcertou.disabled = false;

    btnPular.disabled = false;

    btnAnular.disabled = false;


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
        Math.floor(
            tempo / 60
        );


    const segundos =
        tempo % 60;


    document.getElementById(
        "cronometro"
    ).textContent =

        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;


    if (tempo <= 10) {

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


    /*
       Alterna entre fácil,
       média e difícil.
    */

    if (indiceDificuldade === 0) {

        lista = palavrasFaceis;

    }

    else if (indiceDificuldade === 1) {

        lista = palavrasMedias;

    }

    else {

        lista = palavrasDificeis;

    }


    /*
       Não repete palavra enquanto
       ainda existirem palavras novas.
    */

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

        if (tempo <= 0) return;


        const duplaAtual =
            duplas[indiceDupla];


        /*
           O PONTO É DA DUPLA.
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


        /*
           Máximo de 3 pulos
           por turno.
        */

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
=====================================================

   Quando o participante:

   - fala a própria palavra;
   - fala parte da palavra;
   - usa uma palavra proibida;
   - ou dá uma pista considerada inválida;

   o juiz clica em:

   🚫 PALAVRA ANULADA

   NÃO GANHA PONTO.
   NÃO PERDE PONTO.
   NÃO CONTA COMO PULO.

   Apenas troca a palavra.
===================================================== */

btnAnular.addEventListener(
    "click",
    () => {

        if (tempo <= 0) return;


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
    ).textContent =
        "00:00";


    document.getElementById(
        "cronometro"
    ).classList.remove(
        "urgente"
    );


    btnAcertou.disabled = true;

    btnPular.disabled = true;

    btnAnular.disabled = true;


    /*
       PRIMEIRO TURNO TERMINOU.

       A MESMA DUPLA CONTINUA.

       Só troca quem dá pista
       e quem adivinha.
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
            "Agora troquem as funções. A dupla continua a mesma.";


        mostrarTela(
            "trocaDuplaTela"
        );


        return;
    }


    /*
       SEGUNDO TURNO TERMINOU.

       Agora a dupla inteira terminou.
    */

    prepararTrocaDeDupla();
}


/* =====================================================
   TROCAR FUNÇÕES
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
   PREPARAR PRÓXIMA DUPLA
===================================================== */

function prepararTrocaDeDupla() {

    clearInterval(intervalo);


    const duplaAnterior =
        duplas[indiceDupla];


    const proxima =
        duplas[indiceDupla + 1];


    document.getElementById(
        "duplaAnterior"
    ).textContent =

        `DUPLA ${duplaAnterior.numero}: ` +

        duplaAnterior.jogadores
            .map(
                jogador =>
                    jogador.nome
            )
            .join(" + ");


    /*
       Se ainda existe outra dupla,
       mostra a próxima.

       IMPORTANTE:
       a próxima dupla é sempre
       a dupla cadastrada originalmente.
    */

    if (proxima) {

        document.getElementById(
            "proximaDupla"
        ).textContent =

            `DUPLA ${proxima.numero}: ` +

            proxima.jogadores
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

        /*
           As 3 duplas terminaram
           seus dois turnos.
        */

        finalizarRodada();

    }
}


/* =====================================================
   BOTÃO PRÓXIMA DUPLA
===================================================== */

btnProximaDupla.addEventListener(
    "click",
    () => {

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
       Guarda quantos pontos
       cada dupla fez nesta rodada.
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
                document.createElement(
                    "div"
                );


            item.className =
                "resultado-item";


            const pontosRodada =
                dupla.pontosRodadas[
                    dupla.pontosRodadas.length - 1
                ];


            const totalAteAgora =
                dupla.pontosRodadas.reduce(
                    (
                        total,
                        pontos
                    ) =>
                        total + pontos,
                    0
                );


            item.innerHTML = `

                <span>

                    DUPLA ${dupla.numero}

                    <br>

                    ${dupla.jogadores[0].nome}
                    +
                    ${dupla.jogadores[1].nome}

                    <br>

                    <small>
                        Rodada ${rodada}: ${pontosRodada} pontos
                    </small>

                </span>


                <strong>

                    TOTAL:
                    ${totalAteAgora}

                </strong>

            `;


            container.appendChild(
                item
            );

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
           vai para o resultado final.
        */

        if (
            rodada === TOTAL_RODADAS
        ) {

            mostrarCampeao();

            return;

        }


        rodada++;


        /*
           Zera somente o placar
           da rodada atual.

           Os pontos anteriores
           continuam salvos em
           pontosRodadas.
        */

        duplas.forEach(
            dupla => {

                dupla.pontos = 0;

            }
        );


        indiceDificuldade = 0;


        prepararRodada();

    }
);


/* =====================================================
   RESULTADO FINAL
===================================================== */

function mostrarCampeao() {

    clearInterval(intervalo);


    /*
       Calcula o total das
       3 rodadas.
    */

    duplas.forEach(
        dupla => {

            dupla.totalFinal =
                dupla.pontosRodadas.reduce(
                    (
                        total,
                        pontos
                    ) =>
                        total + pontos,
                    0
                );

        }
    );


    /*
       Encontra a maior pontuação.
    */

    const maiorPontuacao =
        Math.max(
            ...duplas.map(
                dupla =>
                    dupla.totalFinal
            )
        );


    /*
       Pega a dupla com a maior
       pontuação.

       Em caso de empate,
       mostra empate em vez
       de misturar jogadores.
    */

    const duplasEmpatadas =
        duplas.filter(
            dupla =>
                dupla.totalFinal ===
                maiorPontuacao
        );


    if (
        duplasEmpatadas.length > 1
    ) {

        const nomes =
            duplasEmpatadas
                .map(
                    dupla =>
                        `DUPLA ${dupla.numero}`
                )
                .join(" × ");


        document.getElementById(
            "campeaoNome"
        ).textContent =
            "EMPATE!";


        document.getElementById(
            "campeaoIntegrantes"
        ).textContent =
            nomes;


        document.getElementById(
            "campeaoPontos"
        ).textContent =
            `${maiorPontuacao} PONTOS CADA`;


        mostrarTela(
            "campeaoTela"
        );


        return;
    }


    const campea =
        duplasEmpatadas[0];


    /*
       Mostra somente a dupla vencedora.
    */

    document.getElementById(
        "campeaoNome"
    ).textContent =
        `DUPLA ${campea.numero}`;


    document.getElementById(
        "campeaoIntegrantes"
    ).textContent =

        campea.jogadores
            .map(
                jogador =>
                    jogador.nome
            )
            .join(" + ");


    document.getElementById(
        "campeaoPontos"
    ).textContent =

        `${campea.totalFinal} PONTOS NO TOTAL`;


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

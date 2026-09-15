/* =====================================================
   MEGA SENHA - MEGA SHOW
   3 DUPLAS FIXAS | 3 RODADAS
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
const totalRodadas = 3;

let indiceDupla = 0;
let vezAtual = 1;

let jogadorPista = null;
let jogadorAdivinha = null;

let acertosTurno = 0;
let passes = 0;
let anuladas = 0;

let tempo = 60;
let intervalo = null;

let indiceDificuldade = 0;
let palavrasUsadas = [];


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
   TROCAR TELA
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
   COMEÇAR JOGO
===================================================== */

btnComecar.addEventListener("click", iniciarJogo);


function iniciarJogo() {

    jogadores = [];

    for (let i = 1; i <= 6; i++) {

        const campo = document.getElementById(`nome${i}`);
        const nome = campo.value.trim();

        if (nome === "") {

            alert(`Digite o nome do participante ${i}.`);

            campo.focus();

            return;
        }

        jogadores.push({
            id: i,
            nome: nome
        });
    }


    /* DUPLAS FIXAS */

    duplas = [

        {
            nome: "DUPLA 1",
            jogadores: [jogadores[0], jogadores[1]],
            rodadas: [0, 0, 0],
            total: 0
        },

        {
            nome: "DUPLA 2",
            jogadores: [jogadores[2], jogadores[3]],
            rodadas: [0, 0, 0],
            total: 0
        },

        {
            nome: "DUPLA 3",
            jogadores: [jogadores[4], jogadores[5]],
            rodadas: [0, 0, 0],
            total: 0
        }

    ];


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

    indiceDupla = 0;

    document.getElementById("numeroRodada").textContent = rodada;

    mostrarListaDuplas();

    mostrarTela("duplasTela");
}


/* =====================================================
   MOSTRAR DUPLAS
===================================================== */

function mostrarListaDuplas() {

    const container =
        document.getElementById("duplasContainer");

    container.innerHTML = "";


    duplas.forEach((dupla, index) => {

        const card = document.createElement("div");

        card.className = "dupla";


        card.innerHTML = `

            <h3>${dupla.nome}</h3>

            <p>${dupla.jogadores[0].nome}</p>

            <p>+</p>

            <p>${dupla.jogadores[1].nome}</p>

            <p style="margin-top:15px; color:#f5c518;">
                Total: ${dupla.total} pontos
            </p>

        `;


        container.appendChild(card);

    });

}


/* =====================================================
   COMEÇAR RODADA
===================================================== */

btnComecarRodada.addEventListener("click", () => {

    indiceDupla = 0;

    iniciarDupla();

});


/* =====================================================
   INICIAR DUPLA
===================================================== */

function iniciarDupla() {

    if (indiceDupla >= duplas.length) {

        finalizarRodada();

        return;
    }


    const dupla = duplas[indiceDupla];


    jogadorPista = dupla.jogadores[0];

    jogadorAdivinha = dupla.jogadores[1];

    vezAtual = 1;


    iniciarTurno();
}


/* =====================================================
   INICIAR TURNO
===================================================== */

function iniciarTurno() {

    clearInterval(intervalo);


    tempo = 60;

    acertosTurno = 0;

    passes = 0;

    anuladas = 0;


    const duplaAtual = duplas[indiceDupla];


    document.getElementById("rodadaTopo").textContent = rodada;

    document.getElementById("nomeDuplaAtual").textContent =
        duplaAtual.nome;


    document.getElementById("jogadorPista").textContent =
        jogadorPista.nome;

    document.getElementById("jogadorAdivinha").textContent =
        jogadorAdivinha.nome;


    document.getElementById("acertos").textContent = "0";

    document.getElementById("pulos").textContent = "0";

    document.getElementById("anuladas").textContent = "0";


    document.getElementById("cronometro").textContent =
        "01:00";


    document.getElementById("cronometro")
        .classList.remove("urgente");


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

    const minutos = Math.floor(tempo / 60);

    const segundos = tempo % 60;


    document.getElementById("cronometro").textContent =

        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;


    if (tempo <= 10) {

        document.getElementById("cronometro")
            .classList.add("urgente");

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


    let disponiveis = lista.filter(
        palavra => !palavrasUsadas.includes(palavra)
    );


    if (disponiveis.length === 0) {

        disponiveis = [...lista];

    }


    const palavra =

        disponiveis[
            Math.floor(
                Math.random() * disponiveis.length
            )
        ];


    palavrasUsadas.push(palavra);


    document.getElementById("palavra").textContent =
        palavra;


    indiceDificuldade++;


    if (indiceDificuldade >= 3) {

        indiceDificuldade = 0;

    }

}


/* =====================================================
   ACERTOU
   PONTO VAI PARA A DUPLA
===================================================== */

btnAcertou.addEventListener("click", () => {

    if (tempo <= 0) return;


    const duplaAtual = duplas[indiceDupla];


    duplaAtual.rodadas[rodada - 1]++;

    duplaAtual.total++;


    acertosTurno++;


    document.getElementById("acertos").textContent =
        acertosTurno;


    novaPalavra();

});


/* =====================================================
   PULAR
===================================================== */

btnPular.addEventListener("click", () => {

    if (tempo <= 0) return;

    if (passes >= 3) return;


    passes++;


    document.getElementById("pulos").textContent =
        passes;


    if (passes >= 3) {

        btnPular.disabled = true;

    }


    novaPalavra();

});


/* =====================================================
   PALAVRA ANULADA
   NÃO DÁ PONTO E NÃO CONTA COMO PULO
===================================================== */

btnAnular.addEventListener("click", () => {

    if (tempo <= 0) return;


    anuladas++;


    document.getElementById("anuladas").textContent =
        anuladas;


    novaPalavra();

});


/* =====================================================
   FINALIZAR TURNO
===================================================== */

function finalizarTurno() {

    clearInterval(intervalo);

    tempo = 0;


    document.getElementById("cronometro").textContent =
        "00:00";


    document.getElementById("cronometro")
        .classList.remove("urgente");


    btnAcertou.disabled = true;
    btnPular.disabled = true;
    btnAnular.disabled = true;


    /* PRIMEIRO TURNO:
       TROCA OS PAPÉIS DA MESMA DUPLA */

    if (vezAtual === 1) {

        const antigoPista = jogadorPista;
        const antigoAdivinha = jogadorAdivinha;


        document.getElementById("jogadorSai").textContent =
            antigoAdivinha.nome;

        document.getElementById("jogadorEntra").textContent =
            antigoPista.nome;


        document.getElementById("mensagemTroca").textContent =
            "Agora os jogadores trocam de função e a dupla continua jogando.";


        mostrarTela("trocaDuplaTela");

        return;
    }


    /* SEGUNDO TURNO TERMINOU */

    prepararTrocaDeDupla();

}


/* =====================================================
   TROCAR FUNÇÕES DA DUPLA
===================================================== */

btnTrocarTurno.addEventListener("click", () => {

    const temporario = jogadorPista;

    jogadorPista = jogadorAdivinha;

    jogadorAdivinha = temporario;


    vezAtual = 2;


    iniciarTurno();

});


/* =====================================================
   PAUSA ENTRE DUPLAS
===================================================== */

function prepararTrocaDeDupla() {

    clearInterval(intervalo);


    const duplaAnterior = duplas[indiceDupla];

    const proxima = duplas[indiceDupla + 1];


    document.getElementById("duplaAnterior").textContent =

        `${duplaAnterior.nome}: ` +
        duplaAnterior.jogadores
            .map(jogador => jogador.nome)
            .join(" + ");


    if (proxima) {

        document.getElementById("proximaDupla").textContent =

            `${proxima.nome}: ` +
            proxima.jogadores
                .map(jogador => jogador.nome)
                .join(" + ");


        mostrarTela("trocaProximaDuplaTela");

    } else {

        finalizarRodada();

    }

}


/* =====================================================
   PRÓXIMA DUPLA
===================================================== */

btnProximaDupla.addEventListener("click", () => {

    indiceDupla++;

    iniciarDupla();

});


/* =====================================================
   FINALIZAR RODADA
===================================================== */

function finalizarRodada() {

    clearInterval(intervalo);


    mostrarResultado();


}


/* =====================================================
   MOSTRAR RESULTADO
===================================================== */

function mostrarResultado() {

    const container =
        document.getElementById("resultadoContainer");


    container.innerHTML = "";


    const ranking = [...duplas].sort(
        (a, b) => b.total - a.total
    );


    ranking.forEach((dupla, index) => {

        const item = document.createElement("div");

        item.className = "resultado-item";


        if (index === 0) {

            item.classList.add("primeiro");

        }


        item.innerHTML = `

            <div>

                <span>${dupla.nome}</span>

                <small>
                    ${dupla.jogadores[0].nome}
                    +
                    ${dupla.jogadores[1].nome}
                </small>

                <small>
                    R1: ${dupla.rodadas[0]} |
                    R2: ${dupla.rodadas[1]} |
                    R3: ${dupla.rodadas[2]}
                </small>

            </div>

            <strong>${dupla.total} pts</strong>

        `;


        container.appendChild(item);

    });


    if (rodada < totalRodadas) {

        document.getElementById("tituloResultado").textContent =
            `FIM DA RODADA ${rodada}!`;

        document.getElementById("subtituloResultado").textContent =
            "Confira o placar acumulado e prepare-se para a próxima rodada.";

        btnContinuar.textContent =
            "PRÓXIMA RODADA";

    } else {

        document.getElementById("tituloResultado").textContent =
            "FIM DO MEGA SHOW!";

        document.getElementById("subtituloResultado").textContent =
            "Confira o resultado final das três rodadas.";

        btnContinuar.textContent =
            "VER DUPLA CAMPEÃ";

    }


    mostrarTela("resultadoTela");

}


/* =====================================================
   CONTINUAR
===================================================== */

btnContinuar.addEventListener("click", () => {

    if (rodada < totalRodadas) {

        rodada++;

        indiceDificuldade = 0;

        prepararRodada();

    } else {

        mostrarCampeao();

    }

});


/* =====================================================
   CAMPEÃ
===================================================== */

function mostrarCampeao() {

    clearInterval(intervalo);


    const maiorPontuacao = Math.max(
        ...duplas.map(dupla => dupla.total)
    );


    const campeas = duplas.filter(
        dupla => dupla.total === maiorPontuacao
    );


    /* CASO TENHA EMPATE */

    if (campeas.length > 1) {

        document.querySelector(".titulo-campeao").textContent =
            "EMPATE!";

        document.getElementById("campeaoNome").textContent =
            campeas.map(dupla => dupla.nome).join(" E ");


        document.getElementById("campeaoJogadores").textContent =
            campeas
                .map(dupla =>
                    dupla.jogadores
                        .map(jogador => jogador.nome)
                        .join(" + ")
                )
                .join("  |  ");


        document.getElementById("campeaoPontos").textContent =
            `${maiorPontuacao} PONTOS`;


    } else {

        const campea = campeas[0];


        document.querySelector(".titulo-campeao").textContent =
            "DUPLA CAMPEÃ";


        document.getElementById("campeaoNome").textContent =
            campea.nome;


        document.getElementById("campeaoJogadores").textContent =
            campea.jogadores
                .map(jogador => jogador.nome)
                .join(" + ");


        document.getElementById("campeaoPontos").textContent =
            `${campea.total} PONTOS`;

    }


    mostrarTela("campeaoTela");

}


/* =====================================================
   NOVO JOGO
===================================================== */

btnNovoJogo.addEventListener("click", () => {

    location.reload();

});

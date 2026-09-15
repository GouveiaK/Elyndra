//Elementos do HTML
const quizInicio = document.getElementById("quizInicio"); const quizJogo = document.getElementById("quizJogo");
const quizResultado = document.getElementById("quizResultado");
const escolhaQuantidade = document.getElementById('escolhaQuantidade');
const btnIniciar = document.getElementById("btnIniciar"); const btnProxima = document.getElementById("btnProxima"); const btnReiniciar = document.getElementById("btnReiniciar");
const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas"); const numeroPergunta = document.getElementById("numeroPergunta");
const pontuacao = document.getElementById("pontuacao"); const resultadoPontuacao = document.getElementById("resultadoPontuacao");

//variáveis do quiz

let perguntas = [];
let perguntasQuiz = [];
let perguntaAtual = 0;
let pontos = 0;
let respostaSelecionada = false;

//Carregar o banco de dados

async function carregarPerguntas() {
    try {
        const resposta = await fetch('../dados/perguntas.json');
        perguntas = await resposta.json();
        console.log('Perguntas carregadas:', perguntas);
    } catch (erro) {
        console.log('Erro ao carregar perguntas:', erro);
    }
}

//embaralhar array

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

//Iniciar o quiz

function iniciarQuiz(indice) {
    perguntaAtual = 0;
    pontos = 0;
    respostaSelecionada = false;

    //copia as perguntas e embaralha
    perguntasQuiz = [...perguntas];
    embaralhar(perguntasQuiz);

    //pegar apenas 10 questões por rodada
    perguntasQuiz = perguntasQuiz.slice(0, indice);

    //Mostrar a tela do jogo
    quizInicio.style.display = 'none';
    quizResultado.style.display = 'none';
    quizJogo.style.display = 'block';


    mostrarPerguntas();
}

//Mostrar Perguntas

function mostrarPerguntas() {
    respostaSelecionada = false;
    const perguntaAtualDados = perguntasQuiz[perguntaAtual];

    //Número de perguntas
    numeroPergunta.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}`;

    //Pontuação
    pontuacao.textContent = `Pontos: ${pontos}`;

    //Texto de pergunta
    pergunta.textContent = perguntaAtualDados.pergunta;

    //Limpa as respostas anteriores
    respostas.innerHTML = '';

    //Copia e embaralha as respostas
    const alternativas = perguntaAtualDados.respostas.map(
        (texto, indice) => ({
            texto: texto,
            indice: indice
        })
    );
    embaralhar(alternativas);

    //Criar os botões
    alternativas.forEach(alternativa => {
        const botao = document.createElement('button');
        botao.classList.add('resposta');
        botao.textContent = alternativa.texto;
        botao.addEventListener('click', () => {
            verificarResposta(
                alternativa.indice,
                botao
            );
        });
        respostas.appendChild(botao);
    });

};

//Verificar Respostas

function verificarResposta(indiceEscolhido, botao) {
    //impedir de escolher mais de uma resposta
    if (respostaSelecionada) {
        return;
    }
    respostaSelecionada = true;
    const perguntaDados = perguntasQuiz[perguntaAtual];
    const respostaCorreta = perguntaDados.correta;
    if (indiceEscolhido === respostaCorreta) {
        pontos++;
        botao.classList.add('correta');
        botao.style.backgroundColor = '#2ECC71';
    } else {
        botao.classList.add('errada');
        botao.style.backgroundColor = '#FF3333'

        //encontrar resposta correta
        const botoes = document.querySelectorAll('.resposta');
        botoes.forEach(botaoResposta => {
            if (botaoResposta.textContent === perguntaDados.respostas[respostaCorreta]) {
                botaoResposta.classList.add('correta');
            }
        });
    };
    pontuacao.textContent = `Pontos: ${pontos}`;
};

//Próxima pergunta

function proximaPergunta() {
    if (!respostaSelecionada) {
        return;
    }
    perguntaAtual++;
    if (perguntaAtual >= perguntasQuiz.length) {
        mostrarResultado();
        return;
    }
    mostrarPerguntas();
}

//Mostrar resultado

function mostrarResultado() {
    quizJogo.style.display = 'none';
    quizResultado.style.display = 'block';

    resultadoPontuacao.textContent = `${pontos} de ${perguntasQuiz.length} pontos`;
}

//Reiniciar

function reiniciarQuiz() {
    // Zera os valores da partida 
    perguntaAtual = 0; pontos = 0; 
    respostaSelecionada = false; 
    // Esconde o resultado 
    quizResultado.style.display = 'none'; 
    // Esconde o jogo 
    quizJogo.style.display = 'none'; 
    // Mostra a tela inicial
    quizInicio.style.display = 'block'; 
    // Mostra o botão "Iniciar Quiz"
    btnIniciar.style.display = ''; 
    // Esconde as opções de quantidade
    escolhaQuantidade.style.display = 'none'; 
    // Limpa a lista da partida anterior 
    perguntasQuiz = [];
}

//Eventos dos botões

btnIniciar.addEventListener('click', () => {
    btnIniciar.style.display = 'none';
    escolhaQuantidade.style.display = 'flex';
});
btnProxima.addEventListener('click', proximaPergunta);
btnReiniciar.addEventListener('click', reiniciarQuiz);

//carregar perguntas ao abrir a página

carregarPerguntas();

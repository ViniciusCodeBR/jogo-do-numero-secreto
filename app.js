let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função genérica para exibir textos em qualquer tag HTML e falar com o ResponsiveVoice
function exibir(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('responsiveVoice' in window) {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

// Define a mensagem inicial que aparece quando o jogo carrega ou reinicia
function mensagemInicial() {
    exibir('h1', 'Jogo do número secreto');
    exibir('p', `Escolha um número de 1 a ${numeroLimite}`);
}

// Inicializa a primeira mensagem
mensagemInicial();

// Função acionada quando o usuário clica no botão "Chutar"
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibir('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibir('p', mensagemTentativas);
        
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibir('p', 'O número secreto é menor');
        } else {
            exibir('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Limpa o conteúdo de texto da caixa de input
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

// Gera um número inteiro aleatório sem repetição até atingir o limite
function gerarNumeroAleatorio() {
    // Se todos os números já foram sorteados, limpa a lista
    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Reseta todas as variáveis e estados para começar uma nova partida
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

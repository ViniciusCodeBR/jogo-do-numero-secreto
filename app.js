let listaDeNumerosSorteados = [];
// Gera o primeiro número secreto da partida (entre 1 e 10)
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
// Inicializa o contador de tentativas do jogador
let tentativas = 1;



// FUNÇÕES DE EXIBIÇÃO E MENSAGENS


// Função genérica para exibir textos em qualquer tag HTML (ex: 'h1', 'p')
function exibir(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Define a mensagem inicial que aparece quando o jogo carrega ou reinicia
function mensagemInicial(){
    exibir('h1', 'Jogo do número secreto');
    exibir('p', 'Escolha um numero de 1 a 10');
}

// Chama a mensagem inicial para exibir na tela logo de cara
mensagemInicial();

// LÓGICA PRINCIPAL DO JOGO

// Função acionada quando o usuário clica no botão "Chutar"
function verificarChute(){
    // Pega o valor digitado pelo usuário no campo de input
    let chute = document.querySelector('input').value;
    
    // Condição: se o usuário acertou o número
    if(chute == numeroSecreto){
        exibir('h1', 'Acertou!');
        
        // Operador ternário para definir se a palavra "tentativa" vai no singular ou plural
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        
        exibir('p', mensagemTentativas);
        
        // Habilita o botão de reiniciar jogo removendo o atributo 'disabled'
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Se o usuário errou, verifica se o chute foi maior ou menor que o número secreto
        if(chute > numeroSecreto){
            exibir('p', 'O numero secreto é menor');
        } else {
            exibir('p', 'O numero secreto é maior');
        }
        // Incrementa 1 tentativa a cada erro
        tentativas++;
    }
    // Limpa o campo de input para o próximo palpite
    limparCampo();
}

// Limpa o conteúdo de texto da caixa de input
function limparCampo(){
    let chute = document.querySelector('input');
    chute.value = '';
}

// Gera um número inteiro aleatório entre 1 e 10
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNalista = listaDeNumerosSorteados.length;

if(quantidadeDeElementosNalista == numeroLimite){
    listaDeNumerosSorteados = [];
}

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Reseta todas as variáveis e estados para começar uma nova partida
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo();                          // Limpa a caixa de texto
    tentativas = 1;                         // Reseta o contador para 1
    mensagemInicial();                      // Restaura as mensagens iniciais
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar novamente
}
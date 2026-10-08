const palavras = [
  "abaco",
  "abafa",
  "abalo",
  "abana",
  "acaso",
  "aceno",
  "achar",
  "acima",
  "acude",
  "adega",
  "adota",
  "afeto",
  "agora",
  "ajuda",
  "alado",
  "aluno",
  "amado",
  "amigo",
  "amora",
  "andar",
  "anexo",
  "antes",
  "apelo",
  "apito",
  "arado",
  "aroma",
  "arroz",
  "artes",
  "asilo",
  "ataca",
  "aviso",
  "aviao",
  "baixa",
  "banco",
  "banho",
  "barco",
  "barro",
  "bater",
  "bebes",
  "beber",
  "bicho",
  "bolsa",
  "bomba",
  "bravo",
  "brisa",
  "burro",
  "caber",
  "cacao",
  "cacto",
  "caixa",
  "calma",
  "calor",
  "campo",
  "canto",
  "capaz",
  "carro",
  "carta",
  "casal",
  "casco",
  "causa",
  "cerca",
  "chave",
  "cheio",
  "choro",
  "cinco",
  "claro",
  "clima",
  "cobra",
  "coisa",
  "colar",
  "comer",
  "conta",
  "copia",
  "corpo",
  "corte",
  "couro",
  "cravo",
  "criar",
  "danca",
  "dardo",
  "deixa",
  "dente",
  "dever",
  "dizer",
  "doido",
  "dores",
  "duplo",
  "exato",
  "falar",
  "falso",
  "fardo",
  "farol",
  "fatal",
  "favor",
  "fecha",
  "feira",
  "festa",
  "ficha",
  "filme",
  "final",
  "firme",
  "focar",
  "folha",
  "forca",
  "forte",
  "frase",
  "fruta",
  "fundo",
  "ganha",
  "gasto",
  "gente",
  "geral",
  "girar",
  "golpe",
  "grato",
  "grito",
  "grupo",
  "gueto",
  "horas",
  "hotel",
  "idoso",
  "igual",
  "jogar",
  "jovem",
  "julho",
  "lagoa",
  "lance",
  "leite",
  "letra",
  "limpo",
  "livro",
  "local",
  "lugar",
  "lutar",
  "magia",
  "manga",
  "marca",
  "massa",
  "medir",
  "menor",
  "mente",
  "mesmo",
  "metro",
  "minha",
  "misto",
  "modos",
  "morar",
  "morte",
  "motor",
  "muito",
  "mundo",
  "nadar",
  "navio",
  "negar",
  "nervo",
  "ninho",
  "noite",
  "norte",
  "nossa",
  "nuvem",
  "olhar",
  "ontem",
  "ordem",
  "pacto",
  "padre",
  "papel",
  "parar",
  "parte",
  "passo",
  "pedra",
  "peixe",
  "perto",
  "piano",
  "pista",
  "plano",
  "poder",
  "ponto",
  "porta",
  "praia",
  "prato",
  "preto",
  "pulso",
  "quase",
  "raiva",
  "ratos",
  "risco",
  "rosto",
  "roupa",
  "saber",
  "salto",
  "santo",
  "secar",
  "sinal",
  "sonho",
  "sorte",
  "suave",
  "tempo",
  "terra",
  "texto",
  "tigre",
  "tirar",
  "torre",
  "trava",
  "trevo",
  "valor",
  "verde",
  "vidro",
  "vinho",
  "virar",
  "vista",
  "viver",
  "volta",
];
// --- Estado do Jogo ---
let posicao = 0;
let palavra = "";
let palavraCorreta = "";

// Elementos do DOM
const letras = document.querySelectorAll(".letra");

// --- Funções Principais ---

function buscarPalavra() {
  const indice = Math.floor(Math.random() * palavras.length);
  palavraCorreta = palavras[indice].toUpperCase();
}

function apagarLetra() {
  if (palavra.length === 0) return;

  posicao--;
  palavra = palavra.slice(0, -1);
  letras[posicao].textContent = "";
}

function adicionarLetra(tecla) {
  if (posicao >= 35 || palavra.length >= 5) return;

  const letra = tecla.toUpperCase();
  letras[posicao].textContent = letra;
  palavra += letra;
  posicao++;
}

function validarTentativa() {
  if (palavra.length < 5) {
    alert("Palavra inválida");
    return;
  }

  const inicioLinha = posicao - 5;
  const acertouTudo = palavra === palavraCorreta;

  // Animação e coloração das letras
  for (let i = inicioLinha; i < inicioLinha + 5; i++) {
    const indiceLetra = i - inicioLinha;
    const letraDigitada = letras[i].textContent;

    setTimeout(() => {
      if (letraDigitada === palavraCorreta[indiceLetra]) {
        letras[i].classList.add("acertou");
      } else if (palavraCorreta.includes(letraDigitada)) {
        letras[i].classList.add("amarelo");
      } else {
        letras[i].classList.add("errou");
      }
    }, indiceLetra * 400);
  }

  if (acertouTudo) {
    for(let i = inicioLinha; i < inicioLinha+5; i++){
      const indiceLetra = i - inicioLinha;
      setTimeout(() => {
        letras[i].classList.add("acertou")
      }, indiceLetra* 400)
      reiniciarAposVitoria()
    }
  } else {
    palavra = "";
    tentativa++;
  }
}

function reiniciarAposVitoria() {
  setTimeout(() => {
    palavra = "";
    posicao = 0;
    tentativa = 0;

    letras.forEach((tecla) => {
      tecla.classList.remove("acertou", "errou", "amarelo");
      tecla.textContent = "";
    });

    buscarPalavra();
  }, 2500);
}

// --- Inicialização ---
buscarPalavra();

// --- Event Listeners ---
document.addEventListener("keydown", (event) => {
  const tecla = event.key;

  if (tecla === "Backspace") {
    apagarLetra();
  } else if (/^[a-z]$/i.test(tecla)) {
    adicionarLetra(tecla);
  } else if (tecla === "Enter") {
    validarTentativa();
  }
});

function processarEntrada(tecla) {
  const letras = document.querySelectorAll(".letra");

  // 1. Tratar a tecla Backspace / Apagar
  if ((tecla === "Backspace" || tecla === "⌫") && palavra.length > 0) {
    posicao--;
    const elementoLetra = letras[posicao];
    palavra = palavra.slice(0, palavra.length - 1);
    elementoLetra.textContent = "";
    return;
  }

  // 2. Tratar a tecla Enter / Confirmar
  if (tecla === "Enter" || tecla === "ENTER") {
    if (palavra.length < 5) {
      alert("Palavra inválida");
      return;
    }

    let inicioLinha = posicao - 5;

    if (palavra === palavraCorreta) {
      // Caso acerte a palavra
      for (let i = inicioLinha; i < inicioLinha + 5; i++) {
        let indiceLetra = i - inicioLinha;
        setTimeout(() => {
          letras[i].classList.add("acertou");
        }, indiceLetra * 400);
      }

      setTimeout(() => {
        palavra = "";
        posicao = 0;
        for (let i = 0; i < letras.length; i++) {
          letras[i].classList.remove("acertou", "errou", "amarelo");
          letras[i].textContent = "";
        }
      }, 2500);
    } else {
      // Caso a palavra esteja incorreta
      for (let i = inicioLinha; i < inicioLinha + 5; i++) {
        const tecla = document.querySelectorAll(".tecla-teclado");
        let indiceLetra = i - inicioLinha;
        let letraDigitada = letras[i].textContent;

        setTimeout(() => {
          if (letraDigitada === palavraCorreta[indiceLetra]) {
            letras[i].classList.add("acertou");
          } else if (palavraCorreta.includes(letraDigitada)) {
            letras[i].classList.add("amarelo");
          } else {
            letras[i].classList.add("errou");
          }
        }, indiceLetra * 400);
      }

      palavra = "";
    }
    return;
  }

  // 3. Tratar a digitação de letras (máximo de 35 espaços e apenas 5 por linha/palavra)
  if (tecla.length === 1 && palavra.length < 5 && posicao < 35) {
    const letraFormatada = tecla.toLowerCase();

    // Filtra para garantir que apenas letras sejam digitadas
    if (/^[a-z]$/i.test(letraFormatada)) {
      const elementoLetra = letras[posicao];
      elementoLetra.textContent = letraFormatada;
      palavra += letraFormatada;
      posicao++;
    }
  }
}

// Ouvinte para o teclado virtual na tela
document.addEventListener("DOMContentLoaded", () => {
  const teclasVirtuais = document.querySelectorAll(".tecla-teclado");

  teclasVirtuais.forEach((botao) => {
    botao.addEventListener("click", () => {
      // Pega o texto do botão (ex: "a", "ENTER", "⌫")
      const valorTecla = botao.textContent.trim();
      processarEntrada(valorTecla);
    });
  });
});

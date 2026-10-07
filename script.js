let posicao = 0;
let palavra = "";
let palavraCorreta = "mamae";
let tentativa = 0;
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace" && palavra.length > 0) {
    posicao--;
    const letras = document.querySelectorAll(".letra");
    const tecla = letras[posicao];
    palavra = palavra.slice(0, palavra.length - 1);
    tecla.textContent = "";
  }
  if (event.key.length === 1 && posicao < 35) {
    const letras = document.querySelectorAll(".letra");
    const tecla = letras[posicao];
    tecla.textContent = event.key;
    palavra += event.key;
    posicao++;
  }
  if (event.key === "Enter" && palavra.length < 5) {
    alert("Palavra invaida");
  } else if (
    event.key === "Enter" &&
    palavra.length === 5 &&
    palavra === palavraCorreta
  ) {
    let inicioLinha = posicao - 5;
    const letras = document.querySelectorAll(".letra");
    for (let i = inicioLinha; i < inicioLinha + 5; i++) {
      let indiceLetra = i - inicioLinha;
      setTimeout(() => {
        letras[i].classList.add("acertou");
      }, indiceLetra * 400);
    }
    setTimeout(() => {
      palavra = "";
      posicao = 200;
      for (let i = 0; i < letras.length; i++) {
        letras[i].classList.remove("acertou");
        letras[i].classList.remove("errou");
        letras[i].classList.remove("amarelo");
        letras[i].textContent = "";
      }
    }, 2500);
  } else if (
    event.key === "Enter" &&
    palavra.length === 5 &&
    palavra !== palavraCorreta
  ) {
    let inicioLinha = posicao - 5;
    const letras = document.querySelectorAll(".letra");
    for (let i = inicioLinha; i < inicioLinha + 5; i++) {
      let indiceLetra = i - inicioLinha; // Sempre varia de 0 a 4
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


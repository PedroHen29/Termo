let posicao = 0;
let palavra = "";
let palavraCorreta = "podam";
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

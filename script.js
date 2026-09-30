const botaoServidor = document.getElementById("copiar-ip");
const mensagemCopiado = document.getElementById("mensagem-copiado");

botaoServidor.addEventListener("click", function () {

    navigator.clipboard.writeText("play.anuroth.com");

    mensagemCopiado.style.visibility = "visible";

    setTimeout(function () {
        mensagemCopiado.style.visibility = "hidden";
    }, 2000);

});

const personagem1 = document.querySelector(".personagem-1");

if (personagem1) {

    personagem1.addEventListener("click", function (e) {

        if (window.innerWidth <= 768) {
            e.stopPropagation();
            personagem1.classList.toggle("ativo");
        }

    });

    document.addEventListener("click", function () {

        if (window.innerWidth <= 768) {
            personagem1.classList.remove("ativo");
        }

    });

}

const telas = document.querySelectorAll(".tela");

let telaAtual = 0;
let rolando = false;
let inicioToque = 0;

function atualizarTelaAtual() {

    let menorDistancia = Infinity;

    telas.forEach(function (tela, index) {

        const distancia = Math.abs(tela.getBoundingClientRect().top);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            telaAtual = index;
        }

    });

}

function irParaTela(index) {

    if (index < 0 || index >= telas.length || rolando) {
        return;
    }

    rolando = true;
    telaAtual = index;

    telas[telaAtual].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(function () {
        rolando = false;
    }, 700);

}

window.addEventListener("wheel", function (e) {

    e.preventDefault();

    if (rolando) {
        return;
    }

    atualizarTelaAtual();

    if (e.deltaY > 0) {
        irParaTela(telaAtual + 1);
    } else if (e.deltaY < 0) {
        irParaTela(telaAtual - 1);
    }

}, { passive: false });

window.addEventListener("touchstart", function (e) {

    inicioToque = e.touches[0].clientY;

}, { passive: true });

window.addEventListener("touchend", function (e) {

    if (rolando) {
        return;
    }

    const fimToque = e.changedTouches[0].clientY;
    const distancia = inicioToque - fimToque;

    if (Math.abs(distancia) < 50) {
        return;
    }

    atualizarTelaAtual();

    if (distancia > 0) {
        irParaTela(telaAtual + 1);
    } else {
        irParaTela(telaAtual - 1);
    }

}, { passive: true });

window.addEventListener("scroll", function () {

    if (!rolando) {
        atualizarTelaAtual();
    }

});

window.addEventListener("keydown", function (e) {

    if (rolando) {
        return;
    }

    atualizarTelaAtual();

    if (e.key === "ArrowDown") {

        e.preventDefault();
        irParaTela(telaAtual + 1);

    } else if (e.key === "ArrowUp") {

        e.preventDefault();
        irParaTela(telaAtual - 1);

    }

});
const $valorAnterior = document.getElementById('valor-anterior'),
$valorActual = document.getElementById('valor-actual'),
$numeros = document.querySelectorAll('.numero'),
$operadores = document.querySelectorAll('.operador');


class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    dividir(num1, num2) {
        return num1 / num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }
} 

class Display {
    constructor($valorAnterior, $valorActual){
        this.$valorActual = $valorActual;
        this.$valorAnterior = $valorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-'
        }
    }

    borrar() {
        this.valorActual = this.valorActual.slice(0, -1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    agregarNumero(num) {
        if(num === '.' && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual + num;
        this.imprimirValores();
    }

    imprimirValores() {
        this.$valorActual.textContent = this.valorActual;
        this.$valorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior)) return
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }
}

const display = new Display($valorAnterior, $valorActual);

$numeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML))
})

$operadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value))
})
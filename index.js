/**
 * Seletor de elementos da página
 */
let $ = document.querySelector.bind(document);


function alternarFormulario() {
    let formulario = document.getElementById('formularioLancamento');
    let display = formulario.style.display;
    formulario.style.display = display === 'block' ? 'none' : 'block';

    let botaoNovoLancamento = document.getElementById('novoLancamento');
    let texto = botaoNovoLancamento.firstChild;
    texto.data =
        texto.data.trim() === 'Esconder' ? 'Novo lançamento' : 'Esconder';
}

/**
 * Tratativa de lançamentos
 */

let lancamentosArmazenados = localStorage.getItem('lancamentos');
let lancamentos =
    lancamentosArmazenados ? JSON.parse(lancamentosArmazenados) : [];
renderizarLancamentos();

function lancar(event) {
    event.preventDefault();

    let lancamento = {
        valor: parseFloat($('#valor').value),
        descricao: $('#descricao').value,
        dataLancamento: $('#dataLancamento').value,
    };

    lancamentos.push(lancamento);
    armazenarLancamentos();
    limparFormulario();
    renderizarLancamentos();
    $('#valor').focus();
}

function armazenarLancamentos() {
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
}

function limparFormulario() {
    $('#valor').value = '';
    $('#descricao').value = '';
    $('#dataLancamento').value = '';
}

function renderizarLancamentos() {
    if (lancamentos) {
        let htmlLancamentos = '';
        let dinheiroEmCaixa = 0;

        for (let i = lancamentos.length - 1; i > -1; i--) {
            let lancamento = lancamentos[i];

            let valor = lancamento.valor;
            dinheiroEmCaixa += valor;
            let classeLancamento = valor > 0 ? 'entrada' : 'gasto';
            let imagemLancamento = valor > 0 ? 'mais.png' : 'menos.png';

            valor = valor.toLocaleString(undefined, {
                minimumFractionDigits: 2
            });

            let dataLancamento =
                new Date(lancamento.dataLancamento).toLocaleDateString();

            let html = `
                <div class="blocoLancamento">
                    <img src="img/${imagemLancamento}" alt="${classeLancamento}">

                    <div class="descricaoLancamento">
                        <span class="valor ${classeLancamento}">R$ ${valor}</span>
                        <span>${dataLancamento}</span>
                        <span>${lancamento.descricao}</span>
                    </div>
                </div>
            `;

            htmlLancamentos += html;
        }

        $('#areaLancamentos').innerHTML = htmlLancamentos;
        renderizarDinheiroEmCaixa(dinheiroEmCaixa);
    }
}

function renderizarDinheiroEmCaixa(dinheiroEmCaixa) {
    let renda = dinheiroEmCaixa.toLocaleString(undefined, {
        minimumFractionDigits: 2
    });
    $('#renda').innerText = `R$ ${renda}`;

    let cor = 'black';
    if (dinheiroEmCaixa > 0) {
        cor = 'blue';
    } else if (dinheiroEmCaixa < 0) {
        cor = 'red';
    }
    $('#renda').style.color = cor;
}
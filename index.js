function alternarFormulario() {
    let formulario = document.getElementById('formularioLancamento');
    let display = formulario.style.display;
    formulario.style.display = display === 'block' ? 'none' : 'block';

    let botaoNovoLancamento = document.getElementById('novoLancamento');
    let texto = botaoNovoLancamento.firstChild;
    texto.data =
        texto.data.trim() === 'Esconder' ? 'Novo lançamento' : 'Esconder';
}
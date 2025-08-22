    // Seleciona o formulário pelo ID (não cria ID novo, apenas "pega" o elemento que já existe no HTML)
    const form = document.getElementById('form-atividade');

    // Imagens em formato de string para mostrar dentro da tabela (HTML que será inserido no innerHTML)
    const imgAprovado  = '<img src="./Images/aprovado.png"  alt="Emoji celebrando" />';
    const imgReprovado = '<img src="./Images/reprovado.png" alt="Emoji decepcionado" />';

    // Arrays servem para guardar vários valores em uma variável só
    // Aqui guardamos os nomes das atividades e as notas digitadas
    const atividades = [];
    const notas = [];

    // Spans prontos em formato HTML para mostrar o resultado final (aprovado ou reprovado)
    const spanAprovado  = '<span class="resultado aprovado">Aprovado</span>';
    const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

    // Pede ao usuário a nota mínima pelo prompt
    // Depois converte vírgula para ponto e transforma em número com parseFloat
    let notaMinima = prompt('Digite a nota mínima:');
    notaMinima = parseFloat(String(notaMinima).replace(',', '.'));

    // Caso o usuário digite algo inválido ou cancele, define 7 como padrão
    if (isNaN(notaMinima) || notaMinima < 0 || notaMinima > 10) notaMinima = 7;

    // Variável para acumular as linhas <tr> que serão exibidas dentro do <tbody>
    let linhas = '';

    // Escuta o evento de submit (quando o formulário for enviado)
    // addEventListener serve para "ouvir" eventos e rodar a função quando o evento acontece
    form.addEventListener('submit', function (e) {
    e.preventDefault(); // impede que o form recarregue a página (comportamento padrão)
    adicionaLinha();    // adiciona uma nova linha na tabela
    atualizaTabela();   // atualiza o tbody com todas as linhas acumuladas
    atualizaMediaFinal(); // calcula a média e mostra se está aprovado ou reprovado
    });

    // Função que pega os valores dos inputs, valida e monta uma linha <tr>
    function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // .trim() remove espaços extras
    const nome = String(inputNomeAtividade.value).trim();

    // Troca vírgula por ponto e converte para número com parseFloat
    const notaStr = String(inputNotaAtividade.value).replace(',', '.');
    const notaNum = parseFloat(notaStr);

    // Validações básicas
    if (!nome) {
        alert('Informe o nome da atividade.');
        return; // para a função se não tiver nome
    }
    if (atividades.includes(nome)) {
        // includes verifica se já existe dentro do array
        alert(`A atividade "${nome}" já foi inserida.`);
        return;
    }
    if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
        alert('Informe uma nota válida entre 0 e 10.');
        return;
    }

    // Guarda os dados nos arrays para usar depois (ex.: cálculo da média)
    atividades.push(nome);
    notas.push(notaNum);

    // Monta a linha da tabela com <tr> e <td>
    let linha = '<tr>';
    linha += `<td>${nome}</td>`;
    linha += `<td>${notaNum.toFixed(2)}</td>`; // toFixed(2) = 2 casas decimais
    linha += `<td>${notaNum >= notaMinima ? imgAprovado : imgReprovado}</td>`; // operador ternário
    linha += '</tr>';

    // Acumula a nova linha no "buffer" de linhas
    linhas += linha;

    // Limpa os inputs para próxima digitação
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
    }

    // Função que insere as linhas acumuladas no <tbody> da tabela
    // innerHTML serve para escrever HTML dentro de um elemento
    function atualizaTabela() {
    document.querySelector('tbody').innerHTML = linhas;
    }

    // Função que calcula a média final e mostra no HTML
    function atualizaMediaFinal() {
    const media = calculaMediaFinal();

    // Se não houver notas, mostra "-" em vez de NaN
    document.getElementById('media-final-valor').innerHTML = isNaN(media) ? '-' : media.toFixed(2);

    // Mostra aprovado ou reprovado com base na média final
    document.getElementById('media-final-resultado').innerHTML = (!isNaN(media) && media >= notaMinima) ? spanAprovado : spanReprovado;
    }

// Função que faz a soma de todas as notas e divide pelo total (média aritmética)
// reduce percorre o array e soma cada elemento
function calculaMediaFinal() {
  if (notas.length === 0) return NaN; // se não tem notas, não calcula
    return notas.reduce((acc, n) => acc + n, 0) / notas.length;
}
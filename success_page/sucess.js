// URL da API
const apiUrl = "https://forge.withub.ai/api/triggers/5257a02d-c19b-4969-ab81-2206de86082c/execute/66eebf1152aefaaa229de11a";

// Dados que você quer enviar
const data = {
    prato: "canjiquinha"
};

// Fazendo a requisição POST para a API
fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.text()) // Aqui pegamos o resultado como texto puro
.then(text => {
    console.log('Resposta completa da API:', text); // Exibe o resultado completo da API como texto

    // Seleciona o elemento onde os dados serão exibidos
    const resultadoDiv = document.getElementById('resultado');

    // Usando expressão regular para extrair o campo 'historia'
    const regex = /"historia":"(.*?)"/; // Expressão regular para capturar o conteúdo de 'historia'
    const match = text.match(regex); // Executa a expressão regular na string de resposta

    if (match && match[1]) {
        let historia = match[1]; // O conteúdo da 'historia' está no primeiro grupo de captura

        // Remove as referências no formato [n]
        historia = historia.replace(/\[\d+\]/g, '').trim(); // Remove todas as referências como [1], [2], etc.

        // Exibe a história formatada no HTML
        resultadoDiv.innerHTML = `
            <h2>História do Prato: ${data.prato}</h2>
            <p>${historia}</p>
        `;
    } else {
        resultadoDiv.innerHTML = `<p>História não encontrada.</p>`; // Caso a história não seja encontrada
    }
})
.catch(error => {
    console.error('Erro:', error); // Exibe erros se ocorrerem
});

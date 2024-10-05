// URL da API
const apiUrl = "https://forge.withub.ai/api/triggers/5257a02d-c19b-4969-ab81-2206de86082c/execute/66eebf1152aefaaa229de11a";

// Dados que você quer enviar
const data = {
    prato: "feijão tropeiro" // Aqui está o dado 'prato' que está sendo enviado
};

// Fazendo a requisição POST para a API
fetch(apiUrl, {
    method: 'POST', // Método HTTP POST
    headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(data) // Converte os dados para JSON e envia no corpo da requisição
})
.then(response => response.json()) // Converte a resposta da API para JSON
.then(data => {
    console.log('Sucesso:', data); // Exibe os dados recebidos da API
})
.catch(error => {
    console.error('Erro:', error); // Captura e exibe qualquer erro que ocorrer
});

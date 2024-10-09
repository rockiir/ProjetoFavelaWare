// URL da API que será utilizada para enviar os dados
const apiUrl = "https://forge.withub.ai/api/triggers/5257a02d-c19b-4969-ab81-2206de86082c/execute/66eebf1152aefaaa229de11a";

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão e o input do HTML usando seus IDs
    const enviarButton = document.getElementById('enviarButton'); // Seleciona o botão de enviar
    const pratoInput = document.getElementById('pratoInput'); // Seleciona o campo de input onde o usuário digita o nome do prato

    // Adiciona um evento ao botão que será acionado quando ele for clicado
    enviarButton.addEventListener('click', () => {
        // Coleta o valor digitado no input e armazena na variável 'prato'
        const prato = pratoInput.value;

        // Cria um objeto 'data' que contém a informação que será enviada para a API
        const data = {
            prato: prato // Usa o valor do input na variável 'data' na propriedade 'prato'
        };

        // Fazendo a requisição POST para a API
        fetch(apiUrl, {
            method: 'POST', // Define o método da requisição como POST
            headers: {
                'Content-Type': 'application/json', // Especifica que o corpo da requisição será em formato JSON
            },
            // Converte o objeto 'data' para uma string JSON e a envia como corpo da requisição
            body: JSON.stringify(data)
        })
        // Quando a API responde, a resposta é tratada como texto
        .then(response => response.text())
        // Processa a resposta da API
        .then(text => {
            console.log('Resposta completa da API:', text); // Exibe a resposta completa no console para depuração

            // Seleciona o elemento onde a resposta será exibida
            const resultadoDiv = document.querySelector('.resultado-content'); // Corrigido para selecionar o conteúdo da seção resultado
            
            // Define uma expressão regular para buscar o campo 'historia' na resposta
            const regex = /"historia":"(.*?)"/; // Captura o conteúdo da propriedade 'historia'
            const match = text.match(regex); // Aplica a expressão regular na resposta para encontrar a 'historia'

            // Verifica se a 'historia' foi encontrada
            if (match && match[1]) {
                let historia = match[1]; // Armazena o conteúdo da 'historia' se encontrado

                // Remove referências no formato [n] da história
                historia = historia.replace(/\[\d+\]/g, '').trim(); // Remove todas as referências como [1], [2], etc.

                // Exibe a história formatada no HTML
                resultadoDiv.innerHTML = `
                    <h2>Curiosidade do Prato ${data.prato}</h2>
                    <p>${historia}</p>
                `;
            } else {
                // Se a história não for encontrada, exibe uma mensagem informativa
                resultadoDiv.innerHTML = `<p>História não encontrada.</p>`;
            }
        })
        // Captura qualquer erro que ocorra durante a requisição
        .catch(error => {
            console.error('Erro:', error); // Exibe o erro no console
        });
    });
});

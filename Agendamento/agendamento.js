// Codigo funcional!

const SUPABASE_URL = 'https://qhidbohsvqkchunrreiz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWRib2hzdnFrY2h1bnJyZWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2OTQxNTcsImV4cCI6MjA0MjI3MDE1N30.hMO6dQ48AUWO1Ggf3fFceHVPe5sYtIS0OPY4FwMfwkw';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para buscar os espaços do banco de dados
async function espacos() {
    console.log('Buscando espaços do banco de dados...');  // Log para saber se a função foi chamada
    const { data: espacos, error } = await _supabase
        .from('espaco')  // Nome correto da tabela
        .select('*');     // Seleciona todas as colunas

    if (error) {
        console.error('Erro ao buscar espaços:', error);  // Mostra o erro, se existir
        return;
    }

    if (espacos.length === 0) {
        console.warn('Nenhum espaço foi encontrado no banco de dados.');  // Verifica se os dados estão vazios
    } else {
        console.log('Espaços encontrados:', espacos);  // Exibe os dados no console para verificar o conteúdo
    }

    // Chama a função para exibir os espaços
    mostrarespacos(espacos);
}

// Função para criar e exibir os cards
function mostrarespacos(espacos) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Limpa o container antes de exibir novos cards

    espacos.forEach(espaco => {
        console.log('Renderizando espaço:', espaco);  // Log para cada espaço renderizado
        
        // Cria o card
        const card = document.createElement('div');
        card.className = 'card';
        
        // Título do espaço
        const titulo = document.createElement('h2');
        titulo.textContent = espaco.nome;
        card.appendChild(titulo);
        
        // Descrição do espaço
        const descricao = document.createElement('p');
        descricao.textContent = espaco.descricao;
        card.appendChild(descricao);
        
        // Preço por hora do espaço
        const preco = document.createElement('p');
        preco.className = 'preco';
        preco.textContent = `Preço por hora: R$ ${espaco.preco_hora}`;
        card.appendChild(preco);
        
        // Imagem do espaço
        const img = document.createElement('img');
        img.src = espaco.image || 'https://via.placeholder.com/300'; // Coloca uma imagem placeholder caso img seja nulo
        img.alt = `Imagem de ${espaco.image}`;
        img.style.width = '100%'; // Ajuste o tamanho da imagem como desejar
        card.appendChild(img);
        

        
        const link = document.createElement("a");
        link.href = "../formulario_reserva/reserva.html"; // Adiciona o link ao botão
        link.target = "_blank"; // Abre o link em uma nova aba
    
        const button = document.createElement("button");
        button.className = "button";
        button.textContent = "Saiba mais";
    
    
        link.appendChild(button);
        card.appendChild(link);
    
        // Adiciona o card ao container
        cardContainer.appendChild(card);
      });
    }
    



// Chama a função para buscar e mostrar os espaços ao carregar a página
window.onload = espacos;  // Corrigi o nome da função para 'espacos'

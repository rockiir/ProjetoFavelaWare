// URL e chave de acesso anônima do projeto Supabase
const SUPABASE_URL = 'https://qhidbohsvqkchunrreiz.supabase.co'; // URL da instância do Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWRib2hzdnFrY2h1bnJyZWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2OTQxNTcsImV4cCI6MjA0MjI3MDE1N30.hMO6dQ48AUWO1Ggf3fFceHVPe5sYtIS0OPY4FwMfwkw'; // Chave de acesso anônima do Supabase

// Cria uma instância do cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); // Conecta ao Supabase usando a URL e a chave fornecidas

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const { error } = await _supabase.auth.signOut();
                if (error) throw error;

                alert('Deslogado com sucesso!');
                window.location.href = '../index.html';
            } catch (error) {
                console.error('Erro ao deslogar:', error.message);
                alert('Erro ao deslogar: ' + error.message);
            }
        });
    }
});

async function checkAuth() {
    const { data: { session }, error } = await _supabase.auth.getSession();
    if (error) {
        console.error("Erro ao verificar a sessão:", error);
        alert("Erro ao verificar a sessão.");
        return;
    }
    if (!session) {
        window.location.href = '../login_cadastro/login.html'; // Redireciona para a página de login se não estiver autenticado
    }
}

// Adiciona a verificação de autenticação ao carregar a página
window.addEventListener('load', async () => {
    await checkAuth();
    getData(); // Só chama getData se o usuário estiver autenticado
});

// Função para buscar os espaços do banco de dados
async function espacos() {
    console.log('Buscando espaços do banco de dados...');  // Log para confirmar que a função foi chamada corretamente
    
    // Faz a requisição ao banco de dados Supabase
    const { data: espacos, error } = await _supabase
        .from('espaco')  // Nome da tabela 'espaco' no banco de dados
        .select('*');     // Seleciona todas as colunas da tabela

    // Verifica se houve algum erro na consulta
    if (error) {
        console.error('Erro ao buscar espaços:', error);  // Se houver erro, ele é mostrado no console
        return;  // Sai da função se ocorreu erro
    }

    // Verifica se a consulta não retornou nenhum espaço
    if (espacos.length === 0) {
        console.warn('Nenhum espaço foi encontrado no banco de dados.');  // Aviso caso a consulta não tenha retornado dados
    } else {
        console.log('Espaços encontrados:', espacos);  // Mostra os dados retornados no console
    }

    // Chama a função para exibir os espaços encontrados
    mostrarespacos(espacos);  // Envia os dados para a função que vai exibir os cards na página
}

// Função para criar e exibir os cards com os dados dos espaços
function mostrarespacos(espacos) {
    const cardContainer = document.getElementById('cardContainer'); // Seleciona o container HTML onde os cards serão inseridos
    cardContainer.innerHTML = ''; // Limpa o container para evitar duplicação de cards na página

    // Itera por cada espaço retornado pela consulta
    espacos.forEach(espaco => {
        console.log('Renderizando espaço:', espaco);  // Log para mostrar cada espaço enquanto é renderizado
        
        // Cria um div para o card do espaço
        const card = document.createElement('div');
        card.className = 'card';  // Adiciona a classe CSS 'card' ao elemento criado
        
        // Cria o título do card e adiciona o nome do espaço
        const titulo = document.createElement('h2');
        titulo.textContent = espaco.nome;  // Define o conteúdo de texto como o nome do espaço
        card.appendChild(titulo);  // Adiciona o título ao card
        
        // Cria o parágrafo de descrição do espaço
        const descricao = document.createElement('p');
        descricao.textContent = espaco.descricao;  // Define o conteúdo de texto como a descrição do espaço
        card.appendChild(descricao);  // Adiciona a descrição ao card
        
        // Cria o parágrafo para o preço por hora
        const preco = document.createElement('p');
        preco.className = 'preco';  // Adiciona a classe CSS 'preco' ao elemento
        preco.textContent = `Preço por hora: R$ ${espaco.preco_hora}`;  // Define o texto com o valor do preço
        card.appendChild(preco);  // Adiciona o preço ao card
        
        // Cria o elemento de imagem para o espaço
        const img = document.createElement('img');
        img.src = espaco.image || 'https://via.placeholder.com/300'; // Define a imagem ou um placeholder caso a imagem seja nula
        img.alt = `Imagem de ${espaco.image}`;  // Define o texto alternativo para a imagem
        img.style.width = '100%'; // Define o estilo da largura da imagem para 100%
        card.appendChild(img);  // Adiciona a imagem ao card
        
        // Cria o link para o formulário de reserva
        const link = document.createElement("a");
        link.href = "../formulario_reserva/reserva.html"; // Define o link para a página de reserva
        link.target = "_blank"; // Abre o link em uma nova aba
        
        // Cria o botão dentro do link
        const button = document.createElement("button");
        button.className = "button";  // Adiciona a classe CSS 'button' ao elemento
        button.textContent = "Saiba mais";  // Define o texto do botão como "Saiba mais"
        
        // Anexa o botão ao link e o link ao card
        link.appendChild(button);
        card.appendChild(link);
    
        // Adiciona o card completo ao container
        cardContainer.appendChild(card);
      });
}



// Chama a função para buscar e mostrar os espaços ao carregar a página
window.onload = espacos;  // Define a função espacos para ser executada quando a página carregar


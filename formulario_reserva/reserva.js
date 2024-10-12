// Chave de API e URL do Supabase
const SUPABASE_URL = 'https://qhidbohsvqkchunrreiz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWRib2hzdnFrY2h1bnJyZWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2OTQxNTcsImV4cCI6MjA0MjI3MDE1N30.hMO6dQ48AUWO1Ggf3fFceHVPe5sYtIS0OPY4FwMfwkw';

// Inicializa o cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Adiciona o evento de envio ao formulário
document.getElementById('formReserva').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    // Captura os dados dos campos do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const data_inicial = document.getElementById('horario_inicial').value;
    const data_final = document.getElementById('horario_final').value;
    const numero_de_pessoas = document.getElementById('num_pessoas').value;
    const mensagem = document.getElementById('mensagem').value;

    // Captura o valor selecionado no campo de seleção (select)
    const espacoSelecionado = document.getElementById('espaco').value;

    // Verifica qual opção foi selecionada e define o ID correspondente
    let id_espaco;

    if (espacoSelecionado === "Espaço 1") {
        id_espaco = 1;  // ID para Estudio
    } else if (espacoSelecionado === "Espaço 2") {
        id_espaco = 2;  // ID para Centro profissionalizante
    } else if (espacoSelecionado === "Espaço 3") {
        id_espaco = 3;  // ID para Quadra I
    } else if (espacoSelecionado === "Espaço 4") {
        id_espaco = 4;  // ID para Quadra II
    } else {
        alert('Por favor, selecione um espaço válido.');
        return;  // Interrompe a execução se nenhum espaço válido foi selecionado
    }

    // Cria o objeto reserva com os dados e o ID correto do espaço
    const reserva = {
        id_espaco,
        data_inicial,
        data_final,
        nome,
        telefone,
        numero_de_pessoas,
        mensagem
    };

    // Função assíncrona para enviar os dados para o banco de dados
    async function enviarReserva() {
        const { data, error } = await _supabase
            .from('reservas')  // Nome da tabela
            .insert([reserva]); // Envia os dados do objeto 'reserva'

        if (error) {
            console.error('Erro ao enviar reserva:', error);  // Mostra o erro no console
            alert('Erro ao enviar a reserva. Tente novamente.');
        } else {
            console.log('Reserva enviada com sucesso:', data);  // Confirma o sucesso
            alert('Reserva enviada com sucesso!');
        }
    }

    // Chama a função de envio
    enviarReserva();
});
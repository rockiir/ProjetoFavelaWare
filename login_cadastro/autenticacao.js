const SUPABASE_URL = 'https://ckdhsbltxvtbsmpotmsi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZGhzYmx0eHZ0YnNtcG90bXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwOTU4MjgsImV4cCI6MjAyOTY3MTgyOH0.nKe7q6WiLsO0t_CUNu5ESD2KCAREdvxFrO2cI9e09-8';

// Cria a solicitação do cliente Supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('form-login').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login email').value;
    const password = document.getElementById('login-password').value;

    try {
        // Usa a solicitação do cliente Supabase
        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        alert('Login bem-sucedido!');
        // Redirecionar para a página principal já que o acesso foi permitido
        
        window.open ('agendamento.html'); // Alterar para a pagina de agendamentos
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        alert('Erro ao fazer login: ' + error.message);
    } // se caso der erro
});

document.getElementById('form-signup').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email-form').value;
    const password = document.getElementById('signup-password').value;

    try {
        // Usando a solicitação do cliente Supabase
        const { data, error } = await _supabase.auth.signUp({ email, password });
        if (error) throw error;

        alert('Cadastro realizado com sucesso!');
        // Redirecionar para a página de login ou fazer login automaticamente
        window.location.href = 'produtos.html'; // Alterar para a página de login ou principal
    } catch (error) {
        console.error('Erro ao fazer cadastro:', error.message);
        alert('Erro ao fazer cadastro: ' + error.message);
    }
});
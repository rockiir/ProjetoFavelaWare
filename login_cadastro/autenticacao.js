const SUPABASE_URL = 'https://qhidbohsvqkchunrreiz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWRib2hzdnFrY2h1bnJyZWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2OTQxNTcsImV4cCI6MjA0MjI3MDE1N30.hMO6dQ48AUWO1Ggf3fFceHVPe5sYtIS0OPY4FwMfwkw';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('form-login').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // Use a instância do cliente Supabase
        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        alert('Login bem-sucedido!');
        // Redirecionar para a página principal ou mostrar conteúdo protegido
        window.location.href = '../Agendamento/agendamento.html'; // Alterar para a página de produtos ou principal
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        alert('Erro ao fazer login: ' + error.message);
    }
});

document.getElementById('form-signup').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        // Use a instância do cliente Supabase
        const { data, error } = await _supabase.auth.signUp({ email, password });
        if (error) throw error;

        alert('Cadastro realizado com sucesso!');
        // Redirecionar para a página de login ou fazer login automaticamente
        window.location.href = '../Agendamento/agendamento.html'; // Alterar para a página de login ou principal
    } catch (error) {
        console.error('Erro ao fazer cadastro:', error.message);
        alert('Erro ao fazer cadastro: ' + error.message);
    }
});
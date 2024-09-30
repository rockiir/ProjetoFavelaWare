const SUPABASE_URL = "https://qhidbohsvqkchunrreiz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWRib2hzdnFrY2h1bnJyZWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2OTQxNTcsImV4cCI6MjA0MjI3MDE1N30.hMO6dQ48AUWO1Ggf3fFceHVPe5sYtIS0OPY4FwMfwkw";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let editingProductId = null;

async function checkAuth() {
  const {
    data: { session },
    error,
  } = await _supabase.auth.getSession();
  if (error) {
    console.error("Erro ao verificar a sessão:", error);
    alert("Erro ao verificar a sessão.");
    return;
  }
  if (!session) {
    window.location.href = "../login_cadastro/login.html"; // Redireciona para a página de login se não estiver autenticado
  }
}
// CONFERIR PRA ALTERAR DEPOIS, BOTÃO AO CANTO SUPERIOR DIREITO
document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    const { error } = await _supabase.auth.signOut();
    if (error) throw error;

    alert("Deslogado com sucesso!");
    // Redirecionar para a página de login ou principal
    window.location.href = "../HOME/home.html"; // Alterar para a página de login ou principal
  } catch (error) {
    console.error("Erro ao deslogar:", error.message);
    alert("Erro ao deslogar: " + error.message);
  }
});

// Adiciona a verificação de autenticação ao carregar a página
window.addEventListener("load", async () => {
  await checkAuth();
  getData(); // Só chama getData se o usuário estiver autenticado
});

async function getData() {
  try {
    let { data, error } = await _supabase.from("espaco").select("*");

    if (error) throw error;
    console.log("Dados recebidos:", data);

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    data.forEach((product) => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", product.id);

      row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nome}</td>
                <td>${product.descricao}</td>
                <td>${product.preco_hora}</td> 
                 <td><img src="${product.image}" alt="${product.nome}" width="100"></td>
                <td>
            `;
      productList.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

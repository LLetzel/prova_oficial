import { putRegistro, getRegistroById } from "../api/registrosApi.js";
import { logout } from "../api/auth.js";

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você está deslogado');
        window.location.href = '../login/login.html';
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.tipo !== "prefeitura") {
            alert('Você não tem permissão para acessar essa página');
            window.location.href = '../login/login.html';
        }
    } catch {
        alert('Erro ao carregar dados');
        window.location.href = '../login/login.html'
    }
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        alert("ID do registro não fornecido.");
        window.location.href = "../home/home.html";
        return;
    }

    await renderizarRegistro(id);
            document.getElementById("logout-btn").addEventListener("click", async (e) => {
            e.preventDefault();
            await sair();
            })
});

async function sair() {
    try {
        const response = await logout();

        if (response.status === 200) {
        localStorage.removeItem('token');
        window.location.href = "../login/login.html"
            }
            
        
    } catch (error) {
        console.error(error);
    }
}
async function renderizarRegistro(id) {
    const detailsContainer = document.getElementById("details-container");

    try {
        const item = await getRegistroById(id); 
        console.log("Registro carregado:", item);

        if (!item) {
            detailsContainer.innerHTML = "<p>Registro não encontrado.</p>";
            return;
        }

        let avaliacoesHTML = "";
        if (item.avaliacoes && item.avaliacoes.length > 0) {
            avaliacoesHTML = item.avaliacoes.map(av => `
                <div class="avaliacao-item">
                    <p><strong>Nota:</strong> ${av.nota} ⭐</p>
                    <p>${av.descricao}</p>
                </div>
            `).join("");
        } else {
            avaliacoesHTML = "<p>Sem avaliações disponíveis.</p>";
        }

        detailsContainer.innerHTML = `
            <div id="form" class="details-container">
                <div class="detail-item">
                    <h1>${item.titulo}</h1>
                <div class="detail-item-imagem">
                    <label>Imagem:</label>
                    <img src="http://localhost:3000/uploads/${item.imagem}" alt="${item.titulo}" class="img">
                </div>
                </div>
                <div class="detail-item">
                    <label for="status">Status:</label>
                    <select id="status">
                        <option value="Aguardando">Aguardando</option>
                        <option value="em andamento">Em andamento</option>
                        <option value="Resolvido">Resolvido</option>
                        <option value="avaliado">Avaliado</option>
                    </select>
                </div>
                <div class="detail-item">
                    <label class="descricao">Descrição:</label>
                    <p>${item.descricao}</p>
                </div>
                <div class="detail-item">
                    <label>Data de Criação:</label>
                    <p>${item.data_criacao ? new Date(item.data_criacao).toLocaleDateString() : "Data não disponível"}</p>
                </div>
                <div class="detail-item">
                    <label>Localização</label>
                    <p>${item.localizacao}</p>
                </div>
                

                <div class="avaliacoes">
                    <h2>Avaliações</h2>
                    ${avaliacoesHTML}
                </div>
                <div>
                    <button id="edit-button">Atualizar</button>
                </div>
            </div>
        `;

        const statusSelect = document.getElementById("status");
        statusSelect.value = item.status || "Aguardando";

        const button = document.getElementById("edit-button");
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            const novoStatus = statusSelect.value;

            if (!novoStatus) {
                alert("Por favor, selecione um status.");
                return;
            }

            try {
                await putRegistro(id, { status: statusSelect.value });
                alert("Registro atualizado com sucesso!");
                window.location.href = "../home/home.html";
            } catch (error) {
                console.error("Erro ao atualizar o registro:", error);
                alert("Erro ao atualizar o registro. Tente novamente mais tarde.");
            }
        });

    } catch (error) {
        console.error("Erro ao carregar o registro:", error);
        detailsContainer.innerHTML = "<p>Erro ao carregar o registro. Tente novamente mais tarde.</p>";
    }
}

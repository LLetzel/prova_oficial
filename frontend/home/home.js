import { getRegistros } from '../api/registrosApi.js';
import { logout } from '../api/auth.js';

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você está deslogado');
        window.location.href = '../login/login.html';
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload.nome)
        if (payload.tipo !== "prefeitura") {
            alert('Você não tem permissão para acessar essa página');
            window.location.href = '../login/login.html';
        }
        const nomeDiv = document.getElementById("links");

          nomeDiv.innerHTML += `
            <p class="nome-header">Olá, ${payload.nome}</p>
          `


    } catch {
        alert('Erro ao carregar dados');
        window.location.href = '../login/login.html'
    }

    await carregarRegistros();

    document.getElementById("search-button").addEventListener("click", async (e) => {
        e.preventDefault();
        await filtrarRegistros();
    });

    document.getElementById("botao_de_sair").addEventListener("click", async (e) => {
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


async function carregarRegistros() {
    const registrosContainer = document.getElementById("lista-registros");
    try {
        const registros = await getRegistros();
        renderizarRegistros(registros, registrosContainer);
    } catch (error) {
        console.error("Erro ao carregar os registros:", error);
        registrosContainer.innerHTML = "<p>Erro ao carregar os registros. Tente novamente mais tarde.</p>";
    }
}

async function filtrarRegistros() {
    const registrosContainer = document.getElementById("lista-registros");
    const termo = document.getElementById("search").value.trim().toLowerCase();
    const status = document.getElementById("status").value;
    const data = document.getElementById("date").value;

    try {
        const registros = await getRegistros();
        let filtrados = registros;


        if (termo) {
            filtrados = filtrados.filter(registro =>
                registro.titulo.toLowerCase().includes(termo) ||
                registro.descricao.toLowerCase().includes(termo)
            );
        }


        if (status !== "all") {
            filtrados = filtrados.filter(registro =>
                registro.status.toLowerCase().includes(status.toLowerCase())
            );
        }


        if (data) {
            filtrados = filtrados.filter(registro =>
                registro.data_criacao && registro.data_criacao.startsWith(data)
            );
        }

        if (!filtrados || filtrados.length === 0) {
            registrosContainer.innerHTML = "<p>Nenhum registro encontrado com os filtros selecionados.</p>";
            return;
        }

        renderizarRegistros(filtrados, registrosContainer);

    } catch (error) {
        console.error("Erro ao filtrar os registros:", error);
        registrosContainer.innerHTML = "<p>Erro ao filtrar os registros. Tente novamente mais tarde.</p>";
    }
}

function renderizarRegistros(registros, container) {
    container.innerHTML = "";
    registros.forEach(registro => {
        container.innerHTML += `
    <div class="card">
        <div class="ocorrencia-stats">
            <h3>${registro.titulo}</h3>
            <p class="status">${registro.status}</p>
        </div>
        <p>${registro.descricao}</p>
        <p>${registro.data_criacao ? new Date(registro.data_criacao).toLocaleDateString() : "Data não disponível"}</p>
        <a href="../details/details.html?id=${registro.id}" class="btn-detalhes">Conferir detalhes</a>
    </div>
`;

    });

    document.querySelectorAll('.card').forEach(card => {
        const statusText = card.querySelector('.status')?.textContent?.trim().toLowerCase() || "";
        card.classList.remove('card-aguardando', 'card-andamento', 'card-resolvido');
        if (statusText.includes('aguardando')) {
            card.classList.add('card-aguardando');
        } else if (statusText.includes('em andamento')) {
            card.classList.add('card-andamento');
        } else if (statusText.includes('resolvido')) {
            card.classList.add('card-resolvido');
        }
    });
}


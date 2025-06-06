import { register } from '../api/auth.js';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('login-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirmar-senha');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmaSenha = confirmaSenhaInput.value.trim();

            try {
                if (!nome || !email || !senha || !confirmaSenha) {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }
                if (senha !== confirmaSenha) {
                    alert('As senhas não coincidem.');
                    return;
                }

                const response = await register(nome, email, senha);
                if (response.data) {
                    alert('Cadastro realizado com sucesso');
                    window.location.href = '../login/login.html';
                    }
                    else
                    alert(error.message);
                }
                catch (error) {
                    console.error(error);
                    }
                }

    );
})


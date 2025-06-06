import { login } from "../api/auth.js";

document.addEventListener("DOMContentLoaded", function () {
    localStorage.removeItem('token');
    const loginForm = document.getElementById("login-form");
    const cpfInput = document.getElementById("cpf");
    const senhaInput = document.getElementById("senha");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const cpf = cpfInput.value.trim();
        const senha = senhaInput.value.trim();
        try {
            if (!cpf || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }
            const response = await login(cpf, senha);
            // console.log("Resposta do servidor:", response);
            if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem("token", token);

            window.location.href = "../home/home.html"; 
        } else {
            alert("Erro ao fazer login. Verifique suas credenciais.");
        }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Tente novamente mais tarde.");
            return;
        }
        
    }
    );
});

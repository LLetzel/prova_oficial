export const login = async (cpf, senha) => {
    try {
        return await axios.post('http://localhost:3000/api/auth/login', {
            cpf,
            senha
        });
    } catch (error) {
        console.error('Erro durante o login:', error);
        throw error;
    }
}

export const register = async (nome, cpf, senha) => {
    try {
        return await axios.post('http://localhost:3000/api/auth/register', {
            nome,
            cpf,
            senha
        });
    } catch (error) {
        console.error('Erro durante o registro:', error);
        throw error;
    }
}

export const logout = async () => {
    try {
        return await axios.post('http://localhost:3000/api/auth/logout');
    } catch (error){
        console.error(error.message)
    }
}
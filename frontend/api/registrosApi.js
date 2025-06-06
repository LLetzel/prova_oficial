export const getRegistros = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/ocorrencias/');
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar registros:', error);
        throw error;
    }
}

export const getRegistroById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/ocorrencias/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        });
        return await response.data;
    }
    catch (error) {
        console.error('Erro ao buscar registro:', error);
        throw error;
    }
    }


export const putRegistro = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/ocorrencias/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao atualizar registro:', error);
        throw error;
    }
}   

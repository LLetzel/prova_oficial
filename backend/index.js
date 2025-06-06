const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./config/database.js');
const authRoutes = require('./routes/auth.js');
const ocorrenciasRoutes = require('./routes/ocorrencias.js');
const avaliacoesRoutes = require('./routes/avaliacoes.js');
const multer = require('multer');

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/ocorrencias', ocorrenciasRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

db.connect((err) => {
    if (err) {
        console.error('Conexão falhou:', err);
        return;
    }
    console.log('banco de dados conectado com sucesso');
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
    
});
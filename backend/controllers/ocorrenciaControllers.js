const express = require('express');
const db = require('../config/database');

exports.createOcorrencia = (req, res) => {
    const { usuario_id, titulo, descricao, localizacao } = req.body;
    const imagem = req.file ? req.file.filename : null;
    const query = "INSERT INTO ocorrencias (usuario_id, titulo, descricao, localizacao, imagem) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [usuario_id, titulo, descricao, localizacao, imagem], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "erro ao cadastrar" })
        }
        return res.json(results);
    }
    )
}

exports.getOcorrencias = (req, res) => {
    const query = "SELECT * FROM ocorrencias";
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "erro ao buscar" })
        }
        return res.json(results);
    }
    )
}

exports.updateOcorrencia = (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const query = "UPDATE ocorrencias SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "erro ao atualizar a ocorrencia" })
        }
        return res.json(results);

    }
    )
}

exports.getOcorrenciaById = (req, res) => {
    const ocorrenciaId = req.params.id;

    const ocorrenciaQuery = `SELECT * FROM ocorrencias WHERE id = ?`;

    const avaliacoesQuery = ` SELECT id, descricao, ocorrencia_id, data_avaliacao, nota FROM avaliacoes WHERE ocorrencia_id = ?`;

    db.query(ocorrenciaQuery, [ocorrenciaId], (err, ocorrenciaResults) => {
        if (err) return res.status(500).send(err);
        if (ocorrenciaResults.length === 0) return res.status(404).send({ message: "Ocorrência não encontrada" });

        const ocorrencia = ocorrenciaResults[0];

        db.query(avaliacoesQuery, [ocorrenciaId], (err, avaliacoesResults) => {
            if (err) return res.status(500).send(err);
            ocorrencia.avaliacoes = avaliacoesResults;
            res.send(ocorrencia);
        });
    });
};
const express = require('express');
const db = require('../config/database');

exports.createAvaliacao = (req, res) => {
  const {usuario_id, ocorrencia_id, nota, descricao } = req.body;
  db.query('INSERT INTO avaliacoes (usuario_id, ocorrencia_id, nota, descricao) VALUES (?, ?, ?, ?)', [usuario_id, ocorrencia_id, nota, descricao], (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Avaliacao criada com sucesso' });
  });
};

exports.getAvaliacoes = (req, res) => {
    query = 'SELECT * FROM avaliacoes;'
    db.query(query, (err, results) =>
    {
        if (err) {
            console.log(err);
            return res.status(500).json({message:"Erro ao mostrar as avaliações"})
        }
        return res.json(results)
    }
)
}

exports.getAvaliacoesById = (req,res) => {
    const {id} = req.params;
    const query = "SELECT * FROM avaliacoes WHERE id = ?"

    db.query(query,[id],(err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: "Erro ao mostrar a avaliação"})
            }
            return res.json(results)
    }
    )
}

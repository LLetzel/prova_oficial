const express = require('express');
const db = require('../config/database');
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  const { cpf, senha } = req.body;
  db.query('SELECT * FROM usuarios WHERE cpf = ?', [cpf], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send({ message: 'Autenticação falhou (cpf)' });
    }

    const user = results[0];

    if (user.senha !== senha) {
      return res.status(401).send({ message: 'Autenticação falhou (senha)' });
    }

    const token = jwt.sign(
      { id: user.id, cpf: user.cpf, tipo: user.tipo, nome: user.nome },
      'letzelzinhoeliviazona',
      { expiresIn: '1h' }
    );
    console.log("TOKEN:", token);
    res.send({ token });
  });
};

exports.register = (req, res) => {
    const { nome, cpf, senha } = req.body
    const query = 'INSERT INTO usuarios (nome, cpf, senha) VALUES (?, ?, ?)'
    db.query(query, [nome, cpf, senha], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "erro ao cadastrar" })
        }
        return res.json(results)
    })
}

exports.logout = (req, res) => {
  user = req.user;
  res.send({ 'usuario deslogado com sucesso': req.user });
  };
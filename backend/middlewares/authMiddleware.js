const express  = require('express');
const jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Acesso negado, Token nao encontrado.');
    try {
        const decoded = jwt.verify(token, 'meucodigoultrasecreto-doletzel');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
    
}

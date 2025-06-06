const express = require('express');
const router = express.Router();
const {getAvaliacoes, createAvaliacao, getAvaliacoesById} = require('../controllers/avaliacoesControllers')

router.get('/', getAvaliacoes);
router.post('/', createAvaliacao);
router.get('/:id', getAvaliacoesById);

module.exports = router;
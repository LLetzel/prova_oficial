const express = require('express');
const router = express.Router();
const {createOcorrencia, getOcorrencias, getOcorrenciaById, updateOcorrencia} = require('../controllers/ocorrenciaControllers.js')
const upload = require('../middlewares/upload.js')

router.post('/', upload.single('imagem'), createOcorrencia)
router.get('/', getOcorrencias);
router.get('/:id', getOcorrenciaById);
router.put('/:id',updateOcorrencia);

module.exports = router;
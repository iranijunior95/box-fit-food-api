import express from 'express';

const router = express.Router();

//Rotas Modulo Produtos

router.get('/api/produtos', (req, res) => {
    return res.status(200).json({ message: 'tudo certo produtos'});
});

export default router;
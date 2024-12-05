import express from 'express';

import vendasControllers from '../controllers/vendas.controllers.js';
import vendasMiddleware from '../middlewares/vendas.middleware.js';

const router = express.Router();

router.get('/vendas', async (req, res) => {
    const vendas = await vendasControllers.getAll();

    return vendas.status ? res.status(200).json(vendas) : res.status(400).json(vendas);
});

router.post('/vendas', vendasMiddleware, async (req, res) => {
    return res.status(200).json({ mensagem: 'ok' });
});

export default router;
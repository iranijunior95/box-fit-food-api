import express from 'express';

import produtosControllers from '../controllers/produtos.controllers.js';
import produtosMiddleware from '../middlewares/produtos.middleware.js';

const router = express.Router();

router.get('/produtos', async (req, res) => {
    const produtos = await produtosControllers.getAll();

    return produtos.status ? res.status(200).json(produtos) : res.status(400).json(produtos);
});

router.post('/produtos', produtosMiddleware, async (req, res) => {
    const createdProduto = await produtosControllers.create(req.body);

    if(createdProduto.status) {
        return res.status(201).json(createdProduto);
    }

    return res.status(404).json(createdProduto);
});

router.put('/produtos/:id', produtosMiddleware, async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    const updatedProduto = await produtosControllers.update(id, dados);

    if(updatedProduto.status) {
        return res.status(200).json(updatedProduto);
    }

    return res.status(404).json(updatedProduto);
});

router.delete('/produtos/:id', async (req, res) => {
    const id = req.params.id;
    const deletedProduto = await produtosControllers.deletar(id);

    if(deletedProduto.status) {
        return res.status(200).json(deletedProduto);
    }

    return res.status(404).json(deletedProduto);
});

export default router;
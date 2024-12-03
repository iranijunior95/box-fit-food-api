import express from 'express';

import clientesControllers from '../controllers/clientes.controllers.js';

const router = express.Router();

//Rotas Modulo Clientes

router.get('/api/clientes', async (req, res) => {
    const clientes = await clientesControllers.getAll();

    return res.status(200).json({ status: true, dados: clientes });
});

router.post('/api/clientes', async (req, res) => {
    const clienteCreated = await clientesControllers.create(req.body);

    return res.status(201).json({ status: true, menssagem: "Cliente cadastrado com sucesso!", dados: clienteCreated });
});

export default router;
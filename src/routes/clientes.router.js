import express from 'express';

import clientesControllers from '../controllers/clientes.controllers.js';
import clientesMiddlewares from '../middlewares/clientes.middleware.js';

const router = express.Router();

router.get('/clientes', async (req, res) => {
    const clientes = await clientesControllers.getAll();

    return clientes.status ? res.status(200).json(clientes) : res.status(400).json(clientes);
});

router.get('/clientes/:id', async (req, res) => {
    const id = req.params.id;
    const cliente = await clientesControllers.getById(id);

    return cliente.status ? res.status(200).json(cliente) : res.status(400).json(cliente);
});

router.post('/clientes', clientesMiddlewares, async (req, res) => {
    const clienteCreated = await clientesControllers.create(req.body);

    if(clienteCreated.status) {
        return res.status(201).json(clienteCreated);
    }

    return res.status(404).json(clienteCreated);
});

router.put('/clientes/:id', clientesMiddlewares, async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    const updatedCliente = await clientesControllers.update(id, dados);

    if(updatedCliente.status) {
        return res.status(200).json(updatedCliente);
    }

    return res.status(404).json(updatedCliente);
});

router.delete('/clientes/:id', async (req, res) => {
    const id = req.params.id;
    const deletedCliente = await clientesControllers.deletar(id);

    if(deletedCliente.status) {
        return res.status(200).json(deletedCliente);
    }

    return res.status(404).json(deletedCliente);
});

export default router;
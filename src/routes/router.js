import express from 'express';
import clientesRouter from './clientes.router.js';
import produtosRouter from './produtos.router.js';

const router = express.Router();

router.use(clientesRouter);
router.use(produtosRouter);

export default router;


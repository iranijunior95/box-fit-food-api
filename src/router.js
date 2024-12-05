import express from 'express';
import clientesRouter from './routes/clientes.router.js';
import produtosRouter from './routes/produtos.router.js';
import vendasRouter from './routes/vendas.router.js';

const router = express.Router();

router.use('/api', clientesRouter);
router.use('/api', produtosRouter);
router.use('/api', vendasRouter);

export default router;


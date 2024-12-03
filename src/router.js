import express from 'express';
import clientesRouter from './routes/clientes.router.js';
import produtosRouter from './routes/produtos.router.js';

const router = express.Router();

router.use('/api', clientesRouter);
router.use('/api', produtosRouter);

export default router;


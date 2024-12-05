import vendasModels from '../models/vendas.model.js';

async function getAll() {
    const vendas = await vendasModels.getAll();

    return vendas ? { status: true, dados: vendas } : { status: false, dados: [] };
}

export default {
    getAll
}
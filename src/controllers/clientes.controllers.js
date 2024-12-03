import clientesModel from '../models/clientes.model.js';

async function getAll() {
    return await clientesModel.getAll();
}

async function create({nome, telefone}) {
    return await clientesModel.create({ nome, telefone });
}

export default {
    getAll,
    create
}
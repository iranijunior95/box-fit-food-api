import clientesModel from '../models/clientes.model.js';

async function getAll() {
    const clientes = await clientesModel.getAll();

    return clientes ? { status: true, dados: clientes } : { status: false, dados: [] };
}

async function getById(id) {
    const cliente = await clientesModel.getById(id);

    return cliente ? { status: true, dados: cliente } : { status:false, dados: [] };
}

async function create({nome, telefone}) {
    const createdCliente = await clientesModel.create({ nome, telefone });

    if(createdCliente) {
        return { status: true, mensagem: "Cliente cadastrado com sucesso!", dados: createdCliente };
    }

    return { status: false, mensagem: "Problema ao cadastrar Cliente!", dados: [] };
}

async function update(id, cliente) {
    const updatedCliente = await clientesModel.update(id, cliente);
    
    if(updatedCliente[0].affectedRows === 0) {
        return { status: false, mensagem: "Problema ao alterar Cliente!", dados: [] };
    }
    
    if(updatedCliente) {
        return { status: true, mensagem: "Cliente alterado com sucesso!", dados: updatedCliente[0] }
    }

    return { status: false, mensagem: "Problema ao alterar Cliente!", dados: [] };
}

async function deletar(id) {
    const deletedCliente = await clientesModel.deletar(id);

    if(deletedCliente[0].affectedRows === 0) {
        return { status: false, mensagem: "Problema ao deletar Cliente!", dados: [] };
    }

    if(deletedCliente) {
        return { status: true, mensagem: "Cliente deletado com sucesso!", dados: [] }
    }

    return { status: false, mensagem: "Problema ao deletar Cliente!", dados: [] };
}

export default {
    getAll,
    getById,
    create,
    update,
    deletar
}
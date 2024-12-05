import produtosModel from '../models/produtos.models.js';

async function getAll() {
    const produtos = await produtosModel.getAll();

    return produtos ? { status: true, dados: produtos } : { status: false, dados: [] };
}

async function getById(id) {
    const produto = await produtosModel.getById(id);

    return produto ? { status: true, dados: produto } : { status:false, dados: [] };
}

async function create(produto) {
    const dados = padronizarSchemaDeDadosProdutos(produto);
    const createdProduto = await produtosModel.create(dados);

    if(createdProduto) {
        return { status: true, mensagem: "Produto cadastrado com sucesso!", dados: createdProduto };
    }

    return { status: false, mensagem: "Problema ao cadastrar Produto!", dados: [] };
}

async function update(id, produto) {
    const dados = padronizarSchemaDeDadosProdutos(produto);
    const updatedProduto = await produtosModel.update(id, dados);

    if(updatedProduto[0].affectedRows === 0) {
        return { status: false, mensagem: "Problema ao alterar Produto!", dados: [] };
    }
    
    if(updatedProduto) {
        return { status: true, mensagem: "Produto alterado com sucesso!", dados: updatedProduto[0] }
    }

    return { status: false, mensagem: "Problema ao alterar Produto!", dados: [] };
}

async function deletar(id) {
    const deletedProduto = await produtosModel.deletar(id);

    if(deletedProduto[0].affectedRows === 0) {
        return { status: false, mensagem: "Problema ao deletar Produto!", dados: [] };
    }

    if(deletedProduto) {
        return { status: true, mensagem: "Produto deletado com sucesso!", dados: [] }
    }

    return { status: false, mensagem: "Problema ao deletar Produto!", dados: [] };
}

//Função auxiliar para padronizar entradas create e update
function padronizarSchemaDeDadosProdutos({descricao, valor, quantidade, movimenta_estoque}) {
    const dados = {
        descricao,
        valor: Number(valor),
        quantidade: movimenta_estoque === "sim" ? Number(quantidade) : 0,
        movimenta_estoque
    };

    return dados;
}

export default {
    getAll,
    getById,
    create,
    update,
    deletar
}
import connection from '../config/connection.db.js';

async function getAll() {
    try {
        const produtos = await connection.execute('SELECT * FROM produto WHERE status_produto = "on"'); 
        
        return produtos[0];
    } catch (error) {
        console.log(`Error Get All Produtos: ${error}`);

        return false;
    }
}

async function getById(id) {
    try {
        const produto = await connection.execute('SELECT * FROM produto WHERE id_produto = ? AND status_produto = "on"', [id]);

        return produto[0];
    } catch (error) {
        console.log(`Error Get By Id Produto: ${error}`);

        return false;
    }
}

async function create({descricao, valor, quantidade, movimenta_estoque}) {
    try {
        const query = 'INSERT INTO produto(descricao, valor, quantidade, movimenta_estoque, status_produto) VALUES(?, ?, ?, ?, ?)';
        const createdProduto = await connection.execute(query, [descricao, valor, quantidade, movimenta_estoque, 'on']);
        
        return createdProduto[0];
    } catch (error) {
        console.log(`Error Create Produtos: ${error}`);

        return false;
    }
}

async function update(id, produto) {
    try {
        const { descricao, valor, quantidade, movimenta_estoque } = produto;
        const updatedProduto = await connection.execute('UPDATE produto SET descricao = ?, valor = ?, quantidade = ?, movimenta_estoque = ? WHERE id_produto = ? AND status_produto = "on"', [descricao, valor, quantidade, movimenta_estoque, id]);
        
        return updatedProduto;
    } catch (error) {
        console.log(`Error Update produto: ${error}`);

        return false;
    }
}

async function deletar(id) {
    try {
        const deletedProduto = await connection.execute('UPDATE produto SET status_produto = ? WHERE id_produto = ? AND status_produto = "on"', ["off", id]);

        return deletedProduto;
    } catch (error) {
        console.log(`Error Deletar produto: ${error}`);

        return false;
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    deletar
}
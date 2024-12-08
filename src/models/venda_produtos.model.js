import connection from '../config/connection.db.js';

async function create(lista) {
    try {
        const listaCreated = [];
        const query = 'INSERT INTO venda_produto(valor_unitario, quantidade_venda, venda_id_venda, produto_id_produto) VALUES(?, ?, ?, ?)';

        for (let index = 0; index < lista.length; index++) {
            listaCreated.push(await connection.execute(query, [lista[index].valor_unitario, lista[index].quantidade, lista[index].venda_id_venda, lista[index].produto_id_produto]));
        }

        return listaCreated;
        
    } catch (error) {
        console.log(`Error Create Venda Produtos: ${error}`);

        return false;
    }
}

export default {
    create
}
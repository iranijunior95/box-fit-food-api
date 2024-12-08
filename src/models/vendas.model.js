import connection from '../config/connection.db.js';

async function getAll() {
    try {
        const vendas = await connection.execute('SELECT * FROM venda WHERE status_venda = "on"'); 
        
        return vendas[0];
    } catch (error) {
        console.log(`Error Get All Vendas: ${error}`);

        return false;
    }
}

async function create({ valor_bruto, valor_desconto, valor_total, pagamento, estado, cliente }) {
    try {
        const query = 'INSERT INTO venda(valor_bruto, valor_desconto, valor_total, pagamento, estado, status_venda, cliente_id_cliente) VALUES(?, ?, ?, ?, ?, ?, ?)';
        const createdVenda = await connection.execute(query, [valor_bruto, valor_desconto, valor_total, pagamento, estado, 'on', cliente]);
        
        return createdVenda[0];
    } catch (error) {
        console.log(`Error Create Vendas: ${error}`);

        return false;
    }
}

export default {
    getAll,
    create
}
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

export default {
    getAll
}
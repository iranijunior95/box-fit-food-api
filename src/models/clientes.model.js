import connection from '../config/connection.db.js';

async function getAll() {
    try {
        const clientes = await connection.execute('SELECT * FROM cliente');

        return clientes[0];
    } catch (error) {
        console.log(`Error Get All Clientes: ${error}`);
    }
}

async function create(cliente) {
    try {
        const query = 'INSERT INTO cliente(nome, telefone, status_cliente) VALUES(?, ?, ?)';
        const createdCliente = await connection.execute(query, [cliente.nome, cliente.telefone, 'on']);

        return createdCliente[0];
    } catch (error) {
        console.log(`Error Create Cliente: ${error}`);
    }
}

export default {
    getAll,
    create
}
import connection from '../config/connection.db.js';

//A função GetAll vai buscar apenas os clientes ativos (status: on)
async function getAll() {
    try {
        const clientes = await connection.execute('SELECT * FROM cliente WHERE status_cliente = "on"');

        return clientes[0];
    } catch (error) {
        console.log(`Error Get All Clientes: ${error}`);

        return false;
    }
}

async function getById(id) {
    try {
        const cliente = await connection.execute('SELECT * FROM cliente WHERE id_cliente = ? AND status_cliente = "on"', [id]);

        return cliente[0];
    } catch (error) {
        console.log(`Error Get By Id Cliente: ${error}`);

        return false;
    }
}

async function create(cliente) {
    try {
        const query = 'INSERT INTO cliente(nome, telefone, status_cliente) VALUES(?, ?, ?)';
        const createdCliente = await connection.execute(query, [cliente.nome, cliente.telefone, 'on']);

        return createdCliente[0];
    } catch (error) {
        console.log(`Error Create Cliente: ${error}`);

        return false;
    }
}

async function update(id, cliente) {
    try {
        const { nome, telefone } = cliente;
        const updatedCliente = await connection.execute('UPDATE cliente SET nome = ?, telefone = ? WHERE id_cliente = ? AND status_cliente = "on"', [nome, telefone, id]);
        
        return updatedCliente;
    } catch (error) {
        console.log(`Error Update cliente: ${error}`);

        return false;
    }
}

async function deletar(id) {
    try {
        const deletedCliente = await connection.execute('UPDATE cliente SET status_cliente = ? WHERE id_cliente = ? AND status_cliente = "on"', ["off", id]);

        return deletedCliente;
    } catch (error) {
        console.log(`Error Deletar cliente: ${error}`);

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
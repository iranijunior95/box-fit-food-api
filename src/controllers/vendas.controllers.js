import vendasModels from '../models/vendas.model.js';
import vendaProdutosModel from '../models/venda_produtos.model.js';
import clientesModels from '../models/clientes.model.js';
import produtosModels from '../models/produtos.models.js';

async function getAll() {
    const vendas = await vendasModels.getAll();

    return vendas ? { status: true, dados: vendas } : { status: false, dados: [] };
}

async function create({ valor_bruto, valor_desconto, valor_total, pagamento, estado, cliente, produtos }) {
    if(!await validaSeClienteExiste(cliente)) {
        return { status: false, mensagem: "Problema ao cadastrar venda, cliente não é valido!", dados: [] };
    }
    
    if(!await validaSeProdutosExistem(produtos)) {
        return { status: false, mensagem: "Problema ao cadastrar venda, produto não é valido!", dados: [] };
    }

    const createdVenda = await vendasModels.create({ valor_bruto, valor_desconto, valor_total, pagamento, estado, cliente });

    if(createdVenda === false) {
        return { status: false, mensagem: "Problema ao cadastrar Venda!", dados: [] };
    }
    
    const listaVendaProdutos = retornaListaDeProdutosFormatada(createdVenda.insertId, produtos);
    const createdVendaProdutos = vendaProdutosModel.create(listaVendaProdutos);
    
    if(createdVendaProdutos === false) {
        return { status: false, mensagem: "Problema ao cadastrar Venda!", dados: [] };
    }

    return { status: true, mensagem: "Venda cadastrada com sucesso!", dados: createdVenda };
}

//Funções para auxiliar
async function validaSeClienteExiste(id_cliente) {
    const returnCliente = await clientesModels.getById(id_cliente);

    return returnCliente.length === 0 ? false : true;
}

async function validaSeProdutosExistem(listaProdutos) {
    for (let index = 0; index < listaProdutos.length; index++) {
        const returnProduto = await produtosModels.getById(listaProdutos[index].id_produto);

        if(returnProduto == false) {
            return false;
        }
    }

    return true;
}

function retornaListaDeProdutosFormatada(venda, listaDeProdutos) {
    const listaVendaProduto = [];

    listaDeProdutos.forEach(prod => {
       if(listaVendaProduto.length === 0) {
            listaVendaProduto.push({ 
                valor_unitario: prod.valor_unitario, 
                quantidade: prod.quantidade, 
                venda_id_venda: venda,
                produto_id_produto: prod.id_produto
            });
       }else {
            const localizaProduto = listaVendaProduto.findIndex(p => p.produto_id_produto === prod.id_produto);

            if(localizaProduto < 0) {
                listaVendaProduto.push({ 
                    valor_unitario: prod.valor_unitario, 
                    quantidade: prod.quantidade, 
                    venda_id_venda: venda,
                    produto_id_produto: prod.id_produto
                });
            }else {
                listaVendaProduto[localizaProduto].quantidade += prod.quantidade
            }
       }
    });

    return listaVendaProduto;
}

export default {
    getAll,
    create
}
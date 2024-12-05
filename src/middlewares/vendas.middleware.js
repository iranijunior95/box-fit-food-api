function validate(req, res, next) {
    const { valor_bruto, valor_desconto, valor_total, pagamento, estado, cliente, produtos } = req.body;
    const errors = [];

    //Valida campo valor bruto
    const validaValorBruto = validarCamposMonetarios(valor_bruto, 'valor_bruto', 'Valor Bruto');
    validaValorBruto.length !== 0 ? errors.push(validaValorBruto[0]) : null;
    
    //Valida campo valor desconto
    const validaValorDesconto = validarCamposMonetarios(valor_desconto, 'valor_desconto', 'Valor Desconto');
    validaValorDesconto.length !== 0 ? errors.push(validaValorDesconto[0]) : null;
    
    //Valida campo valor total
    const validaValorTotal = validarCamposMonetarios(valor_total, 'valor_total', 'Valor Total');
    validaValorTotal.length !== 0 ? errors.push(validaValorTotal[0]) : null;
    
    //Valida campo pagamento
    if(pagamento === undefined) {
        errors.push({ campo: 'pagamento', mensagem: 'O campo "Pagamento" é obrigatorio...'});
    }

    if(pagamento === '') {
        errors.push({ campo: 'pagamento', mensagem: 'O campo "Pagamento" não pode ser vazio...'});
    }

    //Valida campo estado
    if(estado === undefined) {
        errors.push({ campo: 'estado', mensagem: 'O campo "Estado Pagamento" é obrigatorio...'});
    }

    if(estado === '') {
        errors.push({ campo: 'estado', mensagem: 'O campo "Estado Pagamento" não pode ser vazio...'});
    }

    //Valida campo id cliente
    if(cliente === undefined) {
        errors.push({ campo: 'cliente', mensagem: 'O campo "Cliente" é obrigatorio...'});
    }

    if(cliente === '') {
        errors.push({ campo: 'cliente', mensagem: 'O campo "Cliente" não pode ser vazio...'});
    }

    if(cliente !== '' & cliente !== undefined & isNaN(cliente)) {
        errors.push({ campo: 'cliente', mensagem: 'O campo "Cliente" precisa ser um valor númerico...'});
    }

    //Valida campo lista de produtos
    if(produtos === undefined) {
        errors.push({ campo: 'produtos', mensagem: 'O campo "Produtos" é obrigatorio...'});
    }

    if(produtos === '') {
        errors.push({ campo: 'produtos', mensagem: 'O campo "Produtos" não pode ser vazio...'});
    }

    if(produtos !== '' & produtos !== undefined & !Array.isArray(produtos)) {
        errors.push({ campo: 'produtos', mensagem: 'O campo "Produtos" precisa ser uma lista...'});
    }

    if(produtos !== '' & produtos !== undefined & Array.isArray(produtos) & produtos.length === 0) {
        errors.push({ campo: 'produtos', mensagem: 'O campo "Produtos" não pode ser uma lista vazia...'});
    }

    return errors.length === 0 ? next() : res.status(400).json({ status: false, errors });
}

function validarCamposMonetarios(valor, campo, mensagem) {
    const errors = [];

    if(valor === undefined) {
        errors.push({ campo, mensagem: `O campo "${mensagem}" é obrigatorio...`});
    }

    if(valor === '') {
        errors.push({ campo, mensagem: `O campo "${mensagem}" não pode ser vazio...`});
    }

    if(valor !== '' & isNaN(valor)) {
        errors.push({ campo, mensagem: `O campo "${mensagem}" precisa ser um valor númerico...`});
    }

    return errors;
}

export default validate;
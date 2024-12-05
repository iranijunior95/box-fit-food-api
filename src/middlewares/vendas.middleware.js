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
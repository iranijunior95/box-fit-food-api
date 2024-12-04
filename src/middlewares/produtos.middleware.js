function validate(req, res, next) {
    const { descricao, valor, quantidade, movimenta_estoque } = req.body;
    const errors = [];

    //Validações campo descrição
    if(descricao === undefined) {
        errors.push({ campo: 'descricao', mensagem: 'O campo "Descrição" é obrigatorio...'});
    }

    if(descricao === '') {
        errors.push({ campo: 'descricao', mensagem: 'O campo "Descrição" não pode ser vazio...'});
    }

    //Validações campo valor
    if(valor === undefined) {
        errors.push({ campo: 'valor', mensagem: 'O campo "Valor" é obrigatorio...'});
    }

    if(valor === '') {
        errors.push({ campo: 'valor', mensagem: 'O campo "Valor" não pode ser vazio...'});
    }

    if(valor !== '' & isNaN(valor)) {
        errors.push({ campo: 'valor', mensagem: 'O campo "Valor" precisa ser um valor númerico...'});
    }

    //Validações campo quantidade
    if(quantidade === undefined) {
        errors.push({ campo: 'quantidade', mensagem: 'O campo "Quantidade" é obrigatorio...'});
    }

    if(quantidade === '') {
        errors.push({ campo: 'quantidade', mensagem: 'O campo "Quantidade" não pode ser vazio...'});
    }

    if(quantidade !== '' & isNaN(quantidade)) {
        errors.push({ campo: 'quantidade', mensagem: 'O campo "Quantidade" precisa ser um valor númerico...'});
    }

    //Validações campo movimenta_estoque
    if(movimenta_estoque === undefined) {
        errors.push({ campo: 'movimenta_estoque', mensagem: 'O campo "Movimenta Estoque" é obrigatorio...'});
    }

    if(movimenta_estoque === '') {
        errors.push({ campo: 'movimenta_estoque', mensagem: 'O campo "Movimenta Estoque" não pode ser vazio...'});
    }

    return errors.length === 0 ? next() : res.status(400).json({ status: false, errors });
}

export default validate;
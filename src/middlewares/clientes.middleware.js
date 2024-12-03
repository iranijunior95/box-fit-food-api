function validate(req, res, next) {
    const { nome, telefone } = req.body;
    const errors = [];

    //Validações campo nome
    if(nome === undefined) {
        errors.push({ campo: 'nome', mensagem: 'O campo "Nome" é obrigatorio...'});
    }

    if(nome === '') {
        errors.push({ campo: 'nome', mensagem: 'O campo "Nome" não pode ser vazio...'});
    }

    //Validações campo telefone
    if(telefone === undefined) {
        errors.push({ campo: 'telefone', mensagem: 'O campo "Telefone" é obrigatorio...'});
    }

    if(telefone === '') {
        errors.push({ campo: 'telefone', mensagem: 'O campo "Telefone" não pode ser vazio...'});
    }

    if(telefone !== undefined && telefone !== '' && telefone.length != 15) {
        errors.push({ campo: 'telefone', mensagem: 'Valor do campo "Telefone" invalido...'});
    }
    
    return errors.length === 0 ? next() : res.status(400).json({ status: false, errors });
}

export default validate;
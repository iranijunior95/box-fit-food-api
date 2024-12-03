import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req, res) => {
    res.send('ola mundo');
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}!`);
});


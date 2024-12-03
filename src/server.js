import 'dotenv/config';
import app from './index.js';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


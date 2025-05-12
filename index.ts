import mysql, { Connection, ConnectionOptions, QueryError } from 'mysql2/promise';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';

const app = fastify();
app.register(cors);

// Endpoint para login
app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    const { usuario, senha } = request.body as any;

    try {
        const conn = await mysql.createConnection({
            host: "localhost",
            user: 'root',
            password: "",
            database: 'Aurafy', // Nome do banco de dados
            port: 3306
        });

        // Verificando se o usuário e a senha existem no banco de dados
        const [result] = await conn.query("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha]);

        if (result.length > 0) {
            reply.status(200).send({ mensagem: "Login bem-sucedido!" });
        } else {
            reply.status(400).send({ mensagem: "Usuário ou senha inválidos." });
        }

    } catch (erro: any) {
        console.log(erro);
        reply.status(500).send({ mensagem: "Erro no servidor, tente novamente mais tarde." });
    }
});

// Inicializando o servidor
app.listen({ port: 8001 }, (erro, endereco) => {
    if (erro) {
        console.log("ERRO: Fastify não iniciou");
        process.exit(1);
    }
    console.log(`Fastify iniciado na porta: ${endereco}`);
});



import mysql, { Connection, ConnectionOptions, QueryError } from 'mysql2/promise';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';

const app = fastify();
app.register(cors);


app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    const { usuario, senha } = request.body as any;

    try {
        const conn = await mysql.createConnection({
            host: "localhost",
            user: 'root',
            password: "",
            database: 'Aurafy',
            port: 3306
        });

        const [rows] = await conn.query("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha]);

        const usuarios = rows as any[];

        if (usuarios.length > 0) {90
            reply.status(200).send({ mensagem: "Login bem-sucedido!" });
        } else {
            reply.status(401).send({ mensagem: "Usuário ou senha inválidos." });
        }
    } catch (erro: any) {
        console.error("Erro no login:", erro);
        reply.status(500).send({ mensagem: "Erro no servidor, tente novamente mais tarde." });
    }
});

app.delete("/deletar-conta", async (request: FastifyRequest, reply: FastifyReply) => {
    const { usuario, senha } = request.body as any;

    try {
        const conn = await mysql.createConnection({
            host: "localhost",
            user: 'root',
            password: "",
            database: 'Aurafy',
            port: 3306
        });


        const [rows] = await conn.query("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha]);
        const usuarios = rows as any[];

        if (usuarios.length === 0) {
            reply.status(401).send({ mensagem: "Usuário ou senha inválidos. Conta não deletada." });
            return;
        }


        const [resultado] = await conn.query("DELETE FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha]);

        if ((resultado as any).affectedRows > 0) {
            reply.status(200).send({ mensagem: "Conta deletada com sucesso." });
        } else {
            reply.status(500).send({ mensagem: "Erro ao deletar a conta." });
        }
    } catch (erro: any) {
        console.error("Erro ao deletar conta:", erro);
        reply.status(500).send({ mensagem: "Erro no servidor, tente novamente mais tarde." });
    }
});



app.listen({ port: 8001 }, (erro, endereco) => {
    if (erro) {
        console.log("ERRO: Fastify não iniciou");
        process.exit(1);
    }
    console.log(`Fastify iniciado na porta: ${endereco}`);
});



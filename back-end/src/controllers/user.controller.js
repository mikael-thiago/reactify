const db = require("../database/connect");

async function getUserByEmail(req, res) {
    const { email } = req.params;

    const connection = db.createConnection();

    try {
        await connection.connect();

        try {
            const usuarios = await connection.query("SELECT id, email FROM usuario WHERE email='" + email + "'");

            if (usuarios.length > 0) res.status(200).send({ usuario: { id: usuarios[0].id, email: usuarios[0].email } });
            else res.status(500).send({ description: "Usuário não encontrado" });

        } catch (queryError) {
            res.status(400).send({ description: "Erro na execução da query", queryError });
        }

    } catch (connectionError) {
        res.status(400).send({ description: "Erro na conexão", connectionError });
    } finally {
        connection.end();
    }
}

async function getUserByID(req, res) {
    const { id } = req.params;

    const connection = db.createConnection();

    try {
        await connection.connect();

        try {
            const usuarios = await connection.query("SELECT id, email FROM usuario WHERE id='" + id + "'");

            if (usuarios.length > 0) res.status(200).send({ usuario: { id: usuarios[0].id, email: usuarios[0].email } });
            else res.status(500).send({ description: "Usuário não encontrado" });

        } catch (queryError) {
            res.status(400).send({ description: "Erro na execução da query", queryError });
        }

    } catch (connectionError) {
        res.status(400).send({ description: "Erro na conexão", connectionError });
    } finally {
        connection.end();
    }
}

module.exports = {
    getUserByEmail,
    getUserByID
}
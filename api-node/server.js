const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORTA = 3000;



app.get('/', (req, res) => {
    res.send('API do Portifolio em Node: no ar');
});

app.get('/api/projetos', async (req, res) => {
    try{
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicaado' ORDER BY ano DESC, id";
    const [projetos] = await pool.query(sql);
    res.json(projetos);
    } catch(erro){
        res.status(500).json({erro: 'Falha no Servidor: ' + erro.message});
    }
});

app.get('/api/projetos/:id', async (req, res) => {
    try{
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE id = ? AND status = 'publicado'";
    const [linhas] = await pool.execute(sql, [req.params.id]);
    if (linhas.length === 0) {
        return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }
    res.json(linhas [0]);
});

app.listen(PORTA, () => {
    console.log('API no ar em http://localhost:' + PORTA);
});
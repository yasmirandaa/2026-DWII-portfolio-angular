const express = require('express');

const app = express();
const PORTA = 3000;

const projetos = [
    {   id: 1,
        nome: 'Portfolio Angular',
        descricao: 'Portfólio pessoal desenvolvido com Angular, TypeScript e Angular Material, com páginas de apresentação, projetos e contato.',
        tecnologias: 'Angular, TypeScript, Angular Material, HTML, CSS', 
        link_github: 'https://github.com/yasmirandaa/2026-DWII-portfolio-angular',
        ano: 2026
    },
    {   id: 2,
        nome: 'Portfolio Pessoal',
        descricao: 'Site de portfolio responsivo com PHP, PDO e MariaDB, painel admin e login.',
        tecnologias: 'PHP, MariaDB, CSS, Git', 
        link_github: 'https://github.com/yasmirandaa/portfolio',
        ano: 2026
    },
    {   id: 3,
        nome: 'Sistema de Biblioteca',
        descricao: 'CRUD de acervo e emprestimos, com busca e relatorios.',
        tecnologias: 'PHP, MariaDB', 
        link_github: null,
        ano: 2025
    }
];

app.get('/', (req, res) => {
    res.send('API do Portifolio em Node: no ar');
});

app.get('/api/projetos', (req, res) => {
    res.json(projetos);
});

app.listen(PORTA, () => {
    console.log('API no ar em http://localhost:' + PORTA);
});
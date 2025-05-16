// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
require('dotenv').config({ path: '../docker/.env' }); // ajusta o path até seu .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT,
  },
});

// POST /deliveries - cria uma entrega
app.post('/deliveries', async (req, res) => {
  try {
    const [newDelivery] = await db('deliveries')
      .insert(req.body)
      .returning('*'); // retorna o novo registro
    res.status(201).json(newDelivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar entrega' });
  }
});

// GET /deliveries - lista todas as entregas
app.get('/deliveries', async (req, res) => {
  try {
    const deliveries = await db('deliveries').select('*');
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar entregas' });
  }
});

// GET /deliveries/:id - busca entrega por ID
app.get('/deliveries/:id', async (req, res) => {
  try {
    const delivery = await db('deliveries')
      .where({ id: req.params.id })
      .first();
    if (delivery) {
      res.json(delivery);
    } else {
      res.status(404).json({ error: 'Entrega não encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar entrega' });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));

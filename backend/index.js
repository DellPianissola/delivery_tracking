// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());


let deliveries = [];
let idCounter = 1;


app.post('/deliveries', (req, res) => {
  const newDelivery = { id: idCounter++, ...req.body };
  deliveries.push(newDelivery);
  res.status(201).json(newDelivery);
});

app.get('/deliveries', (req, res) => {
  res.json(deliveries);
});

app.get('/deliveries/:id', (req, res) => {
  const delivery = deliveries.find(e => e.id === parseInt(req.params.id));
  delivery ? res.json(delivery) : res.status(404).send("Not found");
});



app.listen(3001, () => console.log('API rodando na porta 3001'));

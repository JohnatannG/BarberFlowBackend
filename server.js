require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const barberRoutes = require('./routes/barberRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/barbers', barberRoutes);
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Bem-vindo ao BarberFlow Backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });
module.exports = app;

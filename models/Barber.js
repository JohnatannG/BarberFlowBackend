const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  nomeBarbearia: { type: String, required: true },
  endereco: { type: String, required: true },
  horaAbertura: { type: String, required: true },
  horaFechamento: { type: String, required: true },
  senha: { type: String, required: true },
  logotipo: { type: String },
});

module.exports = mongoose.model('Barber', barberSchema);

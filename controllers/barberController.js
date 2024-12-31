const Barber = require('../models/Barber');
const bcrypt = require('bcryptjs');

exports.createBarber = async (req, res) => {
  try {
    const { nome, email, telefone, nomeBarbearia, endereco, horaAbertura, horaFechamento, senha } = req.body;

    const existingBarber = await Barber.findOne({ email });
    if (existingBarber) {
      return res.status(400).json({ message: 'E-mail já está em uso. Por favor, escolha outro e-mail.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const logotipo = req.file ? req.file.path : null;

    const barber = new Barber({
      nome,
      email,
      telefone,
      nomeBarbearia,
      endereco,
      horaAbertura,
      horaFechamento,
      senha: hashedPassword,
      logotipo,
    });

    await barber.save();
    res.status(201).json({ message: 'Cadastro criado com sucesso!', barber });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cadastro', error });
  }
};

exports.loginBarber = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    const barber = await Barber.findOne({ email });
    
    if (!barber) {
      return res.status(404).json({ message: 'Barbeiro não encontrado' });
    }
    
    const isPasswordValid = await bcrypt.compare(senha, barber.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha inválida' });
    }
    
    const { senha: _, ...barberData } = barber.toObject();

    res.status(200).json({
      message: 'Login bem-sucedido',
      barber: barberData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao tentar fazer login' });
  }
};

exports.getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json(barbers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cadastros', error });
  }
};

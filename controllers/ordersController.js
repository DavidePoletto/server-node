const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    console.log('Richiesta ricevuta:', req.body);
    console.log('Utente autenticato:', req.user);

    const { items, totalPrice, shippingAddress } = req.body;

    if (!items || !totalPrice || !shippingAddress) {
      console.error('Dati mancanti:', { items, totalPrice, shippingAddress });
      return res.status(400).json({ message: 'Dati mancanti nella richiesta.' });
    }

    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalPrice,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Ordine creato con successo', order: savedOrder });
  } catch (error) {
    console.error('Errore durante la creazione dell\'ordine:', error.message);
    res.status(500).json({ message: 'Errore durante la creazione dell\'ordine' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(`Recupero ordini per l'utente con ID: ${userId}`);

    const orders = await Order.find({ userId }).exec(); // Filtra per userId
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Nessun ordine trovato per questo utente.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Errore durante il recupero degli ordini:', error.message);
    res.status(500).json({ message: 'Errore durante il recupero degli ordini.' });
  }
};

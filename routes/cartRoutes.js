// routes/cartRoutes.js
import express from 'express';
import ShoppingCart from '../models/ShoppingCart';

const router = express.Router();

// Add to cart
router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await ShoppingCart.findOne({ session: req.session.id });
    if (!cart) {
      cart = new ShoppingCart({ session: req.session.id, items: [] });
    }
    const index = cart.items.findIndex(item => item.product.toString() === productId);
    if (index >= 0) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get cart items
router.get('/', async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne({ session: req.session.id }).populate('items.product');
    if (!cart) {
      return res.status(404).send('No cart found');
    }
    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

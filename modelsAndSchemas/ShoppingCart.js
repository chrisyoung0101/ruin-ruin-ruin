// models/ShoppingCart.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 }
});

const shoppingCartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    session: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '2h' }  // Expires after 2 hours
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
export default ShoppingCart;

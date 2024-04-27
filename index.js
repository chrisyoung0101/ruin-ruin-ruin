import express from 'express';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const port = 3000;

// Convert the file URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session management
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Use connect-flash middleware to use flash messages
app.use(flash());

// Setup flash messages and user response locals
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // Used by Passport for authentication errors
    next();
});

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Passport Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (err) {
        return done(err);
    }
}));


passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


// Establish a connection to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase')
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema and model for products
const productSchema = new mongoose.Schema({
    name: String, description: String, price: Number, category: String, imageUrl: String
});
const Product = mongoose.model('Product', productSchema);

// Define a Mongoose schema and model for shopping carts
const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 }
});
const shoppingCartSchema = new mongoose.Schema({
    items: [cartItemSchema], session: String, createdAt: { type: Date, default: Date.now, expires: 3600 }
});
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

// Route to render registration page
app.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('error') });
});

// Route to render login page
app.get('/register', (req, res) => {
    res.render('register', { messages: req.flash('error_msg') });
});


// User Registration
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

// User Login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// User logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});


// another Product Route?
const Product = require('./models/Product');


// Product Routes
app.post('/add-product', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).send(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Failed to add product');
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('product-list', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Failed to retrieve products');
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.render('product-detail', { product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Failed to retrieve product');
    }
});

// Route for the homepage
app.get('/', (req, res) => {
    // Check if user is logged in
    if (req.isAuthenticated()) {
        res.render('home', { user: req.user }); // Render a home view if logged in
    } else {
        res.redirect('/login'); // Redirect to login if not logged in
    }
});

// Shopping Cart Routes
app.post('/add-to-cart', async (req, res) => {
    const { productId, quantity } = req.body;
    const session = req.headers['session-id']; 
    if (!session) {
        return res.status(400).send('Session ID is required');
    }
    try {
        let cart = await ShoppingCart.findOne({ session });
        if (!cart) {
            cart = new ShoppingCart({ session, items: [] });
        }
        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Failed to add to cart');
    }
});

app.get('/cart', async (req, res) => {
    const session = req.headers['session-id'];
    if (!session) {
        return res.status(400).send('Session ID is required');
    }
    try {
        const cart = await ShoppingCart.findOne({ session }).populate('items.product');
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        res.render('cart-view', { cart });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).send('Failed to retrieve cart');
    }
});

// Database Stats Route
app.get('/db-stats', async (req, res) => {
    try {
        const stats = await mongoose.connection.db.command({ dbStats: 1 });
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error retrieving database stats:', error);
        res.status(500).send('Failed to retrieve database stats');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


require('dotenv').config();
const express = require('express'),
	massive = require('massive'),
	session = require('express-session'),
	authCtrl = require('./controllers/authController'),
	mainCtrl = require('./controllers/mainController'),
	path = require('path'),
	{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
	port = SERVER_PORT,
	app = express();

app.use(express.json());
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 14 },
	})
);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then(db => {
	app.set('db', db);
	console.log('db connected successfully');
});

//Main endpoints
app.get('/api/products', mainCtrl.getProducts);
app.post('/api/cart-item', mainCtrl.addToCart);
app.get('/api/cart/:id', mainCtrl.getCart);
app.delete('/api/cart-item/:id', mainCtrl.deleteCartItem);
app.put('/api/cart-item/:id', mainCtrl.editCartItem);
app.post('/api/payment', mainCtrl.completePurchase);

//Auth endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

app.use(express.static(`${__dirname}/../build`));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => console.log(`Server running on ${port}`));

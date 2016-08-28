var express = require('express');
var app = express();
var uuid = require('node-uuid');
var fs = require('fs')
var router = express.Router();

//controllers
const cartController = require("./carts.controllers")

// *** route handlers *** //
router.get('/carts', getAllCarts);
router.get('/carts/:id', getSingleCart);
router.post('/carts', createCart);
router.get('/carts/:id/total', getCartTotal);
router.post('/carts/:id/products/:productId', addItemToCart);
router.get('/inventory/:id', getInventoryByItem);
router.get('/inventory', getInventory);

// inventory and cart are attached to the global
// scope specifically for testing
global.inventory = require('./inventory');
global.carts = [];

app.use(require('body-parser').json());

// do not log with morgan when in test mode
if ( process.env.NODE_ENV !== 'test' ) {
  app.use(require('morgan')('dev'));
}

// helper functions


app.listen(3000);

module.exports = app;

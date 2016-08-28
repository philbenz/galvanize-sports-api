(function() {

  'use strict';

    function getAllCarts(callback) {
      const returnObject = {
        message: 'All carts!',
        data: cage
      };
      callback(null, returnObject);
    }

    function getSingleCart(cartID, callback) {
      if (cartID > -1) {
        const returnObject = {
          message: 'Single cart!',
          data: cage[cartID]
        };
        callback(null, returnObject);
      } else {
        const returnObject = {
          message: 'That cart does not exist.',
          data: null
        };
        callback(returnObject);
      }
    }

    function createCart(cartObject, callback) {
      const indexOfLast = carts.length - 1;
      const newID = cage[indexOfLast].id + 1;
      cartObject.id = newID;
      cage.push(cartObject);
      const returnObject = {
        message: 'Single cart added!',
        data: cartObject
      };
      callback(null, returnObject);
    }

    function getCartTotal(cartID, callback) {
      if (cartID > -1) {
        const returnObject = {
          message: 'This is the cart total',
          data: cage[cartID]
        };
        callback(null, returnObject);
      } else {
        const returnObject = {
          message: 'That cart does not exist.',
          data: null
        };
        callback(returnObject);
      }
    }

    function addItemToCart(cartObject, cartID, callback) {
      const singleCart = cage.filter(function(cart) {
        return cart.id === cartID;
      });
      if (!singleCart.length) {
        const returnObject = {
          message: 'That cart does not exist.',
          data: null
        };
        callback(returnObject);
      } else {
        cartObject.id = cartID;
        const index = cage.indexOf(singleCart[0]);
        cage.splice(index, 1);
        cage.push(cartObject);
        const returnObject = {
          message: 'Single cart updated!',
          data: cartObject
        };
        callback(null, returnObject);
      }
    }

    function getInventory(callback) {
      const returnObject = {
        message: 'All inventory!',
        data: inventory
      };
      callback(null, returnObject);
    }

    module.exports = {
      getAllCarts,
      getSingleCart,
      createCart,
      getCartTotal,
      addItemToCart,
      getInventoryByItem,
      getInventory,
    };

  }());

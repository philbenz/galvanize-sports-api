# Galvanize Sports API

Remember [Galvanize Sports](https://github.com/gSchool/galvanize-sports)? We're going to revisit that concept but this time design an API to handle removing items from an inventory and adding them to potentially multiple carts.


### Setup

1. Fork/clone this repository

1. `npm install`

1. To run locally, use `npm run dev`

1. To run the tests, use `npm test`

1. When you've finished, create a Pull Request on the original repository.

Note, you'll need to remove the 'x' before tests to remove them from their pending status. Currently all tests are pending!


### Instructions

You will be creating an API that allows for:

* The creation of multiple carts

* The ability to get information about all items in the inventory or a single item

* The ability to add products from the inventory into individual carts

* A route that calculates the total for a given cart

In order to complete these tasks, follow along with the tests and do the following:

##### `GET /carts`

* Should return a status code of 200.

* Returns all carts.

* Each cart should have the following structure:
  ```js
  { 'id': [ UUID ], 'products': [] }
  ```

##### `GET /carts/:id`

* Should return the single cart that matches the ID provided.

* If found, returns just that cart with a status code of 200. For example:
  ```js
  {
    'id': 'a23ea16c-67d4-11e6-b5b6-618d7baeb56a',
    'products': []
  }
  ```

* If not found, returns an object with a message key and a status code of 404. For example:
  ```js
  { 'message': 'Cart not found.' }
  ```

##### `POST /carts`

* Creates a new cart that includes a randomly generated UUID as the id and creates a products key associated with an empty object.

* Should return a status code of 201 and an object with a key of ID and the value as the ID of the newly created cart.
  ```js
  { 'id': 'a23ea16a-67d4-11e6-b5b6-618d7baeb56a' }
  ```

##### `POST /carts/:id/products/:productId`

* Adds the specified product to the products key in the specified cart.

* If successful, returns a 201 status code and the entire cart. For example:

  ```js
  {
    'id': 'd4ca295d-fc71-4c9b-bf93-97c31bde6852',
    'products': [
        {
            'id': 'a23e7a61-67d4-11e6-b5b6-618d7baeb56a',
            'name': 'Easton Junior Synergy 550 Grip Ice Hockey Stick',
            'price': '$69.99',
            'quantity': 1
        }
    ]
  }
  ```

* If the item already exists in the cart, simply increases the quantity by one.

* If the cart or product id is incorrect, returns a 404 status code with an error message. For example:
  ```js
  { 'message': 'Cart not found.' }
  ```

* If the availability for that item is at 0, returns a 422 status code with an error message. For example:
  ```js
  { 'message': 'Easton Junior Synergy 550 Grip Ice Hockey Stick is out of stock.' }
  ```

##### `GET /carts/:id/total`

* Returns the total for the given cart with a status code of 200. For example:
  ```js
  { 'total': '$444.92' }
  ```

##### `GET /inventory`

* Returns the entire inventory with a status code of 200.

##### `GET /inventory/:id`

* Should return the single product that matches the ID provided.

* If found, returns just that item with a status code of 200. For example:
  ```js
  {
    'available': 1,
    'id': 'a23e7a61-67d4-11e6-b5b6-618d7baeb56a',
    'name': 'Easton Junior Synergy 550 Grip Ice Hockey Stick',
    'price': '$69.99'
  }
  ```

* If not found, returns an object with a message key and a status code of 404. For example:
  ```js
  { 'message': 'Product not found.' }
  ```

### Tips

1. Start by doing just the main GET routes.

1. If your tests are not passing but you can't tell why, try it locally or try logging the error object that's available to you in the tests. For example:

  ```js
  // Line 24, tests/inventory.test.js
  chai.request(server).get('/inventory').end((err, res) => {
    console.log(err);
    // etc...
  });
  ```

1. When you add products to your cart(s), you'll want to create a new object. That is, you don't want to pass the reference inside of inventory to the cart.


### Stretch Goals

Want more? Try these out:

1. Create a route that allows you to remove a single item from a cart.

1. Create a route that allows you to delete an entire cart.

1. Create a route that allows you to restock a given item in the inventory.

1. Create a route that allows a cart to be "purchased". When this happens, the cart is emptied (but the ID remains the same) and the sale information is added to a new data structure that records all recent purchases. Create a route to access that information too!

1. Write tests for the above routes.

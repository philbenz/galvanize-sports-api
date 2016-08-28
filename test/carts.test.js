process.env.NODE_ENV = 'test';

const uuid = require('node-uuid').v1;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main.js');
const expect = chai.expect;

chai.use(chaiHttp);

require.reload = function reload(path){
  delete require.cache[require.resolve(path)];
  return require(path);
};

describe('galvanize-sports-api : routes', () => {
  beforeEach(() => {
    global.carts = [];
    global.inventory = require.reload('../inventory');
  });

  describe('GET /carts', () => {
    it('should return an empty list of the available carts', (done) => {
      chai.request(server).get('/carts').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(0);
        done();
      });
    });

    xit('should return existing carts', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        expect(carts.length).to.equal(1);

        chai.request(server).get('/carts').end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(1);
          let cart = res.body[0];
          expect(cart).to.be.a('object');
          expect(cart.products.length).to.equal(0);
          done();
        });
      });
    });
  });

  describe('POST /carts', () => {
    xit('should create a new cart', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        expect(res.status).to.equal(201);
        expect(carts.length).to.equal(1);
        expect(res.body.id).to.equal(carts[0].id);
        done();
      });
    });
  });

  describe('GET /carts/:id', () => {
    xit('should return an individual cart', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        expect(carts.length).to.equal(1);
        chai.request(server).get(`/carts/${res.body.id}`).end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    xit('should return a 404 if there is no cart found', (done) => {
      chai.request(server).get(`/carts/1`).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.not.be.empty;
        done();
      });
    });
  });

  describe('POST /carts/:id/products/:productId', () => {
    xit('adds a product to the cart', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        let cart = carts[0];
        let product = inventory.snowboards[0];
        let inStock = product.available;

        chai.request(server).post(`/carts/${cart.id}/products/${product.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.id).to.equal(cart.id);
          expect(res.body.products.length).to.equal(1);
          expect(res.body.products[0].id).to.equal(product.id);
          expect(res.body.products[0].quantity).to.equal(1);
          expect(product.available).to.equal(inStock - 1);
          done();
        });
      });
    });

    xit('increases the quantity if the product is in the cart', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        let cart = carts[0];
        let product = inventory.snowboards[0];
        let inStock = product.available;

        chai.request(server).post(`/carts/${cart.id}/products/${product.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.id).to.equal(cart.id);
          expect(res.body.products.length).to.equal(1);
          expect(res.body.products[0].quantity).to.equal(1);

          chai.request(server).post(`/carts/${cart.id}/products/${product.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.id).to.equal(cart.id);
            expect(res.body.products.length).to.equal(1);
            expect(res.body.products[0].id).to.equal(product.id);
            expect(res.body.products[0].quantity).to.equal(2);
            done();
          });
        });
      });
    });

    xit('returns a 404 if the cart id is incorrect', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        let cart = carts[0];
        let product = inventory.snowboards[0];
        let inStock = product.available;

        chai.request(server).post(`/carts/1/products/${product.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.not.be.empty;
          done();
        });
      });
    });

    xit('returns a 404 if the product id is incorrect', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        let cart = carts[0];
        let product = inventory.snowboards[0];
        let inStock = product.available;

        chai.request(server).post(`/carts/${cart.id}/products/1`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.not.be.empty;
          done();
        });
      });
    });

    xit('returns a 422 if the product is out of stock', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        let cart = carts[0];
        let product = inventory.snowboards[0];
        product.available = 0;

        chai.request(server).post(`/carts/${cart.id}/products/${product.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.not.be.empty;
          done();
        });
      });
    });
  });

  describe('GET /carts/:id/total', () => {
    xit('calculates the current total of the cart', (done) => {
      chai.request(server).post('/carts').end((err, res) => {
        let cart = carts[0];
        let product = inventory.snowboards[0];
        let inStock = product.available;

        chai.request(server).post(`/carts/${cart.id}/products/${product.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);

          chai.request(server).post(`/carts/${cart.id}/products/${product.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(201);

            chai.request(server).get(`/carts/${cart.id}/total`)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.total).to.equal('$999.90');
              done();
            });
          });
        });
      });
    });
  });
});

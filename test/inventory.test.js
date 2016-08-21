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

  describe('GET /inventory', () => {
    it('should return every item in the inventory', (done) => {
      chai.request(server).get('/inventory').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.snowboards).to.be.a('array');
        done();
      });
    });
  });

  describe('GET /inventory/:id', () => {
    it('should return a single item in the inventory', (done) => {
      chai.request(server).get('/inventory').end((err, res) => {
        let snowboard = res.body.snowboards[0];
        let id = snowboard.id;

        chai.request(server).get(`/inventory/${id}`).end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.id).to.equal(id);
          done();
        });
      });
    });
    it('should return a 404 if the item id does not match', (done) => {
      chai.request(server).get(`/inventory/1`).end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.not.be.empty;
        done();
      });
    });
  });
});

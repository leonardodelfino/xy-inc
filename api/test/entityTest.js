//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let server = require('../app');
let should = chai.should();

let Entity = mongoose.model('Entity');

chai.use(chaiHttp);

//Empty the database before start the tests
describe('Entity', () => {
    beforeEach((done) => { 
        Entity.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET entity', () => {
      it('it should GET all the entities', (done) => {
        chai.request(server)
            .get('/api/entity')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});
'use strict';

//During the test the env variable is set to test for disable logs
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let server = require('../app');
let assert = chai.assert;
let mock = require("./mock");
let Entity = mongoose.model('Entity');

chai.use(chaiHttp);

//Empty the database before start the tests
describe('Entity', () => {

    before((done) => {
        mongoose.connection.once('connected', () => {
            mongoose.connection.db.dropDatabase();
            done();
        });
    });

    describe('Testing entity routes', () => {

        let record = new Entity(mock.entity.record);
        let anotherRecord = new Entity(mock.entity.anotherRecord);
        let invalidRecord = new Entity(mock.entity.invalidRecord);
        let duplicatedRecord = new Entity(mock.entity.duplicatedRecord);
        let reservedRecord = new Entity(mock.entity.reservedRecord);

        it('it should GET all the entities', (done) => {
            chai.request(server)
                .get('/api/entity')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'array');
                    assert.lengthOf(res.body, 0);
                    done();
                });
        });

        it('it should POST one record on database', (done) => {
            chai.request(server)
                .post('/api/entity')
                .send(record)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, '_id');
                    done();
                });
        });

        it('it should GET one record on collection', (done) => {
            chai.request(server)
                .get('/api/entity/')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.lengthOf(res.body, 1);
                    done();
                });
        });

        it('it should POST another record on database', (done) => {
            chai.request(server)
                .post('/api/entity')
                .send(anotherRecord)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, '_id');
                    done();
                });
        });

        it('it should GET one a record with a specific id', (done) => {
            chai.request(server)
                .get('/api/entity/' + record.id)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.lengthOf(res.body, 1);
                    assert.property(res.body[0], '_id');
                    assert.equal(res.body[0]._id, record.id);
                    done();
                });
        });

        it('it should not POST one a record with a invalid attribute', (done) => {
            chai.request(server)
                .post('/api/entity')
                .send(invalidRecord)
                .end((err, res) => {
                    assert.equal(res.status, 500);
                    assert.property(res.body, "error");
                    done();
                });
        });

        it('it should not POST a record with the same name', (done) => {
            chai.request(server)
                .post('/api/entity')
                .send(duplicatedRecord)
                .end((err, res) => {
                    assert.equal(res.status, 500);
                    assert.property(res.body, "error");
                    done();
                });
        });

        it('it should GET two records on the database', (done) => {
            chai.request(server)
                .get('/api/entity')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'array');
                    assert.lengthOf(res.body, 2);
                    done();
                });
        });

        it('it should not POST a new entity with the reserved name entity', (done) => {
            chai.request(server)
                .post('/api/entity')
                .send(reservedRecord)
                .end((err, res) => {
                    assert.equal(res.status, 500);
                    assert.property(res.body, "error");
                    done();
                });
        });
    });

    describe('Testing dynamic entity routes', () => {

        let employeeId;

        it('it should GET all the employees', (done) => {
            chai.request(server)
                .get('/api/employee')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'array');
                    assert.lengthOf(res.body, 0);
                    done();
                });
        });

        it('it should POST a new employee', (done) => {
            chai.request(server)
                .post('/api/employee')
                .send(mock.employee.record)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'object');
                    assert.property(res.body, "_id");
                    assert.property(res.body, "name");
                    assert.property(res.body, "childrens");
                    assert.property(res.body, "blue_eyes");
                    employeeId = res.body._id;
                    done();
                });
        });

        it('it should UPDATE a employee with specifed id', (done) => {
            chai.request(server)
                .put('/api/employee/' + employeeId)
                .send(mock.employee.update)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'object');
                    assert.property(res.body, "ok");
                    assert.equal(res.body.ok, 1);
                    assert.property(res.body, "nModified");
                    assert.equal(res.body.nModified, 1);
                    assert.property(res.body, "n");
                    assert.equal(res.body.n, 1);
                    done();
                });
        });

        it('it should GET a employee with specifed id', (done) => {
            chai.request(server)
                .get('/api/employee/' + employeeId)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'array');
                    assert.lengthOf(res.body, 1);
                    assert.equal(res.body[0]._id, employeeId);
                    assert.equal(res.body[0].name, mock.employee.update.name);
                    done();
                });
        });

        it('it should not POST a employee with invalid type attribute', (done) => {
            chai.request(server)
                .post('/api/employee/')
                .send(mock.employee.invalidRecord)
                .end((err, res) => {
                    assert.equal(res.status, 500);
                    assert.property(res.body, "error");
                    done();
                });
        });

        it('it should not POST a employee without a required attribute', (done) => {
            chai.request(server)
                .post('/api/employee/')
                .send(mock.employee.requiredField)
                .end((err, res) => {
                    assert.equal(res.status, 500);
                    assert.property(res.body, "error");
                    done();
                });
        });

        it('it should DELETE a employee with a specific id', (done) => {
            chai.request(server)
                .delete('/api/employee/' + employeeId)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.property(res.body, "ok");
                    assert.property(res.body, "n");
                    assert.equal(res.body.ok, true);
                    assert.equal(res.body.n, 1);
                    done();
                });
        });

        it('it should GET a number of 0 records', (done) => {
            chai.request(server)
                .get('/api/employee/')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, "array");
                    assert.lengthOf(res.body, 0);
                    done();
                });
        });

        it('it should not GET a invalid entity', (done) => {
            chai.request(server)
                .post('/api/foo')
                .send(mock.employee.record)
                .end((err, res) => {
                    assert.equal(res.status, 500);
                    assert.property(res.body, "error");
                    done();
                });
        });
    });
});
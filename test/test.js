'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('/', function () {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function () {

    });

    after(function () {

    });

    // GET - Index
    it('should return ok', function () {
        return chai.request(app)
            .get('/')
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });


    // POST - add new city
    it('should add new city', function () {
        return chai.request(app)
            .post('/')
            .send({
                'city': 'Helsinki'
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
            });
    });

   
});

describe('/five-day-weather', function () {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function () {

    });

    after(function () {

    });

    // GET - five-day-weather
    it('should return ok', function () {
        return chai.request(app)
            .get('/five-day-weather')
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    // POST - add new city
    it('should add new city', function () {
        return chai.request(app)
            .post('/')
            .send({
                'city': 'Helsinki'
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
            });
    });

    //  // POST - Bad Request
    // it('should return Bad Request', function () {
    //     return chai.request(app)
    //         .post('/five-day-weather')
    //         .type('form')
    //         .send({
    //             city: 'Helsinki'
    //         })
    //         .then(function (res) {
    //             throw new Error('Invalid content type!');
    //         })
    //         .catch(function (err) {
    //             expect(err).to.have.status(400);
    //         });
    // });
});

describe('/error', function () {
    this.timeout(5000); // How long to wait for a response (ms)

    before(function () {

    });

    after(function () {

    });

    // GET - error
    it('should return 404', function () {
        return chai.request(app)
            .get('/error')
            .then(function (res) {
                expect(res).to.have.status(404);
            });
    });
});
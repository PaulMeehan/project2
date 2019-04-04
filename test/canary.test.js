var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../models');
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe('GET /api/inventory/search/t=1', function () {
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should send back all inventory associated with the first tag', function (done) {
    // POST the request body to the server
    request
      .get('/api/inventory/search/t=1')
      .end(function (err, res) {
        console.log('got here');
        let responseStatus = res.status;
        let responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.includes(
            { itemName: '1 Pint Cookie Dough',
              category: 'ice cream',
              description: 'The 2nd best Ice Cream ever made. May contain nuts',
              price: 4.99,
              StoreId: 1 });

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});

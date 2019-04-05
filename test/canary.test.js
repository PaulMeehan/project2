var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../models');
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe('POST /api/inventory', function () {
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should send back an error message because the user is not logged in', function (done) {
    // POST the request body to the server
    request
      .post('/api/inventory')
      .send({
        itemName: '1 Pint Mint Chocolate Chip',
        category: 'ice cream',
        description: 'The best Ice Cream ever made. May contain nuts',
        price: 4.99,
        StoreId: 1
      })
      .end(function (err, res) {
        console.log('got here');
        let responseStatus = res.status;
        let responseBody = res.body;
        console.log(res.text);

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(400);

        expect(responseBody)
          .to.be.an('object')
          .that.includes({
            'message': 'Error: user must logged in to manage inventory'
          });
        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});

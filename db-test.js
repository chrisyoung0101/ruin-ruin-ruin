import mongoose from 'mongoose';
import * as chai from 'chai';
const expect = chai.expect;

describe('Database Tests', function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost:3000/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Database', function() {
    it('saves new product', function(done) {
      const ProductSchema = new mongoose.Schema({ name: String });
      const Product = mongoose.model('Product', ProductSchema);
      let testProduct = new Product({ name: 'Test Product' });

      testProduct.save(function(err) {
        if (err) {
          done(err);
        }
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });
});

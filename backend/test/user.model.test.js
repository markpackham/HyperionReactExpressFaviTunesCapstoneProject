const mongoose = require("mongoose");
const User = require("../models/user.model");
const chai = require("chai");
const should = chai.should();

// Use sinon to fake actions to avoid database corruption
// Standalone test spies, Stubs and mocks for JavaScript. works with any unit testing framework.
// (no date) Sinon.JS - Standalone test fakes, spies, stubs and mocks for JavaScript. Works with any unit testing framework. Available at: https://sinonjs.org/ (Accessed: 14 November 2023).
const sinon = require("sinon");

describe("User", () => {
  beforeEach((done) => {
    sinon.stub(mongoose.Model, "find");
    done();
  });

  afterEach((done) => {
    mongoose.Model.find.restore();
    done();
  });

  describe("#save()", () => {
    it("should save a user", (done) => {
      const user = new User({
        username: "bob@gmail.com",
        password: "Password9#",
        user_jwt:
          "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYm9iQGdtYWlsLmNvbSJ9.THiL1HO217NjPS1xjiuk5ZOhWnLg-IIrGLdDngBueSE",
      });
      user.save((err, savedUser) => {
        should.not.exist(err);
        savedUser.should.have.property("username").eql("gmail");
        savedUser.should.have.property("password").eql("Password9#");
        savedUser.should.have
          .property("user_jwt")
          .eql(
            "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYm9iQGdtYWlsLmNvbSJ9.THiL1HO217NjPS1xjiuk5ZOhWnLg-IIrGLdDngBueSE"
          );
        done();
      });
    });
  });
});

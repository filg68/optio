//register.validation.spec.js
//Author - Fil - August 28, 2019
//Inspiration - https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

import { describe } from "mocha";

const expect = require("chai").expect;
import { validateRegisterInput as validateOnRegister } from "../validation/register";

describe("Signup data is validated", function() {
    it("should be valid if all fields provided", function(done) {
        let user = {
            name: "Bob User",
            email: "bob@bob.com",
            password: "123456",
            password2: "123456"
        };
        expect(validateOnRegister(user).isValid).to.be.true;
        done();
    });

    it("should be invalid if e-mail not provided", function(done) {
        let user = {
            name: "Bob User",
            password: "123456",
            password2: "123456"
        };
        expect(validateOnRegister(user).isValid).to.be.false;
        done();
    });

    it("should be invalid if password not provided", function(done) {
        let user = {
            name: "Bob User",
            email: "bob@bob.com",
            password2: "123456"
        };
        expect(validateOnRegister(user).isValid).to.be.false;
        done();
    });

    it("should be invalid if password2 is not provided", function(done) {
        let user = {
            name: "Bob User",
            email: "bob@bob.com",
            password: "123456"
        };
        expect(validateOnRegister(user).isValid).to.be.false;
        done();
    });

    it("should be invalid if password is less than 6 chars", function(done) {
        let user = {
            name: "Bob User",
            email: "bob@bob.com",
            password: "12345",
            password2: "12345"
        };
        expect(validateOnRegister(user).isValid).to.be.false;
        done();
    });

    it("should be valid if password is 6 chars", function(done) {
        let user = {
            name: "Bob User",
            email: "bob@bob.com",
            password: "123456",
            password2: "123456"
        };
        expect(validateOnRegister(user).isValid).to.be.true;
        done();
    });

    it("should be valid if password is more than 6 chars", function(done) {
        let user = {
            name: "Bob User",
            email: "bob@bob.com",
            password: "1234567",
            password2: "1234567"
        };
        expect(validateOnRegister(user).isValid).to.be.true;
        done();
    });

    it("should be invalid if passwords don't match", function(done) {
        let user = {
            name: "Bob User",
            email: "bob@bob.com",
            password: "123456",
            password2: "123457"
        };
        expect(validateOnRegister(user).isValid).to.be.false;
        done();
    });
});

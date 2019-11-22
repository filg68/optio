//login.validation.spec.js
//Author - Fil - August 28, 2019
//Inspiration - https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

import { describe } from "mocha";

const expect = require("chai").expect;
import { validateLoginInput as validateOnLogin } from "../validation/login";

describe("Login data is validated", function() {
    it("should be valid if all fields provided", function(done) {
        let user = { email: "bob@bob.com", password: "123456" };
        expect(validateOnLogin(user).isValid).to.be.true;
        done();
    });

    it("should be invalid if e-mail not provided", function(done) {
        let user = {
            password: "123456"
        };
        expect(validateOnLogin(user).isValid).to.be.false;
        done();
    });

    it("should be invalid if password not provided", function(done) {
        let user = {
            email: "bob@bob.com"
        };
        expect(validateOnLogin(user).isValid).to.be.false;
        done();
    });
});

import { faker } from "@faker-js/faker";

var selectors = require("./selectors");
var _ = require("lodash");
const moment = require("moment");

class signup {
  fillSigupForm(){
    let genratedData=this.generateSignupData();
    cy.writeFile(
      "cypress/fixtures/genratedData.json",
      genratedData
    );
    this.createEmail().type(genratedData.email)
    this.submitCreate().click()
    this.firstName().type(genratedData.firstName)
    this.lastName().type(genratedData.lastName)
    this.email().should('have.value', genratedData.email)
    this.passwd().type(genratedData.password)
     genratedData.gender==0 ? this.maleGender() :  this.femaleGender()
     this.days().select(genratedData.days)
     this.months().select(genratedData.months)
     this.years().select(genratedData.years)
     this.submitAccount().click()
    return {email:genratedData.email,password:genratedData.password}
  }
  firstName() {
    return cy.xpath(selectors.firstName);
  }
  lastName() {
    return cy.xpath(selectors.lastName);
  }
  email() {
    return cy.xpath(selectors.email);
  }
  createEmail() {
    return cy.xpath(selectors.createEmail);
  }
  submitCreate() {
    return cy.xpath(selectors.submitCreate);
  }
  passwd() {
    return cy.xpath(selectors.passwd);
  }
  femaleGender() {
    return cy.xpath(selectors.femaleGender);
  }
  maleGender() {
    return cy.xpath(selectors.maleGender);
  }
  days() {
    return cy.xpath(selectors.days);
  }
  months() {
    return cy.xpath(selectors.months);
  }
  years() {
    return cy.xpath(selectors.years);
  }
  submitAccount() {
    return cy.xpath(selectors.submitAccount);
  }
  generateSignupData() {
    var gender = _.sample([0, 1]);
    return {
      email:faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: "Test_Password_9",
      gender: gender,
      days: faker.datatype.number({ min: 1, max: 26 }),
      months:  faker.datatype.number({ min: 1, max: 12 }),
      years:  faker.datatype.number({ min:2, max: 30 }),
     
    };
  }
}
export default signup;

var selectors = require("./selectors");
import { faker } from "@faker-js/faker";

class checkout {
  checkoutButton() {
    return cy.xpath(selectors.checkoutButton);
  }
  totalProductPrice() {
    return cy.xpath(selectors.totalProductPrice);
  }
  address1() {
    return cy.xpath(selectors.address1);
  }
  city() {
    return cy.xpath(selectors.city);
  }
  state() {
    return cy.xpath(selectors.state);
  }
  postcode() {
    return cy.xpath(selectors.postcode);
  }
  country() {
    return cy.xpath(selectors.country);
  }
  phone() {
    return cy.xpath(selectors.phone);
  }
  phoneMobile() {
    return cy.xpath(selectors.phone_mobile);
  }
  alias() {
    return cy.xpath(selectors.alias);
  }
  submitAddress() {
    return cy.xpath(selectors.submitAddress);
  }
  processAddress() {
    return cy.xpath(selectors.processAddress);
  }
  processCarrier() {
    return cy.xpath(selectors.processCarrier);
  }
  agreeButton() {
    return cy.xpath(selectors.agreeButton);
  }
  generateSignupData() {
    return {
      address:faker.address.streetAddress(),
      city: faker.address.streetAddress(),
      postcode: "73001",
      state: faker.datatype.number({ min: 2, max: 9 }),
      phone:faker.phone.number("#########"),
      phoneMobile:faker.phone.number("#########"),
      alias:faker.address.streetAddress(),
    };
  }
  fillAddressForm(){
    let genratedData=this.generateSignupData();
    cy.writeFile(
      "cypress/fixtures/genratedDataAddress.json",
      genratedData
    );
    this.address1().type(genratedData.address)
    this.city().type(genratedData.city)
    this.state().select(genratedData.state)
    this.postcode().type(genratedData.postcode)
    this.phone().type(genratedData.phone)
    this.phoneMobile().type(genratedData.phoneMobile)
    this.submitAddress().click()
    this.processAddress().click()
    this.agreeButton().click({force:true})
    this.processCarrier().click()

  }
}
export default checkout;

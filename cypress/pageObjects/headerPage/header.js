import { faker } from "@faker-js/faker";

var selectors = require("./selectors");
var _ = require("lodash");
const moment = require("moment");

class Header {
  loginButton() {
    return cy.xpath(selectors.loginButton);
  }
 
  logoutButton() {
    return cy.xpath(selectors.logoutButton);
  }
  myProfileButtonButton() {
    return cy.xpath(selectors.myProfileButton);
  }
}
export default Header;

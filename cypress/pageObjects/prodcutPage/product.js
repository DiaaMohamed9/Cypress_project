import { faker } from "@faker-js/faker";

var selectors = require("./selectors");
var _ = require("lodash");
const moment = require("moment");

class Product {

  addToCartButton() {
    return cy.xpath(selectors.addToCartButton);
  }
  proceedToCheckout() {
    return cy.xpath(selectors.proceedToCheckout);
  }
  ourPriceDisplay() {
    return cy.xpath(selectors.ourPriceDisplay);
  }
  layerCartProductPrice() {
    return cy.xpath(selectors.layerCartProductPrice);
  }
}
export default Product;

// Importing page objects for better organization and readability
import Login from "../pageObjects/loginPage/login";
import Checkout from "../pageObjects/checkoutPage/checkout";
import Header from "../pageObjects/headerPage/header";
import Product from "../pageObjects/prodcutPage/product";
import Signup from "../pageObjects/signup/signup";

// Moment.js library for date/time manipulation
const moment = require("moment");

// Variables to store user credentials
var email = "";
var password = "";

// Creating instances of page objects
const login = new Login();
const checkout = new Checkout();
const product = new Product();
const header = new Header();
const signup = new Signup();

// Test suite for signup functionality
describe("Signup", function () {

  before("", () => {
    // Code to execute before the tests in this suite
  });

  beforeEach("", () => {
    // Restoring local storage to maintain state between tests
    cy.restoreLocalStorage();
  });

  it("should test signup functionality", function () {
    // Visiting the signup page and filling the signup form
    cy.customeVisit("http://www.automationpractice.pl/index.php?controller=authentication&back=my-account");
    let userData = signup.fillSigupForm();
    email = userData.email.toLowerCase();
    password = userData.password;
    // Clicking the My Profile button and saving local storage
    header.myProfileButtonButton().should("be.visible").click();
    cy.saveLocalStorage();
  });
});

// Test suite for login functionality
describe("Login", function () {

  before("", () => {
    // Code to execute before the tests in this suite
  });

  beforeEach("", () => {
    // Restoring local storage to maintain state between tests
    cy.restoreLocalStorage();
  });

  it("should sign in with wrong data", function () {
    // Visiting the login page and attempting login with incorrect credentials
    cy.customeVisit("http://www.automationpractice.pl/index.php?controller=authentication&back=my-account");
    login.fillSignForm("wrong@mail.com", "worng");
    cy.wait("@userInfo").then((intercept) => {
      // Verifying the response status and error message
      expect(intercept.response.statusCode).to.eq(200);
      login.alert().then((el => {
        expect(el.text()).to.contain("Authentication failed");
      }));
    });
  });

  it("should sign in", function () {
    // Visiting the login page and logging in with correct credentials
    cy.customeVisit("http://www.automationpractice.pl/index.php?controller=authentication&back=my-account");
    login.fillSignForm(email, password);
    cy.wait("@userInfo").then((intercept) => {
      // Verifying the response status after successful login
      expect(intercept.response.statusCode).to.eq(302);
    });
    header.myProfileButtonButton().should("be.visible");
  });
});

// Test suite for the purchase/checkout flow
describe("Buy", function () {

  before("", () => {
    // Saving local storage to maintain login state
    cy.saveLocalStorage();
  });

  beforeEach("", () => {
    // Visiting the login page and logging in with stored credentials
    cy.customeVisit("http://www.automationpractice.pl/index.php?controller=authentication&back=my-account");
    login.fillSignForm(email, password);
    // Restoring local storage to maintain state between tests
    cy.restoreLocalStorage();
  });

  it("should test the checkout flow", function () {
    // Variables to store product prices
    let priceDisplayed = 0;

    // Visiting a product page, adding it to the cart, and verifying prices
    cy.customeVisit("http://www.automationpractice.pl/index.php?id_product=1&controller=product");
    product.addToCartButton().click();
    product.ourPriceDisplay().then((el => {
      priceDisplayed = el.text();
    })).then(() => {
      // Waiting for the cart layer to appear and verifying the product price
      cy.wait(5000);
      product.layerCartProductPrice().then((el => {
        expect(el.text()).to.be.eq(priceDisplayed);
      }));
    }).then(() => {
      // Proceeding to checkout and filling the address form
      product.proceedToCheckout().click();
      checkout.totalProductPrice().then((el => {
        expect(el.text().replace(/(\r\n|\n|\r|\t)/gm, "")).to.be.eq(priceDisplayed);
      })).then(() => {
        checkout.checkoutButton().click();
      }).then(() => {
        checkout.fillAddressForm();
      });
    });
  });
});

var selectors = require("./selectors");
class login {
  email() {
    return cy.xpath(selectors.emailInput);
  }
  password() {
    return cy.xpath(selectors.passwordInput);
  }
  signInButton() {
    return cy.xpath(selectors.submitButton);
  }
  alert() {
    return cy.xpath(selectors.alert);
  }
  fillSignForm(user,pass){
    this.email().should("be.visible").clear().type(user)
    this.password().should("be.visible").clear().type(pass);
    cy.intercept({
      url: "http://www.automationpractice.pl/index.php?controller=authentication",
      method: "POST",
    }).as("userInfo"); //to check the login done successfully after login get the user data to make sure everything working fine
    this.signInButton().should("be.visible").click();

  }
}
export default login;

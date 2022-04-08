it("check stupid app", () => {
  cy.visit("http://localhost:3000/login");
  cy.contains("li", "Login").click();
  cy.contains("button", "Cancel").click();
  cy.contains("li", "Login").click();
  cy.contains("button", "Login").click();
  cy.contains("label", "username").type("nikola");
  cy.get("[data-cy=password]").type("123");
  cy.contains("button", "Login").click();
});

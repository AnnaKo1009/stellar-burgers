/// <reference types="cypress" />

// Добавление ингредиента в конструктор по названию
Cypress.Commands.add('addIngredient', (ingredientName) => {
  cy.contains(ingredientName).parent().find('button').click();
});

// Закрытие модального окна
Cypress.Commands.add('closeModal', () => {
  cy.get('[data-testid="modal-close"]').click();
  cy.get('[data-testid="modal"]').should('not.exist');
});

// Проверка очистки конструктора
Cypress.Commands.add('checkConstructorCleared', () => {
  cy.contains('Выберите начинку', { timeout: 10000 }).should('exist');
  cy.contains('Выберите булки', { timeout: 10000 }).should('exist');
  cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
});

// Авторизация пользователя
Cypress.Commands.add('loginUser', () => {
  cy.intercept('GET', '**/api/auth/user', {
    statusCode: 200,
    body: {
      success: true,
      user: { email: 'test@test.com', name: 'Test User' }
    }
  }).as('getUser');

  cy.setCookie('accessToken', 'mock-access-token');
  cy.reload();
  cy.wait('@getUser');
});
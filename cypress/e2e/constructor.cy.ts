export const testURL = 'http://localhost:4000/';

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit(testURL);
    cy.wait('@getIngredients');
  });

  describe('Модальное окно ингредиента', () => {
    it('открытие и закрытие модального окна ингредиента', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.closeModal();
    });

    it('отображение правильного ингредиента в модальном окне', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-testid="modal"]')
        .should('contain.text', 'Краторная булка N-200i')
        .should('contain.text', '420')
        .should('contain.text', '80')
        .should('contain.text', '53');
    });
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('добавление булки в конструктор', () => {
      cy.addIngredient('Краторная булка N-200i');
      cy.get('[data-testid="constructor-bun-top"]')
        .should('contain.text', 'Краторная булка N-200i')
        .should('not.contain.text', 'Выберите булки');
    });

    it('добавление начинки в конструктор', () => {
      cy.addIngredient('Краторная булка N-200i');
      cy.addIngredient('Биокотлета из марсианской Магнолии');
      cy.get('[data-testid="constructor-ingredients"]')
        .should('contain.text', 'Биокотлета')
        .should('not.contain.text', 'Выберите начинку');
    });
  });

  describe('Создание заказа', () => {
    it('редирект на страницу логина при неавторизованном пользователе', () => {
      cy.addIngredient('Краторная булка N-200i');
      cy.addIngredient('Биокотлета из марсианской Магнолии');
      cy.get('[data-testid="order-button"]').click();
      cy.url().should('include', '/login');
    });

    it('создание заказа после авторизации', () => {
      cy.intercept('POST', '**/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      cy.loginUser();
      cy.addIngredient('Краторная булка N-200i');
      cy.addIngredient('Биокотлета из марсианской Магнолии');

      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]').should('contain', '12345');
      cy.contains('идентификатор заказа').should('be.visible');
      cy.contains('Ваш заказ начали готовить').should('be.visible');

      cy.closeModal();
      cy.checkConstructorCleared();
    });
  });
});

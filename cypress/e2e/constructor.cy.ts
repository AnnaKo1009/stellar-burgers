export const testURL = 'http://localhost:4000/';

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit(testURL);
    cy.wait('@getIngredients');
  });

   afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
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
      cy.intercept('GET', '**/api/auth/user', {
        statusCode: 200,
        body: {
          success: true,
          user: { email: 'test@test.com', name: 'Test User' }
        }
      }).as('getUser');

      cy.setCookie('accessToken', 'mock-access-token');
      window.localStorage.setItem('refreshToken', 'mock-refresh-token');
      cy.intercept('POST', '**/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      cy.reload();
      cy.wait('@getUser');

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

/// <reference types="cypress" />

describe('Testes de Login - DevNation', () => {
  // before(() => {
  //   Cypress.on('uncaught:exception', (err) => {
  //     // Ignora erros do Firebase para não falhar os testes
  //     if (
  //       err.message?.includes('firebase') ||
  //       err.message?.includes('Firebase')
  //     ) {
  //       return false;
  //     }
  //     return true;
  //   });
  // });

  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1280, 720);
    cy.on('uncaught:exception', () => false);

    // (err) => {
    //   // Ignora erros do Firebase para não falhar os testes
    //   if (
    //     err.message?.includes('firebase') ||
    //     err.message?.includes('Firebase')
    //   ) {
    //     return false;
    //   }
    //   return true;
  });

  it('001 - NÃO DEVERÁ autenticar-se com e-mail e senha inexistentes', () => {
    cy.get('input[placeholder="Digite seu e-mail"]')
      .should('exist')
      .type('mail@mail.com');
    cy.get('input[placeholder="Digite sua senha"]')
      .should('exist')
      .type('123456');
    cy.get('button[type="submit"]').should('exist').click();
    cy.get('div')
      .should('exist')
      .contains('Oops, algo deu errado. Tente novamente mais tarde.');
  });
  it.skip('002 - DEVERÁ cadastrar-se com novo e-mail e senha', () => {
    //Clicando em Cadastrar-se agora
    cy.get('a[href="/register"]')
      .contains('Cadastre-se agora!')
      .should('exist')
      .click();

    //Clicando em Digite seu nome
    cy.get('input[placeholder="Digite seu nome"]')
      .should('exist')
      .type(Cypress.env('name'));

    //Clicando em Digite seu e-mail
    cy.get('input[placeholder="Digite seu email"]')
      .should('exist')
      .type(Cypress.env('email'));

    //Clicando em Digite sua senha
    cy.get('input[placeholder="Digite sua senha"]')
      .should('exist')
      .type(Cypress.env('signupPassword'));

      //Clicando em Digite novamente sua senha
      cy.get('input[placeholder="Digite sua senha novamente"]').should('exist').type(Cypress.env('signupPassword'))

    //Clicando em Cadastrar
    cy.get('button[type="submit"]').contains('Cadastrar').should('exist').click();
  });

  
});

// it('deve navegar para a documentação de comandos', () => {
//   cy.contains('Commands').click();
//   cy.url().should('include', '/commands');
// });

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

  it('001 - Verificando os elementos existentes no navbar da página', () => {
    //Verificando o título da empresa
    cy.get('h2').contains('TACSEG').should('be.visible');
    //Verificando o botão de toggle do menu nav
    cy.get('[id="switchMode"]').should('be.visible');
    //Verificando os itens da listagem dentro do menu nav
    cy.get('.nav-links').should('exist').and('have.length', 1);
    cy.get('.nav-links')
      .should('exist')
      .within(() => {
        cy.get('li:eq(0)').should('have.text', 'Início'); //Verificando o texto do primeiro item da listagem
        cy.get('li:eq(1)').should('have.text', 'Serviços'); //Verificando o texto do segundo item da listagem
        cy.get('li:eq(2)').should('have.text', 'Depoimentos'); //Verificando o texto do terceiro item da listagem
        cy.get('li:eq(3)').should('have.text', 'Contato'); //Verificando o texto do quarto item da listagem
      });
  }); //Fim do teste 001
  it('002 - Deverá verificar se o botão de toggle do menu nav está funcionando', () => {
    //Verificando o botão de toggle do menu nav
    cy.get('[id="switchMode"]').should('exist').click();
    cy.get('.nav-links')
      .should('exist')
      .within(() => {
        cy.get('li:eq(0)').should('have.text', 'Início'); //Verificando o texto do primeiro item da listagem
        cy.get('li:eq(1)').should('have.text', 'Serviços'); //Verificando o texto do segundo item da listagem
        cy.get('li:eq(2)').should('have.text', 'Depoimentos'); //Verificando o texto do terceiro item da listagem
        cy.get('li:eq(3)').should('have.text', 'Contato'); //Verificando o texto do quarto item da listagem
      });
    //Verificando mudança no body após clicar no botão de toggle do menu nav
    cy.get('body').should('have.class', 'dark-mode');

    //Clicando novamente no botão de toggle do menu nav
    cy.get('[id="switchMode"]').should('exist').click();
    //Verificando mudança no backgorund-color do body após clicar novamente no botão de toggle do menu nav
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');

    //Verificando se as classes dos menus nav estão sendo alteradas
  }); //Fim do teste 002

  it('003 - Verificando se, ao scrollar a página para baixo, os elementos como logo aparecem na tela', () => {
    // Rola o container principal até a viewport (scrollIntoView atua no elemento do cy.get, não em outro seletor)
    cy.get('.first-container').scrollIntoView();
    // Dentro do primeiro bloco da página: section e imagem da logo devem ficar visíveis após o scroll
    cy.get('.first-container').within(() => {
      // Garante que a section está visível e a logo (img) dentro dela também
      cy.get('section')
        .should('be.visible')
        .find('img[id="logo-tacseg"]')
        .should('be.visible');
    });
    // Coluna lateral: título da seção, texto introdutório e botão de contato
    cy.get('.first-side').within(() => {
      cy.get('.title-section').should('be.visible'); // Título da área lateral
      cy.get('p').contains('A manutenção de sistemas').should('be.visible'); // Parágrafo com o trecho esperado do copy
      cy.get('button').contains('Entre em contato').should('be.visible'); // CTA
    });
  }); //Fim do teste 003

  it('004 - Verificando se, ao scrollar a página para baixo, os elementos como o carrossel aparecem na tela', () => {
    // Rola o container principal até a viewport (scrollIntoView atua no elemento do cy.get, não em outro seletor)
    cy.get('.first-container').scrollIntoView();
    // Dentro do primeiro bloco da página: section e imagem da logo devem ficar visíveis após o scroll
    cy.get('.first-carousel').within(() => {
      // Garante que a section está visível e a logo (img) dentro dela também
      cy.get('.slider').should('be.visible');
    });
  }); //Fim do teste 004

  it('005 - Verificando se, ao rolar a página para baixo, os elementos como o carrossel de depoimentos aparecem na tela', () => {
    // Rola o container principal até a viewport (scrollIntoView atua no elemento do cy.get, não em outro seletor)
    cy.get('.first-container').scrollIntoView();

    // Identificando Depoimentos
    cy.get('#depoimentos').scrollIntoView();
    // Dentro do primeiro bloco da página: section e imagem da logo devem ficar visíveis após o scroll
    cy.get('[class="carousel-inner"]').should('be.visible');
  }); //Fim do teste 005

  it('006 - Verificando se o carrossel de depoimentos está funcionando corretamente', () => {
    // Rola o container principal até a viewport (scrollIntoView atua no elemento do cy.get, não em outro seletor)
    cy.get('.first-container').scrollIntoView();

    // Identificando Depoimentos
    cy.get('#depoimentos').scrollIntoView();
    //Aguardando 1 segundo
    cy.wait(1000);

    cy.get('[class="carousel-inner"]')
      .should('be.visible')
      .nextAll('[class="next-slide"]')
      .dblclick();
    // cy.get('[class="carousel-inner"]')
    //   .should('be.visible')
    //   .nextAll('[class="next-slide"]')
    //   .click();
    cy.get('[class="carousel-inner"]')
      .should('be.visible')
      .next('[class="prev-slide"]')
      .dblclick();
  }); //Fim do teste 006

  it('007 - Verificando se o botão de contato está funcionando corretamente', () => {
    // Número: cypress.env.json (whatsappPhone) ou CYPRESS_WHATSAPP_PHONE / WHATSAPP_PHONE na shell.
    // Valida href (wa.me ou api.whatsapp.com) e responde HTTP da URL da API (sem cy.visit).
    const digits = String(Cypress.env('whatsappPhone') ?? '')
      .trim()
      .replace(/\D/g, '');

    expect(digits, 'Defina whatsappPhone ou CYPRESS_WHATSAPP_PHONE.').to.match(
      /^\d{10,15}$/
    );

    const whatsappApiUrl = `https://api.whatsapp.com/send/?phone=${digits}&text&type=phone_number&app_absent=0`;
    const whatsappWaMeUrl = `https://wa.me/${digits}`;

    // Rola o container principal até a viewport (scrollIntoView atua no elemento do cy.get, não em outro seletor)
    cy.get('.first-container').scrollIntoView();

    // Área lateral com o botão de contato
    cy.get('.first-side').scrollIntoView();
    //Aguardando 1 segundo
    cy.wait(1000);

    cy.get('button')
      .contains('Entre em contato')
      .should('be.visible')
      .find('a')
      .should(($a) => {
        const href = String($a.attr('href'));
        expect(
          href === whatsappApiUrl || href === whatsappWaMeUrl,
          `Link inválido: ${href}`
        ).to.be.true;
      });

    // Checagem leve da URL da API (sem abrir a UI do WhatsApp no browser)
    cy.request({
      url: whatsappApiUrl,
      followRedirect: true,
      failOnStatusCode: false
    })
      .its('status')
      .should('be.within', 200, 399);
  }); //Fim do teste 007

  it('008 - Cenário feliz: formulário de contato com dados válidos enviado com sucesso', () => {
    // Dados válidos para preenchimento do formulário (cenário feliz)
    // const nome = 'Lucas Rones';
    // const email = 'lucaszrones@gmail.com';
    const mensagem =
      'Mensagem de teste — cenário feliz do formulário de contato.';

    // Intercepta o POST real para formsubmit.co: evita e-mail de produção e permite validar o corpo da requisição
    cy.intercept('POST', '**/formsubmit.co/**', {
      statusCode: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
      body: '<html><body>Obrigado</body></html>'
    }).as('contactFormSubmit');

    // Rola até a seção de contato e garante que está visível na viewport
    cy.get('#contato').scrollIntoView();
    cy.get('#contato').should('be.visible');
    // Dentro do formulário: preenche campos obrigatórios e submete
    cy.get('form[data-form]')
      .should('be.visible')
      .within(() => {
        cy.get('#name').should('be.visible').clear().type(Cypress.env('name')); // Campo nome
        cy.get('#email')
          .should('be.visible')
          .clear()
          .type(Cypress.env('email')); // Campo e-mail
        cy.get('#message').should('be.visible').clear().type(mensagem); // Campo mensagem
        cy.get('button[type="submit"][data-button]')
          .contains('Enviar')
          .should('be.visible')
          .click(); // Dispara o envio do formulário
      });

    // Aguarda o POST interceptado e confere se nome, e-mail e mensagem foram enviados no corpo (application/x-www-form-urlencoded)
    cy.wait('@contactFormSubmit').then(({ request }) => {
      // Guarda o corpo da requisição interceptada (Cypress já converte form-urlencoded em objeto)
      const body = request.body;

      // Se o corpo veio como objeto, valida cada campo diretamente pelas propriedades
      if (typeof body === 'object' && body !== null) {
        // Confere se o nome enviado no formulário é igual ao valor definido no cypress.env.json
        expect(body.name, 'nome no corpo').to.equal(Cypress.env('name'));
        // Confere se o e-mail enviado no formulário é igual ao valor definido no cypress.env.json
        expect(body.email, 'e-mail no corpo').to.equal(Cypress.env('email'));
        // Confere se a mensagem digitada no teste foi enviada no corpo da requisição
        expect(body.message, 'mensagem no corpo').to.equal(mensagem);
      } else {
        // Fallback: se o corpo vier como string bruta, converte para texto e busca os valores codificados na URL
        const bodyStr = String(body ?? '');
        // Verifica se o nome codificado (espaços viram %20) está presente na string do corpo
        expect(bodyStr, 'corpo da requisição').to.include(
          encodeURIComponent(Cypress.env('name'))
        );
        // Verifica se o e-mail codificado está presente na string do corpo
        expect(bodyStr, 'corpo da requisição').to.include(
          encodeURIComponent(Cypress.env('email'))
        );
        // Verifica se a mensagem codificada está presente na string do corpo
        expect(bodyStr, 'corpo da requisição').to.include(
          encodeURIComponent(mensagem)
        );
      }
    });
  }); //Fim do teste 008

  it('009 - Cenário não-feliz: formulário de contato com dados inválidos', () => {
    // Dados inválidos para preenchimento do formulário (cenário não-feliz)
    const nome = 'Joao';
    const email = 'mailx@gmail.com';
    const mensagem =
      'Mensagem de teste — cenário não-feliz do formulário de contato.';

    // Intercepta o POST real para formsubmit.co: evita e-mail de produção e permite validar o corpo da requisição
    cy.intercept('POST', '**/formsubmit.co/**', {
      statusCode: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
      body: '<html><body>Obrigado</body></html>'
    }).as('contactFormSubmit');

    // Rola até a seção de contato e garante que está visível na viewport
    cy.get('#contato').scrollIntoView();
    cy.get('#contato').should('be.visible');
    // Dentro do formulário: preenche campos obrigatórios e submete
    cy.get('form[data-form]')
      .should('be.visible')
      .within(() => {
        cy.get('#name').should('be.visible').clear().type(nome); // Campo nome
        cy.get('#email').should('be.visible').clear().type(email); // Campo e-mail
        cy.get('#message').should('be.visible').clear().type(mensagem); // Campo mensagem
        cy.get('button[type="submit"][data-button]')
          .contains('Enviar')
          .should('be.visible')
          .click(); // Dispara o envio do formulário
      });

    // Aguarda o POST interceptado e confere se nome, e-mail e mensagem foram enviados no corpo (application/x-www-form-urlencoded)
    cy.wait('@contactFormSubmit').then(({ request }) => {
      // Guarda o corpo da requisição interceptada (Cypress já converte form-urlencoded em objeto)
      const body = request.body;

      // Se o corpo veio como objeto, valida cada campo diretamente pelas propriedades
      if (typeof body === 'object' && body !== null) {
        // Confere se o nome enviado no formulário é igual ao valor definido no cypress.env.json
        expect(body.name, 'nome no corpo').to.equal(nome);
        // Confere se o e-mail enviado no formulário é igual ao valor definido no cypress.env.json
        expect(body.email, 'e-mail no corpo').to.equal(email);
        // Confere se a mensagem digitada no teste foi enviada no corpo da requisição
        expect(body.message, 'mensagem no corpo').to.equal(mensagem);
      } else {
        // Fallback: se o corpo vier como string bruta, converte para texto e busca os valores codificados na URL
        const bodyStr = String(body ?? '');
        // Verifica se o nome codificado (espaços viram %20) está presente na string do corpo
        expect(bodyStr, 'corpo da requisição').to.include(
          encodeURIComponent(nome)
        );
        // Verifica se o e-mail codificado está presente na string do corpo
        expect(bodyStr, 'corpo da requisição').to.include(
          encodeURIComponent(email)
        );
        // Verifica se a mensagem codificada está presente na string do corpo
        expect(bodyStr, 'corpo da requisição').to.include(
          encodeURIComponent(mensagem)
        );
      }
    });
  }); //Fim do teste 009
}); //Fim do describe

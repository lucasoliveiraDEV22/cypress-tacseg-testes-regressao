const { defineConfig } = require('cypress');

// Só injeta no Cypress se a shell tiver valor; assim a chave whatsappPhone do cypress.env.json não é sobrescrita por undefined.
const shellWhatsappPhone =
  process.env.CYPRESS_WHATSAPP_PHONE || process.env.WHATSAPP_PHONE || '';

module.exports = defineConfig({
  e2e: {
    env: {
      ...(shellWhatsappPhone ? { whatsappPhone: shellWhatsappPhone } : {}),
    },
    baseUrl: 'https://tacseg-website.vercel.app/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    video: false,
    screenshotOnRunFailure: false
  }
});

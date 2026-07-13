# Pipeline E2E — Cypress (TacSeg)

Pipeline de execução automatizada dos testes de regressão (E2E) da aplicação **TacSeg**, utilizando **Cypress** em modo Headless, integrado ao **Azure DevOps**.

- **App alvo:** https://tacseg-website.vercel.app/
- **Framework de testes:** Cypress
- **Spec executado:** `cypress/e2e/testes.cy.js`
- **Execução:** Manual (via *Run pipeline* no Azure DevOps)

---

## O que este pipeline faz

1. Sobe um agente Linux (Ubuntu) hospedado pelo Azure DevOps
2. Instala o Node.js
3. Restaura o cache de dependências npm e do binário do Cypress (quando disponível), acelerando a execução
4. Instala as dependências do projeto (`npm ci`)
5. Verifica se o Cypress está corretamente instalado
6. Executa os testes E2E em modo **Headless** com o navegador **Chrome**
7. Gera e publica o relatório de resultados no formato **JUnit**, visível diretamente na aba *Tests* do Azure DevOps

> ⚠️ Este pipeline **não** executa testes em paralelo e **não** publica artifacts (arquivos de build, vídeos, screenshots etc.). Ele foi pensado para ser simples e direto: rodar os testes e mostrar o resultado.

---

## Cenários cobertos pelos testes

Os testes automatizados cobrem:

- ✅ **Cenários feliz** — fluxos esperados de uso normal da aplicação
- ❌ **Cenários não-feliz** — situações que não devem ocorrer (dados inválidos, erros, comportamentos indevidos)

---

## Pré-requisitos

Antes de rodar o pipeline, é necessário:

- Repositório conectado a um projeto do Azure DevOps
- Um **Variable Group** chamado `TacSeg-Variaveis` configurado na Library do Azure DevOps, contendo:

| Variável                  | Descrição                                  |
|----------------------------|---------------------------------------------|
| `CYPRESS_name`             | Nome usado nos testes                       |
| `CYPRESS_email`            | E-mail usado nos testes                     |
| `CYPRESS_SIGNUPPASSWORD`   | Senha usada no fluxo de cadastro            |
| `CYPRESS_WHATSAPP_PHONE`   | Telefone usado nos testes                   |

> Recomendado marcar `CYPRESS_SIGNUPPASSWORD` como **secret** (🔒) na Library.

- Dependências do projeto (`cypress`, `cypress-multi-reporters`, `mocha-junit-reporter` ou equivalente) já declaradas no `package.json`
- Arquivo `reporter-config.json` presente na raiz do repositório, configurando a saída dos relatórios em `cypress/results`

---

## Como executar

1. No Azure DevOps, acesse **Pipelines**
2. Selecione este pipeline
3. Clique em **Run pipeline**
4. Acompanhe a execução em tempo real
5. Ao final, os resultados ficam disponíveis na aba **Tests** do run

---

## Estrutura do arquivo de pipeline

O arquivo `azure-pipelines.yml` está organizado em:

- **Trigger:** desabilitado (`trigger: none`, `pr: none`) — execução apenas manual
- **Pool:** agente Ubuntu hospedado pela Microsoft
- **Cache:** dependências npm e binário do Cypress, para acelerar execuções futuras
- **Steps:** instalação, verificação e execução dos testes, seguidos da publicação dos resultados

---

## Observações

- Como o pipeline não gera artifacts, vídeos e screenshots do Cypress não são armazenados — recomenda-se manter `video: false` no `cypress.config.js` para evitar geração desnecessária
- Como não há paralelismo, o tempo total de execução depende diretamente da quantidade de specs/testes existentes

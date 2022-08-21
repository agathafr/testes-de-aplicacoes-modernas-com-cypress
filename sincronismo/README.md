# Sincronismo
 
## Entendendo a espera do Cypress

Como o cypress gerencia a espera?

Como sincroniza script e aplicação durante o teste?

Simples e transparente mas tem especificidades. 

```bash
it('Deve aguardar elemento estar disponível', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').type('funciona')
})
```

![image](https://user-images.githubusercontent.com/85461130/185789314-17bc2591-744a-4bed-b30f-9e7487f56243.png)

O cypress aguarda um elemento demorado aparecer na tela mas tem um limite de espera por ele. Gerencia a espera inicial melhor que o Selenium no sentido de que já logo seria necessário criar uma estratégia de sincronização e espera no script para que o teste não falhasse por não ter encontrado o elemento. Similar ao código abaixo:

```bash
it('Deve aguardar o elemento estar disponível', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona')
})
```

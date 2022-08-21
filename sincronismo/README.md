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
## Retentativas
Como o cypress faz esperas baseado no conceito de "Retentativas"

Cypress faz retrys para garantir que cenários e assertivas estão corretas. 

![image](https://user-images.githubusercontent.com/85461130/185790175-abc65f42-c1b6-4f8a-a9e8-fcfba1a1aea2.png)

No get, se houver uma assertiva errada, vai falhar. Repete até tentar retornar que todas são verdadeiras. 

Em todos os métodos da API, tem uma seção relacionada aos "yields". Descreve o que o método vai retornar para fazer o encademaento. Somente se o retorno for o mesmo objeto, é possível fazer o encadeamento. 
https://docs.cypress.io/api/commands/should#Arguments

```bash
it.only('Deve fazer retrys', () => {
      cy.get('#buttonDelay').click()
      cy.get('#novoCampo')
          .should('not.exist') // não funciona
          .should('exist')
          .type('funciona')
  })
```
No caso acima o encadeamento num mesmo get() não funciona porque o retorno de verificações opostas é difente. ".should('not.exist')" devolve um null e ".should('exist')" localiza o elemento. O get só passa se todas as asserções forem válidas. 

```
it('Deve fazer retrys', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona')
})
    
it('Deve fazer retrys', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo')
        .should('exist')
        .type('funciona')
})
```

Escrito das formas acima, funciona.

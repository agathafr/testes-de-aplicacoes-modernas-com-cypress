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

## Cuidado com o que busca

### .find()
Pega o elemento DOM descendente de um seletor específico.

```bash
cy.get('#lista li')
     .find('span')
     .should('contain', 'Item 1')
```
span descende de li que descende de ul (identificado pelo id #lista)

```bash
it.only('Uso do find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 1')

    cy.get('#lista li')
    .find('span')
    .should('contain', 'Item 2')
})
```
Seu uso não é interessante nos casos em que a página vai carregando aos poucos porque o cypress vai fixar a retentativa de localização no comando imediatamente anterior a assertiva. No exemplo acima, no .find(). Como o comando de localização cy.get() encontra primeiro o item 1 completo e, após, o comando .find() reduz o escopo da busca para apenas o local ondem contém o texto do item 1, quando a expectativa da assertiva não é atendida, o comando que fica sendo repetido é o .find() que está preso no escopo do item 1. 

![image](https://user-images.githubusercontent.com/85461130/185807039-d44b2abd-720f-48fd-930a-5203db5f430b.png)

```bash
cy.get('#lista li span')
    .should('contain', 'Item 2')
```
A solução nesse caso, seria colocar a estratégia de localização completa no .get() porque sendo o comando imediatamente anterior a assertiva, a busca completa será feita sendo possível encontrar o conteúdo esperado especificado no comando .should().

![image](https://user-images.githubusercontent.com/85461130/185807165-7083669c-52d7-42c3-a878-fc87ceae2438.png)

#### Outro cenário 

```bash
it.only('Uso do find', () => {
    cy.get('#buttonListDOM').click()
    cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 1')

    cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 2')
})
```
![image](https://user-images.githubusercontent.com/85461130/185807356-98cdc8e0-299e-4062-81a0-9f39e55c48c2.png)

A falha do exemplo acima comprova que o .find(), encadeado da forma que está, se fixa num elemento. O cenário é o clique em um botão que faz com que uma lista com 2 itens seja carregada. Com a particularidade de que, quando o item 2 é carregado, o item 1 é apagado e reincluso juntamente com o item 2. A falha descrita é que o elemento que ele estava buscando foi removido do DOM, ou seja, ele estava apenas verificando o item 1 que foi incluso a princípio (antes da inclusão do item2 deletá-lo para incluir um novo).  

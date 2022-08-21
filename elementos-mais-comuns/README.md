# Elementos mais comuns
#### Aula: Como trabalhar com os diversos componentes HTML

## Texto
Verificar se o texto está correto é a asserção mais comum. 

```bash
/// <reference types="cypress" />

describe('Work with basic elements', () => {
    
    it('Texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })
})
```
### 'have.text'

```bash
cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
```
Espera encontrar o texto completo. 

## Links e botões
```bash
it.only('Links', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
```
### .reload()

```bash
cy.reload()
```
Recarrega a página

### .contains()
```bash
cy.contains()
```
É uma alternativa ao cy.get para colocar a estratégia de localização do elemento. Mas não é tão recomendada caso haja outra forma de localização porque faz uma busca direta e num caso, por exemplo, de recurso de internacionalização, onde o texto pode estar em outro idioma, pode ocorrer falha. 

## Hooks
Refatora para eliminar repetições.

```bash
describe('Work with basic elements', () => {
    
    it('Texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it.only('Links', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
})
```
### before()
Garante que o que contém será herdado por todos os testes do grupo. É executado apenas uma vez antes do primeiro teste.

```bash
describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Texto', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
})
```
![image](https://user-images.githubusercontent.com/85461130/185785157-d6c25f54-4b5c-445b-ade6-fad668f75779.png)


### beforeEach()
Executa o seu conteúdo antes de cada teste. 

```bash
describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Texto', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
})
``` 
![image](https://user-images.githubusercontent.com/85461130/185785126-3fb57a27-b480-462d-88d1-0ab03627532b.png)

### Teste externo

É executado antes dos contidos em grupo.

![image](https://user-images.githubusercontent.com/85461130/185785213-a37bdd55-aa60-4703-9c89-cee3c5e5e41a.png)

### Comportamento do before() em grupos distintos, sendo 1 externo

O "BEFORE ALL" é particular de cada grupo.

```bash
describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Texto', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
})

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
    })

    it('externo', () => {

    })
})
```
![image](https://user-images.githubusercontent.com/85461130/185785395-919c985f-9e3e-4f01-a6f7-7ca4e927a42e.png)

### Comportamento do beforeEach em um grupo interno a outro
```bash
/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Texto', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
    
    describe('Work with basic elements', () => {
        before(() => {
            cy.visit('https://wcaquino.me/cypress/frame.html')
        })
    
        it('externo', () => {
    
        })
    })
})
```
![image](https://user-images.githubusercontent.com/85461130/185785472-296d8b3a-0f41-439d-b934-8d765f89405d.png)

O before() é específico e o beforeEach() é herdado do grupo mais externo

## Campos de texto

São aqueles que permitem a inserção de valores.
```bash
it.only('TextFields', () => {
    cy.get('#formNome').type('Cypress Test')
    cy.get('#formNome').should('have.value', 'Cypress Test')
    })
```

### .type()
```bash
cy.get('#formNome').type('Cypress Test')
```
Preenche um campo de texto com algum valor.

### 'have.value'
```bash
should('have.value', 'Cypress Test')
```
Verifica se o conteúdo de um campo de texto contém o valor especificado no segundo parâmetro. Um texto em um input text, text field, não fica acessível com o 'have.text' porque fica no atributo "value" do campo input. 

### Localizador de id
```bash
cy.get('#elementosForm\\:sugestoes')
```
Caso possua ":" e apenas uma \, é preciso incluir mais uma \, conforme código acima.

### {backspace}
```bash
.type('Teste12345{backspace}{backspace}')
```
Apaga um caractere digitado.

### {selectall} e { delay: 100 }
```bash
.type('Erro{selectall}acerto', { delay: 100 })
```
Seleciona todo o valor digitado em um campo e atrasa a execução da ação. 

### Encadeamento

```bash
it.only('TextFields', () => {
    cy.get('#formNome').type('Cypress Test')
    cy.get('#formNome').should('have.value', 'Cypress Test')

    cy.get('#elementosForm\\:sugestoes')
        .type('textarea')
        .should('have.value', 'textarea')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6)')
        .type('???')

    cy.get('[data-cy=dataSobrenome]')
        .type('Teste12345{backspace}{backspace}')
        .should('have.value', 'Teste123')

    cy.get('#elementosForm\\:sugestoes')
        .clear()
        .type('Erro{selectall}acerto', { delay: 100 })
        .should('have.value', 'acerto')
    })
```

Evita a repetição do localizador.

## Radio
O elemento radio button fica agrupado para permitir somente uma marcação. Indica ao usuário que deve fazer uma escolha entre opções. Não é possível selecionar mais de uma. 

```bash
it('RadioButton', () => {
    cy.get('#formSexoFem') // localização
        .click() // interação
        .should('be.checked') // verificação

    cy.get('#formSexoMasc').should('not.be.checked')

    cy.get('[name=formSexo]').should('have.length', 2) 
    })
```

### Busca por propriedade

```bash
[name=formSexo]
```
É feita entre colchetes

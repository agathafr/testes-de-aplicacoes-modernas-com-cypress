/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        /* 
        Ao trabalhar com promise, não tem como receber o valor diretamente,
        é preciso lidar com ele de uma forma assíncrona. O cypress trabalha muito de
        forma assíncrona. Nem com assync await resolve. 

        const title = cy.title() não foi possível receber o valor por conta da assincronicidade
        console.log(title) é possível imprimir  DESAFIOS // TODO imprimir o log no console // TODO escrever o título num campo de texto
        */

        cy.title() // retorna um objeto Chainer, uma promise = Encadeador. após obtê-lo, encadeie a próxima ação desejada
        cy.title().should('be.equal', 'Campo de Treinamento') // should é uma estrutura preparada para receber o objeto Chainer, promise. Cria uma assertiva que funciona até que chegue ou passe de um timeout
        //quando retorna um erro, repetições são feitas como tentativas de atingir o resultado esperado até que atinja um timeout
        cy.title().should('contain', 'Campo')
        
        // ganha um pouco mais de tempo e legibilidade porque a busca por título é feita só uma vez
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})

it.only('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    
    cy.pause()

    cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .should('contain', 'Campo')
})
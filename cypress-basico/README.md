# Cypress

Pré-requisitos para ter o ambiente completo

- nodejs -> interpretador de arquivos javascript, responsável por fazer toda a execução. contém o npm, que gerencia os pacotes
- editor de texto (vscode) 
- cypress 

## Configurações do projeto

- Comando npm init -> Cria o arquivo package.json (npm init com o parâmetro -y, cria o arquivo com as configurações padrão)

## Adicionar o cypress como dependência para o projeto

- Na pasta criada, executar npm install cypress (instala a versão mais recente do site)
- Instalar a versão utilizada no curso (npm install cypress@3.6.0)

## Conteúdo inicial do projeto
node_modules -> contém todas as dependências necessárias <br>
package-lock.json <br>
package.json <br>

## Abertura do cypress
./node_modules/.bin/cypress open. A pasta "cypress" é criada e contém testes de exemplo dentro da pasta "integration"

### Outra forma de abrir
Editar o arquivo "package.json" e colocar o atributo "cypress:open": "cypress open" dentro da chave "scripts" (como o arquivo está localizado na pasta scripts, não é preciso colocar .bin, .node_modules porque ele vai encontrar tudo o que está lá dentro)

npm run cypress:open

## Nivelamento de javascript

#### Preparação
No projeto, ir até a pasta "integration" e criar um novo arquivo de teste seguindo o padrão "nome.spec.js"

### Aula "Arrow Functions" 

A arrow funtion consiste em uma forma diferente de escrever uma função (sem deixar a palavra "function" explicita). A sintaxe é a demonstrada no exemplo seguinte:

```bash
const soma = (a, b) => {
  return a + b
}
```
Os parâmetros são atribuídos a uma variável constante. Após a específicação dos parâmetros, os símbolos "=" e ">", que juntos "=>" se assemelham a uma "seta" (arrow), simbolizam a função e dipensam o uso da palavra "function". Após, são abertas {}, que contém internamente uma lógica. 

#### Variações de escrita

```bash
const soma = (a, b) => a + b
```

Nessa sintaxe, o retorno da função vem logo após a "arrow", sem a necessidade de escrita da palavra "return", que é necessária quando a lógica do retorno está dentro de chaves "{}".

```bash
const soma = a => a + a
```

Quando existe somente um parâmetro, o parênteses "()" é dispensável. 

```bash
const soma = () => 5 + 5
```

Se não existem parâmetros, a escrita dos parênteses "()" é indispensável. 

Uma diferença de execução importante entre a "function" e a "arrow function", é que a primeira, ao usar o this, referencia a quem a chamou, e a segunda, não varia, fica num escopo mais alto. 

```bash
it('a function test...', function() {
    console.log('Function', this)
}) 
```

Retorno no console
```console
Function Context {_runnable: Test, test: Test}test: undefined_runnable: undefined[[Prototype]]: Context[[Prototype]]: ObjectenableTimeouts: ƒ (enabled)inspect: ƒ ()retries: ƒ (n)runnable: ƒ (runnable)skip: ƒ ()slow: ƒ (ms)timeout: ƒ (ms)constructor: ƒ Context()[[Prototype]]: Object
```

```bash
it('an arrow test...', () => {
    console.log('Arrow', this)
})

```
Retorno no console
```console
Arrow undefined
```

## Promises 

Tratam solicitações demoradas como assíncronas para não interromper o funcionamento da aplicação enquanto espera um retorno. Com o conceito de assincronicidade, a aplicação continua rodando e quando houver uma resposta, ela é tratada conforme programado. Callback já foi utilizado com esse mesmo propósito, mas devido a camplicações em cenários onde há necessidade em utilizar muitos processos assíncronos aninhados, hoje em dia promises são recomendadas para simplificar esse cenário. 

#### Callback

```bash
const getSomething = callback => {
    setTimeout(() => {
        callback(12);
    }, 1000)
}
```
```bash
const system = () => {
    console.log('init');
    getSomething(some => console.log(`Something is ${some}`));
    console.log('end')
}
```

#### Promise
```bash
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    }) 
}
```

```bash
const system = () => {
    console.log('init');
    getSomething().then(some => {
        console.log(`Something is ${some}`)
    })
}
```

#### Async Await

Implementa promisses e deixa o uso simplificado. Como faz gerenciamento, tem um ciclo de vida, conceitos de retrys, não é recomendado o uso com cypress. Este precisa das promisses como descrito na documentação. 

```bash
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    }) 
}
```

```bash
const system = async () => {
    console.log('init');
    const some = await getSomething()
    console.log(`Something is ${some}`)
    console.log('end')
}
``` 

## Describe / it

### Aula: Estruturação dos arquivos de especificação com testes. Como usar o describe e o it. 

#### Preparação:
Adicionar a linha abaixo no topo do arquivo para que o vscode entenda que o cypress está sendo utilizado e a partir disso mostrar sugestões, destrições próximas a api do cypress. 

```
/// <reference types="cypress" />
```

##### Nota
O cypress vem com alguns frameworks embutidos (moca, chai) que colaboram com a estruturação dos testes e assertivas.

#### Estrutura
- it() -> da o escopo de um teste. Recebe como primeiro parâmetro o nome do teste, e como segundo a função que contém o teste (arrow function).
```bash
it ('Nome do teste', () => {
  // contém teste "da raiz do projeto"
})
```

- testes -> ficam dentro do escopo e corpo do teste, após a abertura da chave "{" e antes do fechamento "}" da mesma.

- describe() -> agrupa testes. Tem como primeiro parâmetro o nome que vai definir o grupo e como segundo a função que contém todos os testes do grupo. 
```bash
describe('Shold group tests...', () => {
  // contém todas os testes criados para esse grupo (internos)
  it('A internal test...', () => {
        
    })
})
```
![image](https://user-images.githubusercontent.com/85461130/185761802-004033db-8930-4052-a0d3-00178e2cd344.png)

É possível criar grupos dentro de grupos e mais de um teste em cada grupo.

```bash
describe('Should group tests...', () => {
    describe('Should group more specific tests...', () => {
        it('A specific test...', () => {

        })

        it('Another specific test...', () => {

        })
    })

    describe('Should group more specific tests 2...', () => {
        it('A specic test 2...', () => {
            
        })
    })

    it('A internal test...', () => {

    })
})
```

![image](https://user-images.githubusercontent.com/85461130/185762027-53ed85b5-2ec2-42b8-832f-9f81be8add0f.png)

- skip -> não executa um teste ou grupo. it.skip ou describe.skip
```bash
describe('Should group tests...', () => {
    describe.skip('Should group more specific tests...', () => {
        it('A specific test...', () => {

        })

        it('Another specific test...', () => {

        })
    })

    describe('Should group more specific tests 2...', () => {
        it('A specic test 2...', () => {

        })
    })

    it('A internal test...', () => {

    })
})
```

- only -> executa apenas o último teste ou grupo que o contém. it.only ou describe.only
```bash
it.only('A external test...', () => {

})
```
![image](https://user-images.githubusercontent.com/85461130/185762452-ca985b2f-5b81-4364-8ee4-0079ac5e93bc.png)

```bash
describe.only('Should group more specific tests...', () => {
    it('A specific test...', () => {

    })

    it('Another specific test...', () => {

    })
})
```
![image](https://user-images.githubusercontent.com/85461130/185762433-caaf4536-dc8f-4b5a-9167-9f3f131ec7bf.png)

## Assertivas

### Igualdade

```bash
/// <reference types="cypress" />

// Grupo de assertivas de igualdade entre variáveis simples e tipo de dados primitivos. 

it('Equality', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');
})
```

Erros na execução de um teste podem ocorrer na navegação, procurando por algo que não está na tela e por falha na verificação de um assertiva, isto é, a comparação entre o que era esperado e o que existia na tela.

```bash
expect(a).equal(b);
```

A expectativa pode receber como parâmetro, também uma mensagem descritiva do que é esperado.
```bash
expect(a, 'Deveria ser 1').equal(2);
```

![image](https://user-images.githubusercontent.com/85461130/185763576-892ef2aa-1361-42fe-9d51-12338b7dc08f.png)

### .to.be. e .not.to.be

Não alteram o comportamento das asserções e são formas de deixar a leitura das linhas do código mais fluídas. 

```bash
expect(a).to.be.equal(1);
```
Espera que o valor guardado por 'a' seja igual a 1.

```bash
expect('a').not.to.be.equal('b').
```
Espera que a string 'a' não seja igual a string 'b'

### Bolean

Asserção que espera verdadeiro ou falso. 

```bash
it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
})
```
### Igualdade entre objetos
```bash
it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.equal(obj)
    // expect(obj).to.be.equal({ a: 1, b: 2 })  // verifica as referências e falha porque são diferentes
    expect(obj).to.be.deep.equal( {a: 1, b: 2 }) // verifica as propriedades
    expect(obj).eql({ a: 1, b: 2 }) 
    expect(obj).include({ a: 1 })
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2)
    expect(obj).to.not.be.empty
    expect({}).to.be.empty
})
```
### Arrays
```bash
it('Arrays', () => {
    const arr = [1, 2, 3]
    expect(arr).to.have.members([ 1, 2, 3 ])
    expect(arr).to.include.members([ 1, 3 ])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty
})
```
### Tipos
```bash
it('Types', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
})
```
### Strings
```bash
it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')
    expect(str).to.match(/de/) // uma parte da string
    expect(str).to.match(/^String/) // primeira string
    expect(str).to.match(/teste$/) // útlima string
    expect(str).to.match(/.{15}/) // tamanho 
    expect(str).to.match(/\w+/) // contém apenas letras (1 ou +)
    expect(str).to.match(/\D+/) // não contém números
})
```
### Números
```bash
it('Numbers', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)
    expect(floatNumber).to.be.equal(5.2123)
    expect(floatNumber).to.be.closeTo(5.2, 0.1)
    expect(floatNumber).to.be.above(5)
})
```

## Assertivas do acesso a uma página
### Como enviar ações para o cyprss
Os arquivos de teste de cypress são embutidos com uma variável "cy" que tem uma api poderosa o suficiente para que todos testes sejam feitos a partir dela. 

```bash
describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
      
        const title = cy.title() // não foi possível receber o valor devido a assincronicidade
        console.log(title) // é possível imprimir  
        // DESAFIOS // TODO - imprimir o log no console // TODO - escrever o título num campo de texto
    })
})
```
Ao trabalhar com promise, não tem como receber o valor diretamente, é preciso lidar com ele de uma forma assíncrona. O cypress trabalha muito de forma assíncrona. Nem com assync await resolve. 

```bash
cy.title()
```
Retorna um objeto Chainer, uma promise = Encadeador. após obtê-lo, encadeie a próxima ação desejada

```bash
.should
```
should é uma estrutura preparada para receber o objeto Chainer, promise. Cria uma assertiva que funciona até que chegue ou passe de um dado timeout. Quando retorna um erro, repetições são feitas como tentativas de atingir o resultado esperado até que atinja ou extrapole o timeout.

### Outra forma de escrever

```bash
cy.title()
    .should('be.equal', 'Campo de Treinamento')
    .should('contain', 'Campo')
```
Ganha um pouco mais de tempo porque a busca por título é feita só uma vez e fica mais legível. 

## Localizar e interagir com elemento
```bash
 it.only('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
```

## .pause() e .debug()
Elementos que ajudam a detalhar um campo ou ter uma melhor visibilidade de um erro. 

### .pause()
```bash
cy.title().debug().should('contain', 'Campo')
```

![image](https://user-images.githubusercontent.com/85461130/185767789-2648b82f-ec0c-45ad-9b38-ed7593c8ff3b.png)

### .pause
```bash
it.only('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    
    cy.pause()

    cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .should('contain', 'Campo')
})
```

![image](https://user-images.githubusercontent.com/85461130/185767874-73b9ae2f-4289-4ff0-b5ec-484996f13420.png)

Com o .pause() é possível percorrer passo a passo das linhas programadas com o gerenciamento do cypress. O .debuger() também possibilita scanear as linhas mas o gerenciamento é mais do navegador. Ele funciona melhor para detalhar os passos no console. 

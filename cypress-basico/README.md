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

Implementa promisses e deixar o uso mais simplificado. Como faz gerenciamento, tem um ciclo de vida, conceitos de retrys, não é recomendado o uso com cypress. Este precisa das promisses como descrito na documentação. 

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

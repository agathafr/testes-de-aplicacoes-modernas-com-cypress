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



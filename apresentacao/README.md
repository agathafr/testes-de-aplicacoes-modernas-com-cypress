# Testes de aplicações modernas com cypress
Automatize testes funcionais (e2e), de API Rest (backend) e de interface gráfica (frontend) com apenas uma ferramenta <br>
<a href="https://www.udemy.com/course/testes-cypress/"> Curso disponível na Udemy </a>

## Apresentação

Ferramenta que possibilita fazer testes em uma aplicação em diferentes níveis (funcional, serviço, interface).

Funcional -> Simula a interação do usuário (acesso a aplicação, interação com elementos, preenchimento de campos, clique em botões, busca por textos). É feita a verificação dos comportamentos apresentados, se são os esperados. <br>
Serviço -> Acessa diretamente o backend da aplicação. Nessa etapa os objetos de requisição são criados, são feitas as requisições para o servidor de backend e assertivas com as respostas retornadas por ele <br>
Interface -> Parecido com o teste funcional. Aqui, todas as requisições são virtualizadas (promove ganho de velocidade no teste, já que somente o escopo do teste é levado em consideração) para o frontend e o único foco é na interface. Dispensa preocupação com massa de dados, possibilita a simulação de cenários *bem* específicos. <br>

### Por que três níveis de teste?

O teste funcional é o mais completo. Testa desde o usuário fazendo login, acessando a aplicação que se comunica com o backend (que tem o próprio banco de dados), que se comunica com outros serviços, que se comunicam com outros serviços. 

#### Ponto fraco: 
- Exige que os serviços estejam no ar, configurados e reflitindo os dados necessários para trabalhar
- O erro pode estar em qualquer ponto dessa cadeia. Na interface, no banco de dados, no backend. 

Ao reduzir o escopo para o nível de serviço, backend, por exemplo, acessando a api diretamente, o teste vai ser bem mais rápido porque não é necessário um servidor de aplicação, interação com elementos. Há um ganho de velocidade muito grande porque, por exemplo, ao clicar num botão submit um objeto é montado e uma requisição é feita **diretamente**.

#### Ponto fraco:
- Não é um teste completo. Pode ser que a camada de apresentação tenha erros, e que haja falha de comunicação também. 

Mockando o frontend é possível trabalhar com a interface, ver componentes CSS, comportamento, navegação, momentos em que aparecem um dado elemento, responsividade etc. 

#### Ponto fraco:
- Não é um teste completo. O backend também é mockado.

O ideal é compor a bateria de testes usando como base a pirâmide de testes que trás a ideia de níveis e proporcionalidade. 

#### Base
Na base ficam os testes mais baratos, que executam mais rápido, que dão menos problema (testes unitários - componentes de tela no front). 

#### Camada intermediária
Na camada intermediária ficam os testes de serviço, é possível testar as regras de negócio de uma forma mais completa (integrando com o banco - porém trás complexidade com o banco e incerteza do funcionamento correto da interface ao interagir com ele).

#### Topo
Testes funcionais. São demorados, podem gerar muitos problemas, a execução completa é cara. O ideal é resguardar com os testes dos níveis mais baixos e selecionar os cenários mais críticos e importantes (caminho do dinheiro) para garantir que o usuário não terá problemas dessa forma. 

Mock - isola uma camada da outra e facilita a criação de cenários para teste

### Cypress
Esse framework encapsula a aplicação de teste interceptando todas as requisições que a aplicação vai fazer, de modo que não é necessário mexer na aplicação a ser testada (fica transparente para a aplicação de teste) e é possível redirecionar as respostas, enviando a resposta desejada sem necessidade de envolver o backend.

- Possibilita cobrir todos os níveis, isolar a interface e fazer testes mais rápidos sem preocupar com o banco de dados.
- Mesclar atividades -> Em um teste funcional que precisa de uma massa de dados, normalmente o próprio teste ou automação seria usado para criar uma massa <- Ao usar o cypress é possível selecionar o melhor lado de todos: Api rest diretamente da aplicação para gerar os dados e no teste funcional apenas checar o cenário. Uma outra alternativa é virtualizar o que a api rest iria retornar e fazer um teste de interface para ver o comportamento da aplicação de uma forma bem simplificada.


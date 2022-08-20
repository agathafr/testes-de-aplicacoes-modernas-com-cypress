//const { Callbacks } = require("cypress/types/jquery");
//const { set } = require("cypress/types/lodash");

it('sem testes, ainda', () => {

})

/* const getSomething = () => 10; */

/* // Solicitação de um recurso demorado forçado com um timeout
const getSomething = () => {
    setTimeout(() => {
        console.log('respondendo...') // após o retorno volta nesse ponto para obter a resposta
        return 11;
    }, 1000)
}

const system = () => {
    console.log('init');
    const something = getSomething();
    console.log(`Something is ${something}`); // retorna undefined
    console.log('end');
} */

/* // Callback
    const getSomething = callback => {
    setTimeout(() => {
        callback(12);
    }, 1000)
}

const system = () => {
    console.log('init');
    getSomething(some => console.log(`Something is ${some}`));
    console.log('end')
} */

/*  // Async await
    const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    }) 
}

const system = async () => {
    console.log('init');
    const some = await getSomething()
    console.log(`Something is ${some}`)
    console.log('end')
} */
 
system();
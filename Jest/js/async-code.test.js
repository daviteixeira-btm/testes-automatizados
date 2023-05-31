/* Promises

Retorne uma promise do seu teste, e o Jest vai esperar essa 
promise ser resolvida. Se a promessa for rejeitada, o teste irá falhar.

Por exemplo, digamos que fetchData retorna uma promessa que 
é esperada ser resolvida na string 'peanut butter'. Podemos fazer um teste com:

*/

function fetchData (){
    return 'the data is peanout butter';
};

test('the data is peanut butter', () => {
    return fetchData().then(data => {
        expect(data).toBe('peanut butter');
    });
});

/* Async/Await

Como alternativa, você pode usar async e await em seus 
testes. Para escrever um teste assíncrono, basta usar 
a palavra-chave async na frente da função passada para test

*/

test('the data is peanout butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        await fetchData();
    } catch (e) {
        expect(e).toMatch('error');
    }
});

// Você pode combinar async e await com .resolves ou .rejects

test('the data is peanut butter', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    await expect(fetchData()).rejects.toMatch('error');
});

/* Nestes casos, async e await são efetivamente apenas uma sintaxe 
mais simples da mesma lógica dos exemplos de uso de promessas. 

Certifique-se de retornar (ou await) a promessa - se você omitir a 
instrução return/await, seu teste será concluído antes que a promessa 
retornada de fetchData seja resolvida ou rejeitada.

*/

/*

Se você espera que a promessa seja rejeitada, use o método .catch. Se 
certifique de adicionar expect.assertions para verificar que um certo 
número de afirmações são chamadas. Caso contrário, uma promessa cumprida 
não falharia no teste.

*/

test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
});

/* Callbacks

Se você não usar promessas, poderá usar callbacks. Por exemplo, 
digamos que fetchData, em vez de retornar uma promessa, espera um 
callback, ou seja, busca alguns dados e chama callback(null, data) 
quando estiver completo. Você deseja testar que este dado retornado 
seja apenas uma string 'peanut butter'.

Por padrão, testes de Jest completam uma vez que eles chegam ao fim 
da sua execução. Isso significa que este teste não irá funcionar 
como o esperado

*/

// Não faça isso!
test('the data is peanut butter', () => {
    function callback(error, data) {
        if(error){
            throw error;
        }
        expect(data).toBe('peanut butter');
    }

    fetchData(callback);
});

/*

O problema é que o teste será concluído logo que fetchData completa, 
antes de sequer chamar a "callback". Há uma forma alternativa de test 
que corrige isto. Em vez de colocar o teste em uma função com um 
argumento vazio, use um único argumento chamado done. Jest aguardará 
até que a "callback" done é chamada antes de terminar o teste.

*/

test('the data is peanut butter', done => {
    function callback(error, data){
        if(error){
            done(error);
            return;
        }
        try {
            expect(data).toBe('peanut butter');
            done();
        } catch (error) {
            done(error);
        }
    }

    fetchData(callback);
});

/*

Se done() nunca for chamado, o teste irá falhar (com erro de timeout), 
que é o que você quer que aconteça.

Se a instrução expect falhar, ele lança um erro e done() não é chamado. 
Se queremos ver no log de testes por que falhou, precisamos encapsular 
expect em um bloco try e passar o erro no bloco catch para o done. Caso 
contrário, ficamos com um erro de timeout, que não mostra o valor recebido 
por expect(data).

Jest lançará um erro, se a mesma função de teste receber um callback done() 
e retornar uma promessa. Isso é feito como precaução para evitar vazamentos 
de memória em seus testes.

*/

/* .resolves / .rejects

Você também pode usar o "matcher" .resolves em sua declaração esperada, 
e Jest irá aguardar a promessa resolver. Se a promessa for rejeitada, 
o teste automaticamente irá falhar.

*/

test('the data is peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
});

/*

Certifique-se de retornar a afirmação — se você omitir esta instrução de return, 
seu teste será concluído antes que a promessa retornada de fetchData seja resolvida 
e then() tenha a chance de executar a callback.

Se você espera que uma promessa seja rejeitada, use o "matcher" .rejects. Ele funciona 
analogicamente para o "matcher" .resolves. Se a promessa é cumprida, o teste 
automaticamente irá falhar.

*/

test('the fetch fails with an error', () => {
    return expect(fetchData()).rejects.toMatch('error');
});
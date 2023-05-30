const matchers = require('./matchers');

test('adds 1 + 2 to equal 3', () => {
    expect(matchers(1, 2)).toBe(3);
})

/* expect() retorna um objeto de "expectativa". Você 
normalmente não vai fazer muito com esses objetos de 
expectativa exceto chamada "matchers" neles. */

test('dois mais dois é quatro', () => {
    expect(2 + 2).toBe(4);
});

/* O .toBe() é o "matcher". Quando Jest é executado, ele 
rastreia todos os "matchers" que falharam para que possa 
imprimir as mensagens de erro para você de uma forma agradável. 
O toBe utiliza Object.is para testar a igualdade exata */

/* Se você quer checar o valor de um objeto, use toEqual(), 
toEqual recursivamente verifica cada campo de um objeto ou array. */

test('atribuição de objeto', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2});
});

/* toEqual ignora chaves de objeto com propriedades indefinidas, 
itens de matriz indefinidos, dispersão de matriz ou incompatibilidade 
de tipo de objeto. Para levar isso em consideração, use toStrictEqual(). */

/* Você também pode testar o oposto de um matcher usando not() */

test('adicionando números positivos que não seja zero', () => {
    for( let a = 1; a < 10; a++){
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});

/* Verdade

Em testes às vezes você precisa distinguir entre undefined, null e false, mas 
às vezes você não quer tratar estes de maneira diferente. Jest contém 
auxiliares que permitem você ser explícito sobre o que quer.

- toBeNull() corresponde a apenas null
- toBeUndefined() corresponde a apenas undefined
- toBeTruthy() combina com qualquer coisa que uma instrução if trata como verdadeiro
- toBeFalsy() combina com qualquer coisa que uma instrução if trata como falso

*/

test('nulo', () => {
    const numero = null;
    expect(numero).toBeNull();
    expect(numero).toBeDefined();
    expect(numero).not.toBeUndefined();
    expect(numero).not.toBeTruthy();
    expect(numero).toBeFalsy();
});

test('zero', () => {
    const zero = 0;
    expect(zero).not.toBeNull();
    expect(zero).toBeDefined();
    expect(zero).not.toBeUndefined();
    expect(zero).not.toBeTruthy();
    expect(zero).toBeFalsy();
});

/* Números 

A maioria das formas de comparar números têm "matcher" equivalentes.

O toBe e toEqual são equivalentes para números.

Para igualdade de ponto flutuante, use toBeCloseTo() em vez de toEqual(), 
porque você não quer um teste dependa de um pequeno erro de arredondamento.

*/

test('dois mais dois', () => {
    const value = 2.0 + 2.0;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
    expect(value).toBeCloseTo(4);
});

/* Strings

Você pode verificar strings contra expressões regulares com toMatch()

*/

test('não existe "l" em Cérebro', () => {
    expect('Cérebro').not.toMatch(/l/);
});

test('mas existe "stop" em Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});

/* Arrays e iteráveis

Você pode verificar se um array ou iterável contém um item específico usando toContain()

*/

const shoppingList = [
    'sucos',
    'biscoitos',
    'chocolate',
    'carne de frango',
    'batata doce',
];

test('a lista de compras tem chocolate nela', () => {
    expect(shoppingList).toContain('chocolate');
    expect(new Set(shoppingList)).toContain('chocolate');
});

/* Exceções

Se você quiser testar se uma determinada função lança um erro quando é chamada, use toThrow()

A função que lança uma exceção precisa ser invocada dentro de uma função de encapsulamento, 
caso contrário, a asserção toThrow falhará.

*/

function compileAndroidCode(){
    throw new Error('você está usando o JDK errado!');
}

test('compilar android corre como esperado', () => {
    expect(()=> compileAndroidCode()).toThrow();
    expect(()=> compileAndroidCode()).toThrow(Error);

    // Você também pode usar uma string que deve estar contida na mensagem de erro ou um regexp
    expect(() => compileAndroidCode()).toThrow('você está usando o JDK errado!');
    expect(() => compileAndroidCode()).toThrow(/JDK/);

    // Ou você pode corresponder a uma mensagem de erro exata usando um regexp como abaixo
    expect(() => compileAndroidCode()).toThrow(/^você está usando o JDK errado!$/);
})
let assert = require('assert');
let tester = require('../greetings-factory');

const theGreetingsVar = tester();
describe('the greetings function basic test', function () {
    it('greetings function test greeting in English', function () {

        assert.equal(theGreetingsVar.greet('Richard', "english"), "HELLO RICHARD");
    });
    it('greetings function test greeting in Afrikaans', function () {

        assert.equal(theGreetingsVar.greet('Richard', "afrikaans"), "GOEIE DAG RICHARD");
    });
    it('greetings function test greeting in isiXhosa', function () {

        assert.equal(theGreetingsVar.greet('Richard', "isiXhosa"), "USUKU OLUMNWANDI RICHARD");
    });
});
describe('the greetings function testing the counter', function () {
    it('greetings function should test is incremented by 1', function () {

        theGreetingsVar([{
            'Richard': 0
        }]);

        assert.equal(theGreetingsVar.TheGreetCounter(), 1);
    });
    it('greetings function should test if the same name should stay one', function () {

        theGreetingsVar([{
            'Richard': 0
        }, ]);

        assert.equal(theGreetingsVar.TheGreetCounter(), 1);

        theGreetingsVar([{
            'Richard': 0
        }, ]);

        assert.equal(theGreetingsVar.TheGreetCounter(), 1);

    });
    it('greetings function should if the it has three different names, should return three', function () {

        theGreetingsVar([{
            'Aya': 0
        }, {
            'mike': 0
        }, {
            'Sibo': 0
        }]);

        assert.equal(theGreetingsVar.TheGreetCounter(), 3);
    });
});
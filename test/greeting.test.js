let assert = require('assert');
let factory = require('../greetings-factory');
let data = require('../dataBase');

const theGreetingsFac = factory();
const theGreetingsData = data();

describe('the greetings function basic test', function () {
    it('greetings function test greeting in English', function () {

        assert.equal(theGreetingsFac.greet('Richard', "english"), "HELLO RICHARD");
    });
    it('greetings function test greeting in Afrikaans', function () {

        assert.equal(theGreetingsFac.greet('Richard', "afrikaans"), "GOEIE DAG RICHARD");
    });
    it('greetings function test greeting in isiXhosa', function () {

        assert.equal(theGreetingsFac.greet('Richard', "isiXhosa"), "USUKU OLUMNWANDI RICHARD");
    });
});

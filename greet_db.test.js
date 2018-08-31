let assert = require('assert');
let GreetingsFactory = require('./greetings-factory');

const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greet_db';

const pool = new Pool({
    connectionString
});

describe('the greetings function basic test', function () {
    it('greetings function test greeting in English', async function () {

        const theGreeting = GreetingsFactory(pool);
        let greeting = await theGreeting.greet('Richard', 'english');
        assert.strictEqual(greeting, 'HELLO RICHARD');
    
    });

    it('greetings function test greeting in Afrikaans', async function () {
        const theGreeting = GreetingsFactory(pool);
        let greeting = await theGreeting.greet('Richard', 'afrikaans');
        assert.strictEqual(greeting, 'GOEIE DAG RICHARD');
    });
});

describe('the greetings function basic test', function () {
    it('greetings function should if the it has three different names, should return three', async function () {
        
        const theGreeting = GreetingsFactory([{
            'Aya': 0
        }, {
            'mike': 0
        }, {
            'Sibo': 0
        }]);
    
        // await theGreeting.ReturnMap();

        let greetcount = await theGreeting.TheGreetCounter();

        assert.strictEqual(3, greetcount);
    });
});

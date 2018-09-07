let assert = require('assert');
let factory = require('../greetings-factory');
let data = require('../dataBase');
const pg = require('pg');
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greet_db';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
const theGreetingsFac = factory();
const theGreetingsData = data(pool);

describe('the greetings function basic test', function () {
    it('greetings function test greeting in English', function () {
        assert.strictEqual(theGreetingsFac.greet('Richard', 'english'), 'HELLO RICHARD');
    });
    it('greetings function test greeting in Afrikaans', function () {
        assert.strictEqual(theGreetingsFac.greet('Richard', 'afrikaans'), 'GOEIE DAG RICHARD');
    });
    it('greetings function test greeting in isiXhosa', function () {
        assert.strictEqual(theGreetingsFac.greet('Richard', 'isiXhosa'), 'USUKU OLUMNWANDI RICHARD');
    });
    it('if name is an INT the in should return warning', function () {
        assert.strictEqual(theGreetingsFac.greet(1, 'english'), 'Please insert name and language');
    });
});

describe('testing the database functionality', function () {

    beforeEach(async function () {
        await pool.query("delete from hold_name");
    });

    it('test the counter if had to have one name inside of it', async function () {
        await theGreetingsData.dataHeld('Richard');
        assert.strictEqual(await theGreetingsData.TheGreetCounter(), '1');
    });
    it('test if the same name is passed into the data base it should not increment', async function () {
        await theGreetingsData.dataHeld('Richard');
        await theGreetingsData.dataHeld('Richard');
        assert.strictEqual(await theGreetingsData.TheGreetCounter(), '1');
    });
    it('test if there are three names greeted and two are the same it should return 2', async function () {
        await theGreetingsData.dataHeld('Richard');
        await theGreetingsData.dataHeld('greg');
        await theGreetingsData.dataHeld('Richard');
        await theGreetingsData.dataHeld('greg');
        assert.strictEqual(await theGreetingsData.TheGreetCounter(), '2');
    });
    // it('count the amount of times a single name has been greeted', async function () {
    //     theGreetingsFac.greet('Richard', 'english');
    //     theGreetingsFac.greet('Richard', 'english');
    //     theGreetingsFac.greet('Richard', 'english');
    //     theGreetingsFac.greet('Richard', 'english');
    //     assert.strictEqual();
    // });

    after(function () {
        pool.end();
    });
});

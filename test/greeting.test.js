let assert = require('assert');
let factory = require('../greetings-factory');
let data = require('../greetingsDataFunction');
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
const theGreetingsData = data(pool);
const theGreetingsFac = factory(theGreetingsData);

describe('the greetings function basic test', function () {
    it('greetings function test greeting in English', async function () {
        assert.deepEqual(await theGreetingsFac.greet('Richard', 'english'), {
            greetMessage: 'HELLO RICHARD',
            theGreetCounter: '1'
        });
    });
    it('greetings function test greeting in Afrikaans', async function () {
        assert.deepEqual(await theGreetingsFac.greet('Richard', 'afrikaans'), {
            greetMessage: 'GOEIE DAG RICHARD',
            theGreetCounter: '1'
        });
    });
    it('greetings function test greeting in isiXhosa', async function () {
        assert.deepEqual(await theGreetingsFac.greet('Richard', 'isiXhosa'), {
            greetMessage: 'USUKU OLUMNWANDI RICHARD',
            theGreetCounter: '1'
        });
    });
    it('if name is an INT the in should return warning', async function () {
        assert.deepEqual(await theGreetingsFac.greet(1, 'english'), {
            greetMessage: 'Please insert name and language',
            theGreetCounter: '1'
        });
    });

    it('if name is an INT the in should return warning', async function () {
        assert.deepEqual(await theGreetingsFac.greet('name'), {
            greetMessage: 'Please insert name and language',
            theGreetCounter: '2'
        });
    });
});

describe('testing the database functionality', function () {
    beforeEach(async function () {
        await pool.query('delete from hold_name');
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

    after(function () {
        pool.end();
    });
});

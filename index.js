const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const greetingsFactory = require('./greetings-factory');
const greetingsDataBase = require('./dataBase');

const bodyParser = require('body-parser');
// const flash = require('express-flash');
// const session = require('express-session');
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

const greetings = greetingsFactory(pool);
const greetingsData = greetingsDataBase(pool);

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.get('/', async function (req, res) {
    let theGreetCounter = await greetingsData.TheGreetCounter();
    res.render('home', {
        theGreetCounter
    });
});
app.post('/greet', async function (req, res) {
    let type = req.body.lang;
    let name = req.body.name;
    let greetMessage = greetings.greet(name, type);
    await greetingsData.dataHeld(name);
    let theGreetCounter = await greetingsData.TheGreetCounter();
    res.render('home', {
        greetMessage,
        theGreetCounter
    });
});
app.get('/greeted/:name/', async function (req, res) {
    let names = req.params.name;
    try {
        let result = await pool.query('select * from hold_name where names = $1', [names]);
        res.render('names', {
            names: result.rows
        });
    } catch (err) {
        res.send(err.stack);
    }
});
app.get('/greeted', async function (req, res) {
    try {
        let result = await pool.query('select * from hold_name');
        res.render('list', {
            names: result.rows
        });
    } catch (err) {
        res.send(err.stack);
    }
});

app.get('/reset', async function (req, res) {
    await pool.query('delete from hold_name;');
    await pool.query('alter sequence hold_name_id_seq restart 1;');
    res.redirect('/');
});

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
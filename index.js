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

const greetingsData = greetingsDataBase(pool);

const greetings = greetingsFactory(greetingsData);

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
    let languageType = req.body.lang;
    let name = req.body.name;
    let result = await greetings.greet(name, languageType);
    res.render('home', result);
});
app.get('/greeted/:name/', async function (req, res) {
    let names = req.params.name;
    try {
        let counter = await greetingsData.showResultsOfNameChosen(names);
        res.render('names', {
            names,
            counter
        });
    } catch (err) {
        res.send(err.stack);
    }
});
app.get('/greeted', async function (req, res) {
    try {
        let result = await greetingsData.result();
        res.render('list', {
            names: result
        });
    } catch (err) {
        res.send(err.stack);
    }
});

app.get('/reset', async function (req, res) {
    let deleteDataBase = await greetingsData.clearDataBase();
    res.render('home', {
        deleteDataBase
    });
});

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

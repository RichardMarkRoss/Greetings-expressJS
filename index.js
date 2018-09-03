const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const greetingsFactory = require('./greetings-factory');

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
    await pool.query('update hold_name from names');
    let returnValues = greetings.returnValues();
    res.render('home', {
        returnValues

    });
});
app.post('/greet', async function (req, res) {
    let type = req.body.lang;
    let name = req.body.name;
    let greetMessage = await greetings.greet(name, type);
    let theGreetCounter = await greetings.TheGreetCounter();
    res.render('home', {
        greetMessage,
        theGreetCounter
    });
});
app.post('/greet/:name/:type', function (req, res) {
    let type = req.params.type;
    let names = req.params.name;
    // console.log(names);
    // console.log(type);
    let greetMessage = greetings.greet(names, type);
    let theGreetings = greetings.TheGreetCounter();
    res.render('home', {
        greetMessage,
        theGreetings
    });
});
app.get('/greeted', async function (req, res) {
    try {
        let result = await pool.query('select * from hold_name');
        res.json(result.rows);
    } catch (err) {
        res.send(err.stack);
    }
});
// app.get('/list', function (req, res) {
//     res.render('home', {
//         _names: ,
//         get names() {
//             return this._names;
//         },
//         set names(value) {
//             this._names = value;
//         },
//     });
// });

app.get('/reset', async function (req, res) {
    await pool.query('delete from hold_name;');
    await pool.query('alter sequence hold_name_id_seq restart 1;');
    res.redirect('/');
});

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
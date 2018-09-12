const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const greetingsFactory = require('./greetings-factory');
const greetingsDataBase = require('./greetingsDataFunction');
const routesGreet = require('./routes/routes');

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

const routes = routesGreet(greetingsData, greetings);
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.get('/', routes.index);
app.post('/greet', routes.home);
app.get('/greeted/:name/', routes.namesChosen);
app.get('/greeted', routes.result);
app.get('/reset', routes.reset);

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

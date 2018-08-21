const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const greetingsFactory = require('./greetings-factory');
const greetings = greetingsFactory();
const bodyParser = require('body-parser');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
    let returnValues = greetings.returnValues();
    res.render('home', {
        returnValues

    });
});
app.post('/greet', function (req, res) {
    let type = req.body.lang;
    let name = req.body.name;
    let greetMessage = greetings.GreetingTheLogic(name, type);
    let theGreetings = greetings.TheGreetCounter();
    res.render('home', {
        greetMessage,
        theGreetings
    });
});
app.get('/actions', function (req, res) {
    let theName = greetings.returnName();
    let theCount = greetings.TheGreetCounter();
    res.render('actions', {
        theName,
        theCount
    });
});
let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
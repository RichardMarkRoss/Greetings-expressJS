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

    greetings.returnName(req.body.placeName);
    let setValues = greetings.returnValues();

    res.render('home', {
        setValues
    });
});

app.post('/greet', function (req, res) {
    // let type = req.body.langTypeRadio;
    // displayName: greetings.returnLang(type)
    res.redirect('/');
});

app.post('/', function (req, res) {
    res.redirect('/');
});

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

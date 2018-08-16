const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const greetingsFactory = require('./greetings-factory');
const greetings = greetingsFactory();
// let moment = require("moment");
const bodyParser = require('body-parser');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  
    let setValues = greetings.returnValues();
    greetings.returnName(req.body.placeName);

    res.render('home', {
        setValues
    });
});

app.post('/greet', function (req, res) {
    greetings.returnName(req.body.placeName);
    res.redirect('/');

});

app.post('/', function (req, res) {
  

    res.redirect('/');
});

app.get('/actions/:type', function (req, res) {
    const type = req.params.type;
    res.render('', {
        

    });
});

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

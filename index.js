const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
const settingBill = require('./settings');
const settings = settingBill();
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
  

    res.render('', {
      
    });
});

app.post('/', function (req, res) {

    res.redirect('/');
});

app.post('/', function (req, res) {
  

    res.redirect('/');
});

app.get('/', function (req, res) {
    res.render('', {
        

    });
});
app.get('', function (req, res) {
    
    res.render('', {
        
    });
});

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

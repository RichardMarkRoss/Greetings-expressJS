// let Moment = require('moment');
module.exports = function (storedUsers) {
    var namesStored = storedUsers || {};
    var GreeterCount = 0;
    var holdName = '';
    var greet = '';
    let langchose = '';
    let holdBill = [];

    function GreetingTheLogic (name, langChosen) {
        var newDates = new Date(); // Moment().fromNow();
        let names = {
            'type': langchose,
            'date': newDates
        };

        langchose = langChosen;

        if (storedUsers) {
            namesStored = storedUsers;
        }
        if (isNaN(name) && name != '') {
            holdName = name.toUpperCase();

            if (langchose == 'english') {
                greet = 'HELLO ' + holdName;
                names.name = greet;
                if (namesStored[holdName] === undefined) {
                    namesStored[holdName] = 0;
                }
            } else if (langchose == 'afrikaans') {
                greet = 'GOEIE DAG ' + holdName;
                names.name = greet;
                if (namesStored[holdName] === undefined) {
                    namesStored[holdName] = 0;
                }
            } else if (langchose == 'isiXhosa') {
                greet = 'USUKU OLUMNWANDI ' + holdName;
                names.name = greet;
                if (namesStored[holdName] === undefined) {
                    namesStored[holdName] = 0;
                }
            } else {
                return 'insert name and language';
            }
            holdBill.push(names);

            return greet;
        } else {
            return 'Please insert name and language';
        }
    }

    function returnName () {
        return holdName;
    }

    function TheGreetCounter () {
        GreeterCount = Object.keys(namesStored).length;
        return GreeterCount;
    }

    function ReturnMap () {
        return namesStored;
    }

    function returnLang () {
        return langchose;
    }
    // function Clear () {
    //     namesStored = {};
    //     localStorage.clear();
    // }

    function returnValues () {
        return {
            namesStored,
            GreeterCount,
            holdName,
            greet
        };
    }

    return {
        GreetingTheLogic,
        TheGreetCounter,
        ReturnMap,
        returnValues,
        returnName,
        returnLang
    };
};

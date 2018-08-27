// let Moment = require('moment');
module.exports = function (storedUsers) { // take out this param
    var namesStored = storedUsers || {};
    var GreeterCount = 0;
    var holdName = '';

    let holdBill = [];

    function GreetingTheLogic (name, langChosen) {
        var newDates = new Date(); // Moment().fromNow();
        let langchose = langChosen;
        var greet = '';
        let names = {
            'date': newDates
        };

        if (storedUsers) {
            namesStored = storedUsers;
        }
        if (isNaN(name) && name !== '') {
            holdName = name.toUpperCase();

            if (langchose === 'english') {
                greet = 'HELLO ' + holdName;
                names.name = greet;
                if (namesStored[holdName] === undefined) {
                    namesStored[holdName] = 0;
                }
            } else if (langchose === 'afrikaans') {
                greet = 'GOEIE DAG ' + holdName;
                names.name = greet;
                if (namesStored[holdName] === undefined) {
                    namesStored[holdName] = 0;
                }
            } else if (langchose === 'isiXhosa') {
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

    function filterRecords (type) {
        return holdBill.filter(record => record.type === type);
    }

    function returnValues () {
        return {
            namesStored,
            GreeterCount,
            holdName
        };
    }

    return {
        GreetingTheLogic,
        TheGreetCounter,
        ReturnMap,
        returnValues,
        returnName,
        returnLang,
        filterRecords
    };
};

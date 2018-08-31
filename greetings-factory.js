module.exports = function (pool) {
    var GreeterCount = 0;
    var holdName = '';

    let holdBill = [];

    async function greet (name, langChosen) {
        let langchose = langChosen;
        var greet = '';

        if (isNaN(name) && name !== '') {
            holdName = name.toUpperCase();
            await pool.query('insert into hold_name (names) values ($1)', [holdName]);
            if (langchose === 'english') {
                greet = 'HELLO ' + holdName;
            } else if (langchose === 'afrikaans') {
                greet = 'GOEIE DAG ' + holdName;
            } else if (langchose === 'isiXhosa') {
                greet = 'USUKU OLUMNWANDI ' + holdName;
            } else {
                return 'Please insert name and language';
            }

            return greet;
        } else {
            return 'Please insert name and language';
        }
    }

    async function returnName () {
        return holdName;
    }

    async function TheGreetCounter () {
        GreeterCount = await pool.query('select count(*) from hold_name;');
        return GreeterCount;
    }

    async function filterRecords (type) {
        return holdBill.filter(record => record.type === type);
    }

    async function returnValues () {
        return {
            GreeterCount,
            holdName
        };
    }

    return {
        greet,
        TheGreetCounter,
        returnValues,
        returnName,
        filterRecords
    };
};

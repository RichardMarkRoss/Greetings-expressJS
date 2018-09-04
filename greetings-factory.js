module.exports = function (pool) {
    var holdName = '';

    function greet (name, langChosen) {
        let langchose = langChosen;
        var greet = '';

        if (isNaN(name) && name !== '') {
            holdName = name.toUpperCase();

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

    return {
        greet
    };
};

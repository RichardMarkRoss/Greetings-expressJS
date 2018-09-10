module.exports = function (greetingsData) {
    async function greet (name, langChosen) {
        let greetMessage = 'Please insert name and language';

        if (isNaN(name) && name !== '' && langChosen !== '') {
            await greetingsData.dataHeld(name);

            var holdName = name.toUpperCase();
            let langchose = langChosen;
            if (langchose === 'english') {
                greetMessage = 'HELLO ' + holdName;
            } else if (langchose === 'afrikaans') {
                greetMessage = 'GOEIE DAG ' + holdName;
            } else if (langchose === 'isiXhosa') {
                greetMessage = 'USUKU OLUMNWANDI ' + holdName;
            }
        }

        let theGreetCounter = await greetingsData.TheGreetCounter();

        return {
            greetMessage,
            theGreetCounter
        };
    }

    return {
        greet
    };
};

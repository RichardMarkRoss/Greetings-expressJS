module.exports = function (greetingsData, greetings) {

    async function index (req, res) {
        let theGreetCounter = await greetingsData.TheGreetCounter();
        res.render('home', {
            theGreetCounter
        });
    }

    async function home (req, res) {
        let languageType = req.body.lang;
        let name = req.body.name;
        let result = await greetings.greet(name, languageType);
        res.render('home', result);
    }
    async function namesChosen (req, res) {
        let names = req.params.name;
        try {
            let counter = await greetingsData.showResultsOfNameChosen(names);
            res.render('names', {
                names,
                counter
            });
        } catch (err) {
            res.send(err.stack);
        }
    }
    async function result (req, res) {
        try {
            let result = await greetingsData.result();
            res.render('list', {
                names: result
            });
        } catch (err) {
            res.send(err.stack);
        }
    }
    async function reset (req, res) {
        let deleteDataBase = await greetingsData.clearDataBase();
        res.render('home', {
            deleteDataBase
        });
    }
    return {
        index,
        home,
        namesChosen,
        result,
        reset

    }

}
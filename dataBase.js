module.exports = function (pool) {
    async function dataHeld (holdName) {
        let nameHeld = holdName.toUpperCase();
        if (isNaN(nameHeld) && nameHeld !== '') {
            let user = await pool.query('select * from hold_name where names = $1', [nameHeld]);
            if (user.rows.length !== 0) {
                let holdInt = user.rows[0].counter + 1;
                await pool.query('update hold_name set counter = $1 where names = $2', [holdInt, nameHeld]);
            } else {
                await pool.query('insert into hold_name (names, counter) values ($1, $2)', [nameHeld, 1]);
            }
        }
    }
    async function TheGreetCounter () {
        let GreeterCount = await pool.query('select count(*) from hold_name;');
        let counting = GreeterCount.rows[0].count;
        return counting;
    };
    async function result () {
        let greetResult = await pool.query('select * from hold_name');
        return greetResult.rows;
    }
    async function clearDataBase () {
        await pool.query('delete from hold_name;');
        // await pool.query('alter sequence hold_name_id_seq restart 1;');
    }
    async function showResultsOfNameChosen (names) {
        let result = await pool.query('select * from hold_name where names = $1', [names]);
        let counter = result.rows[0].counter;
        return counter;
    }
    return {
        result,
        dataHeld,
        showResultsOfNameChosen,
        clearDataBase,
        TheGreetCounter
    };
};

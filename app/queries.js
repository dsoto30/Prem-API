const Pool = require("pg").Pool;
const cf = require("./config");
const pool = new Pool(cf.config);

const getTeams = (request, response) => {
    pool.query(
        'SELECT * FROM teams', (error, results) => {
            if (error){
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}


module.exports = {
    getTeams
};
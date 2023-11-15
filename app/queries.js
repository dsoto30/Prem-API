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


/*
ENDPOINTS 

- Search Player By Name (give N closest names) Name Team
- Display Statistics based on team name search return all 3 seasons.
- Display Match Results based on team name return all 3 seasons

*/


module.exports = {
    getTeams
};
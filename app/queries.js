const Pool = require("pg").Pool;
const cf = require("./config");
const pool = new Pool(cf.config);

const getPlayers = async (req, res) => {
    try 
    {
        const {playerName} = req.query;

        const query = `SELECT players.player_name, players.player_id, teams.team_name
        FROM players
        JOIN teams ON players.team_id = teams.team_id
        ORDER BY similarity(players.player_name, $1) DESC
        LIMIT 5;`;

        
        const players = await pool.query(query, [String(playerName)]);
        res.json(players.rows);
    }
    catch (err)
    {
        console.error(err.message);
    }
}


const getTeams = async (req, res) => {
    try {
        const searchTerm = req.query.teamName;
        const query = `SELECT teams.team_name, teams.team_id
        FROM teams
        ORDER BY similarity(teams.team_name, '$1') DESC
        LIMIT 5;`;

        const teams = await pool.query(query, [searchTerm]);
        res.json(teams.rows);

    } catch (error) {
        console.error(error.message);
    }
}




module.exports = {
    getPlayers
};
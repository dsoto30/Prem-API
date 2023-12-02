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
};

const getPlayerByID = async (req, res) => {
    try {

        const {playerID} = req.params;
        const query = `SELECT *
        FROM players
        WHERE players.player_id = $1`;

        const player = await pool.query(query, [playerID]);

        res.json(player.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
};

const getTeamByName = async (req, res) => {

    try {
        const {teamName} = req.params;
        const query = `SELECT *
        FROM teams`;

        const teams = await pool.query(query);

        res.json(teams.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const getTeamDataByID = async (req, res) => {
    try {
        const {teamID} = req.params;
        const query = `SELECT teams.team_name, stats.players_used, stats.avg_age, stats.goals, stats.assists, stats.prgc, stats.prgp, seasons.season
        FROM squad_stats AS stats
        JOIN seasons ON stats.season_id=seasons.season_id
        JOIN teams ON stats.team_id=teams.team_id
        WHERE stats.team_id=$1;`;

        const squad_stats = await pool.query(query, [teamID]);

        res.json(squad_stats.rows);
        
    } catch (err) {
        console.error(err.message);
    }
}




module.exports = {
    getPlayers,
    getPlayerByID,
    getTeamByName,
    getTeamDataByID
};
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

/*
const getTeams = async (req, res) => {
    try {
        const searchTerm = req.query.teamName;
        const query = `SELECT teams.team_name, teams.team_id
        FROM teams
        ORDER BY similarity(teams.team_name, $1) DESC
        LIMIT 5;`;

        const teams = await pool.query(query, [String(searchTerm)]);
        res.json(teams.rows);

    } catch (error) {
        console.error(error.message);
    }
};*/




module.exports = {
    getPlayers,
    getPlayerByID
};
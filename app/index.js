const express =  require("express");
const app = express();
const port = require("./config").PORT;
const cors = require("cors");
const helmet = require("helmet");
const ejs = require("ejs");

const db = require("./queries");

app.use(helmet());
app.use(express.json());
app.use(cors()); // Allows CORS and Pre-Flight routes
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


app.get("/players", db.getPlayers);
app.get('/players/:playerID', db.getPlayerByID);
app.get('/teams', db.getTeams);
app.get('/teams/:teamID', db.getTeamDataByID);


app.listen(port, (err) => {
    if (err){
        throw err;
    }

    console.log(`Server running on port ${port}`);
});



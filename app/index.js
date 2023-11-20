const express =  require("express");
const app = express();
const port = require("./config").PORT;
const cors = require("cors");
const helmet = require("helmet");

const db = require("./queries");

app.use(helmet());
app.use(express.json());
app.use(cors()); // Allows CORS and Pre-Flight routes


app.get("/players", db.getPlayers);


app.listen(port, (err) => {
    if (err){
        throw err;
    }

    console.log(`Server running on port ${port}`);
});



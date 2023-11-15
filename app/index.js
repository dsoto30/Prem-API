const express =  require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").Server(app);
const port = 3000;
const cors = require("cors");
const helmet = require("helmet")

const db = require("./queries");

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get("/teams", db.getTeams);


//pre-flight requests
app.options('*', function(req, res) {
	res.send(200);
});

server.listen(port, (err) => {
    if (err){
        throw err;
    }

    console.log(`Server running on port ${port}`)
});



const express = require("express");
const app = express();
const router = express.Router();

const port = 3000;

app.use("/", express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

router.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => {
    console.log("App running on port 3000.");
});

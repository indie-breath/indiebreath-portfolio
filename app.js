const express = require("express");
const app = express();
const router = express.Router();

const port = 3000;

app.use("/", express.static(__dirname + "/pages"));
app.use("/public", express.static(__dirname + "/public"));

router.get("/", function (req, res) {
    res.sendFile(__dirname + "/pages/index.html");
});

app.use("/", router);

app.listen(port, () => {
    console.log("App running on port 3000.");
});

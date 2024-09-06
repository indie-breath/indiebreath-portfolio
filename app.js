const express = require("express");
const app = express();
const router = express.Router();
const ejs = require("ejs");

const marked = require("marked");
const fs = require("fs");
const fm = require("front-matter");

const port = 3000;

function preprocess(markdown) {
    const { attributes, body } = fm(markdown);

    for (const prop in attributes) {
        if (prop in this.options) {
            this.options[prop] = attributes[prop];
        }
    }

    return body;
}

marked.use({ hooks: { preprocess } });

app.set("view engine", "ejs");
app.set("views", __dirname + "/pages/blog");

app.use("/", express.static(__dirname + "/pages"));
app.use("/public", express.static(__dirname + "/public"));

router.get("/", function (req, res) {
    res.sendFile(__dirname + "/pages/index.html");
});

/* router.get("/blog/:filename", function (req, res) {
    const filename = req.params.filename;
    const markdown = __dirname + "/pages/blog/" + filename + ".md";

    fs.readFile(markdown, "utf8", function (err, data) {
        if (err) {
            res.send("File not found");
        } else {
            const html = marked.parse(data.toString());
            res.send(html);
        }
    });
}); */

fs.readdir(__dirname + "/pages/blog", function (err, files) {
    files.forEach((file) => {
        const name = file.split(".")[0];
        const filePath = __dirname + "/pages/blog/" + file;
        const fileContents = fs.readFileSync(filePath, "utf8");
        const html = marked.parse(fileContents);

        router.get("/blog/" + name, function (req, res) {
            res.render("blog", { title: name, content: html });
        });
    });
});

app.use("/", router);

app.listen(port, () => {
    console.log("App running on port 3000.");
});

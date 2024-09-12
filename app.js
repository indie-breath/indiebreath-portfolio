const express = require("express");
const app = express();
const router = express.Router();
const ejs = require("ejs");

const marked = require("marked");
const fs = require("fs");
const fm = require("front-matter");

const port = 3000;
const pages = __dirname + "/src/pages";

let title;

function preprocess(markdown) {
    const { attributes, body } = fm(markdown);
    title = attributes.title;

    for (const prop in attributes) {
        if (prop in this.options) {
            this.options[prop] = attributes[prop];
        }
    }

    return body;
}

marked.use({
    hooks: { preprocess },
    breaks: true,
    gfm: true,
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/pages/blog");

app.use("/", express.static(__dirname + "/src/pages"));
app.use("/public", express.static(__dirname + "/src/public"));

router.get("/", function (req, res) {
    res.sendFile(pages + "/index.html");
});

fs.readdir(pages + "/blog", function (err, files) {
    files.forEach((file) => {
        const name = file.split(".")[0];
        const filePath = pages + "/blog/" + file;
        const fileContents = fs.readFileSync(filePath, "utf8");
        const html = marked.parse(fileContents);

        router.get("/blog/" + name, function (req, res) {
            res.render("blog-page", { title: title, content: html });
        });
    });
});

app.use("/", router);

app.listen(port, () => {
    console.log("App running on port 3000.");
});

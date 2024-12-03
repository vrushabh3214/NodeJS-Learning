const http = require("http")
const potre = 8000;
const fs = require('fs');

const handalReq = (req, res) => {
    res.writeHead(201, { "consten-teyp": "text/HTML" });
    console.log(req.url);
    let fileName = "";
    switch (req.url) {
        case ('/'):
            fileName = "./index.html"
            break;
        case('/about'):
            fileName = "./About.html"
            break;

        default:
            break;
    }

    fs.readFile(fileName, (err, data) => {
        res.end(data)
    })
}

const app = http.createServer(handalReq);

app.listen(potre, err => err ? console.log(err) : console.log("server start - " + potre))
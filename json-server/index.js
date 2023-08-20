const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");
const jsonServer = require("json-server");

const options = {
    key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")),
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// imitate real client-server interaction
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// login endpoint
server.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
        );
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: "User not found" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// checking authorization
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: "AUTH ERROR" });
    }

    next();
});

server.use(router);

/* server.use(
    jsonServer.rewriter({
        "/comments/:id":
            "/comments?articleId=:id&_expand=user&_sort=id&_order=asc",
    })
); */

const httpsServer = https.createServer(options, server);

const HTTPS_PORT = 443;
const HTTP_PORT = 8000;

httpsServer.listen(HTTPS_PORT, () => {
    console.log("https server is running on 443 port");
});

server.listen(HTTP_PORT, () => {
    console.log("http server is running on 8000 port");
});

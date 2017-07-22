/// <reference path="types/express/express.d.ts" />
/// <reference path="types/body-parser/body-parser.d.ts" />
/// <reference path="types/formidable/formidable.d.ts" />
"use strict";
require("reflect-metadata");
// server http minimalista
const express = require("express");
// serve a parsare i parametri del bodi per il metodo POST
const bodyParser = require("body-parser");
// per creare la connessione al db
const typeorm_1 = require("typeorm");
const NodeManager_1 = require("./libs/ro/NodeManager");
const PipeInExpress_1 = require("./libs/ro/pipesIn/PipeInExpress");
// creo il server
let app = express();
// uso il body parser per poter gestire i parametri nel body mandati in POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// setto la directory con le risorse statiche
var options = {
    //dotfiles: "ignore",
    etag: false,
};
app.use(express.static("public" /*, options*/));
app.use("/node_modules", express.static("node_modules", options));
app.use("/libs", express.static("libs" /*, options*/));
// connessione con router DB
//app.use("/photos", routerPhotos);
//app.use("/users", routerUsers);
//app.use("/posts", routerPosts);
let node = new NodeManager_1.NodeManager();
node.name = "testServer";
node.addPipeIn(new PipeInExpress_1.PipeInExpress(node, app));
// connessione al DB
typeorm_1.createConnection({
    //name: "test",
    driver: {
        type: "sqlite",
        storage: "./db/db.sqlite",
        //host: "localhost",
        //port: 3306,
        username: "",
        password: "",
        database: "test"
    },
    entities: [
        __dirname + "/models/*.js"
    ],
    logging: {
        logQueries: true,
    },
    autoSchemaSync: true,
}).then(connection => {
    app.listen(3000, () => {
        console.log("Example app listening on port 3000!");
    });
}).catch(error => console.log(error));
//# sourceMappingURL=app.js.map
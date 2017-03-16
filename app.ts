/// <reference path="types/express/express.d.ts" />
/// <reference path="types/body-parser/body-parser.d.ts" />
/// <reference path="types/formidable/formidable.d.ts" />

import "reflect-metadata";
// server http minimalista
import * as express from "express";
// serve a parsare i parametri del bodi per il metodo POST
import * as bodyParser from "body-parser";
// serve per formattare i dati con il form-data
import * as formidable from "formidable";
// per la manipolazione dei file
import * as fs from "fs";
// per creare la connessione al db
import { createConnection } from "typeorm";


import { NodeManager } from "libs/ro/NodeManager";
import { PipeInExpress } from "libs/ro/pipesIn/PipeInExpress";


// creo il server
let app = express();
// uso il body parser per poter gestire i parametri nel body mandati in POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connessione con router DB
//app.use("/photos", routerPhotos);
//app.use("/users", routerUsers);
//app.use("/posts", routerPosts);

let node = new NodeManager();
node.name = "testServer";
node.addPipeIn ( new PipeInExpress(node,app) );



// connessione al DB
createConnection({
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

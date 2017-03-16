/// <reference path="../types/express/express.d.ts" />

import * as express from "express";
export let routerUsers = express.Router();
import { getConnection } from "typeorm";

import { User } from "../models/User";


// prelevo tutte le entity
routerUsers.get("/", (req, res) => {
	let conn = getConnection();

	// entity manager
	conn.entityManager.find(User).then ( users => {
		res.json(users);
	});
});

// prelevo un entity tramite id
routerUsers.get("/:id", (req, res) => {
	let id = req.params.id;
	let conn = getConnection();

	// // utilizzo dell' EntityManager
	// conn.entityManager.findOneById ( User, id ).then ( user=> {
	// 	res.json(user);
	// });

	// utilizzo del repository
	let userRepository = conn.getRepository(User);
	userRepository.findOneById ( id ).then ( user => {
		res.json(user);
	});
});

// creo nuova entity
routerUsers.post("/", (req, res) => {
	let conn = getConnection();
	let user = new User();
    user.name = req.body.name;

	// entity manager
    conn.entityManager.persist(user).then(user => {
		res.json(user);
	});
});

// aggiorno un entity esistente
routerUsers.patch("/:id", (req, res) => {
	let conn = getConnection();

	// // entity manager
	// conn.entityManager.findOneById ( User, req.params.id ).then ( user => {
	// 	user.title = req.body.title;
	// 	conn.entityManager.persist(user);
	// });

	// repository
	let userRepository = conn.getRepository(User);
	userRepository.findOneById ( req.params.id ).then ( user => {
		user.name = req.body.name;
		conn.entityManager.persist(user).then ( user => {
			res.json(user);
		});
	});
});

// cancello un entity esistente
routerUsers.delete("/:id", (req, res) => {
	let conn = getConnection();

	// repository
	conn.entityManager.findOneById ( User, req.params.id ).then ( user => {
		conn.entityManager.remove(user).then ( user => {
			res.json (user);
		})
	})

	// // repository
	// let userRepository = conn.getRepository(User);
	// userRepository.findOneById ( req.params.id ).then ( user => {
	// 	userRepository.remove ( user ).then ( user => {
	//		res.json(user);
	// 		// removed!
	// 	})
	// })
	
});

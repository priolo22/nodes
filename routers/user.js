/// <reference path="../types/express/express.d.ts" />
"use strict";
const express = require("express");
exports.routerUsers = express.Router();
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
// prelevo tutte le entity
exports.routerUsers.get("/", (req, res) => {
    let conn = typeorm_1.getConnection();
    // entity manager
    conn.entityManager.find(User_1.User).then(users => {
        res.json(users);
    });
});
// prelevo un entity tramite id
exports.routerUsers.get("/:id", (req, res) => {
    let id = req.params.id;
    let conn = typeorm_1.getConnection();
    // // utilizzo dell' EntityManager
    // conn.entityManager.findOneById ( User, id ).then ( user=> {
    // 	res.json(user);
    // });
    // utilizzo del repository
    let userRepository = conn.getRepository(User_1.User);
    userRepository.findOneById(id).then(user => {
        res.json(user);
    });
});
// creo nuova entity
exports.routerUsers.post("/", (req, res) => {
    let conn = typeorm_1.getConnection();
    let user = new User_1.User();
    user.name = req.body.name;
    // entity manager
    conn.entityManager.persist(user).then(user => {
        res.json(user);
    });
});
// aggiorno un entity esistente
exports.routerUsers.patch("/:id", (req, res) => {
    let conn = typeorm_1.getConnection();
    // // entity manager
    // conn.entityManager.findOneById ( User, req.params.id ).then ( user => {
    // 	user.title = req.body.title;
    // 	conn.entityManager.persist(user);
    // });
    // repository
    let userRepository = conn.getRepository(User_1.User);
    userRepository.findOneById(req.params.id).then(user => {
        user.name = req.body.name;
        conn.entityManager.persist(user).then(user => {
            res.json(user);
        });
    });
});
// cancello un entity esistente
exports.routerUsers.delete("/:id", (req, res) => {
    let conn = typeorm_1.getConnection();
    // repository
    conn.entityManager.findOneById(User_1.User, req.params.id).then(user => {
        conn.entityManager.remove(user).then(user => {
            res.json(user);
        });
    });
    // // repository
    // let userRepository = conn.getRepository(User);
    // userRepository.findOneById ( req.params.id ).then ( user => {
    // 	userRepository.remove ( user ).then ( user => {
    //		res.json(user);
    // 		// removed!
    // 	})
    // })
});
//# sourceMappingURL=user.js.map
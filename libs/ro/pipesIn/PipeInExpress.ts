import { EventEmitter } from "events";
import { Action, ACTION_TYPE } from "../actions/Action";
import { NodeManager } from "../NodeManager";

import { PipeOutExpressResponse } from "../pipesOut/PipeOutExpressResponse";
import { PipeIn } from "./PipeIn";
import * as express from "express";



export class PipeInExpress extends PipeIn {
    constructor ( private parent:NodeManager, private app:express.Express ) {
        super();
        app.post("/ro/action", (req, res, next) => {

            let jsonAction = req.body.action;
            let action:Action; // DA FARE

            let pipeOut = new PipeOutExpressResponse ( res );
            this.parent.addPipeOut ( pipeOut );

            this.events.emit ( "action", action );
        });
    }
}

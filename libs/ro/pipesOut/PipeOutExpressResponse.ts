import { EventEmitter } from "events";
import { Action } from "../actions/Action";
import { NodeManager } from "../NodeManager";
import { PipeOut } from "../pipesOut/PipeOut";

import * as express from "express";



export class PipeOutExpressResponse extends PipeOut {
    constructor ( private res:express.Response ) {
        super();
    }

    public send ( action:Action ): void {
        this.res.send ( action );
    }
}


import { EventEmitter } from "events";
import { Action } from "../actions/Action";
import { NodeManager } from "../NodeManager";






export interface IPipeIn {
    events:EventEmitter;
}



export abstract class PipeIn {
    constructor () {
        this._events = new EventEmitter();
    }

    // PROPERTIES
    public get events():EventEmitter {
        return this._events;
    }
    private _events:EventEmitter;
    
}



export class PipeInLocal extends PipeIn {
    constructor () {
        super();
    }
}

import { EventEmitter } from "events";
import { Action } from "./Action";
import { NodeManager } from "./NodeManager";
import { PipeIn } from "./PipeIn";


export interface IPipeOut {
    send ( action:Action ): void; 
}

export abstract class PipeOut implements IPipeOut {

    public abstract send ( action:Action ): void; 
    
}

// permette di trasferire un action direttamente all'interno dello stesso programma
export class PipeOutJunction extends PipeOut {
    constructor ( private pipeIn:PipeIn ) {
        super();
    }

    public send ( action:Action ): void {
        this.pipeIn.events.emit ( "action", action );
    }
}


export class PipeOutLocal extends PipeOut {
    constructor () {
        super();
    }

    public get nodeLink():NodeManager {
        return this._nodeLink;
    }
    private _nodeLink:NodeManager;


    public send ( action:Action ): void {
        
    }

}

// export class PipeClientHttp extends PipeOut {
// }
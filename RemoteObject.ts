import { ACTION_TYPE, Action, ActionInstanceNew } from "./Action";
import { NodeManager } from "./NodeManager";





export class RemoteObject {

    // CONSTRUCTOR
    constructor () {
    }



    // PROPERTIES

    public key:number;

    get reference (): any {
        return this._reference;
    }
    set reference (value:any) {
        if ( this._reference!=null ) {
            //[II] eliminare le dipendenze con questo oggetto
            delete ( this._reference._ro );
        }
        this._reference = value;
        if ( this._reference!=null ) {
            this._reference._ro = value;
        }
    }
    private _reference:any;



    // METHODS

    


}



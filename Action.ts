import { NodeManager } from "./NodeManager";
import { Tags, ITaggable } from "./Tags";


/**
 * Permette di memorizzare un' "azione" che aggiorna un "nodo"
 * Un Action puo' far riferiemnto a:
 * - un instanza di oggetto
 * - ad un nodo (un domani sarà un namespace)
 * Le Action possono essere trasferite da un nodo all'altro tramite i canali (pipe)
 */


export enum ACTION_TYPE { 
    UNKNOW,
    INSTANCE_CREATE, INSTANCE_DELETE, 
    METHOD_CALL, METHOD_RETURN,
    PROPERTY_CHANGE
}





export abstract class Action implements ITaggable {

    // CONSTRUCTOR
    constructor ( type:ACTION_TYPE ) {
        this._type = type;
        this._tags = new Tags();
    }



    // PROPERTIES

    public get type():ACTION_TYPE {
        return this._type;
    }
    private _type:ACTION_TYPE = ACTION_TYPE.UNKNOW;

    public get tags():Tags {
        return this._tags;
    }
    private _tags:Tags;



    



    // METHODS

    /**
     * Esegue l'action nel contesto specificato nel paramentro "node"
     */
    public abstract execute ( node:NodeManager );

}

export class ActionInstanceNew extends Action {

    constructor( name:string );
    constructor( instance:any );
    constructor( instance:any|string ) {
        super(ACTION_TYPE.INSTANCE_CREATE);

        if ( instance instanceof String ) {
            this.instanceName = instance.toString();
        } else {
            this.instance = instance;
            this.instanceName = this.instance.constructor.name;
        }
    }

    private instance:any;
    private instanceName:string;

    public execute ( node:NodeManager ) {
        if ( this.instance == null ) {
            this.instance = new global[this.instance]();
        }
        node.addRemoteObject ( this.instance );
    }

}


import { NodeManager } from "./NodeManager";
import { Tags, ITaggable } from "./Tags";
import { REMOTE_METHOD_TYPE, RemoteMethod, RemoteProperty, RemoteClass } from "./RemoteObjectDecorators";

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

    // sono dei tag che qualificano l'action 
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

    constructor( className:string, instance?:any ) {
        super(ACTION_TYPE.INSTANCE_CREATE);
        this.instance = instance;
        this.instanceName = className;
    }

    private instance:any; // [II] in futuro questa propriet' non ci sara' piu' e l'istanza sara' creata sempre nella action
    private instanceName:string;

    public execute ( node:NodeManager ) {
        if ( this.instance == null ) { 
            this.instance = new global[this.instanceName]();
        }
        node.addRemoteObject ( this.instance );
    }

}

export class ActionPropertyChange extends Action {
    constructor( instanceId:number, propertyName:string, newValue:any ) {
        super(ACTION_TYPE.PROPERTY_CHANGE);
        this.propertyName = propertyName;
        this.newValue = newValue;
    }

    private instanceId:number;
    private propertyName:string;
    private newValue:any;

    public execute ( node:NodeManager ) {
        let obj = node.findRemoteObject ( this.instanceId );
        if ( obj == null ) return;
        obj[this.propertyName] = this.newValue;
        node.sendOut ( this );
    }
}


export class ActionMethodCall extends Action {

    constructor( instanceId?:number ) {
        super(ACTION_TYPE.METHOD_CALL);

    }

    private instanceId:number;
    private methodName:string;
    private params:Array<any>;

    public execute ( node:NodeManager ) {
        let obj = node.findRemoteObject ( this.instanceId );
        
        // capire se questo metodo è implementato o meno
        let methodType:REMOTE_METHOD_TYPE = REMOTE_METHOD_TYPE.ABSTRACT;
        // *********************************************

        switch ( methodType ) {
            case REMOTE_METHOD_TYPE.ABSTRACT:
                node.sendOut ( this );
            break;
            case REMOTE_METHOD_TYPE.IMPLEMENTED:
                obj[this.methodName](this.params);
            break;
        }
    }

}


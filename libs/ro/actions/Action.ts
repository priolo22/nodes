import { NodeManager } from "../NodeManager";
import { Tags, ITaggable } from "../Tags";
import { REMOTE_METHOD_TYPE, RemoteMethod, RemoteProperty, RemoteClass } from "../RemoteObjectDecorators";
import { PipeOut, PipeOutJunction, PipeOutLocal } from "../pipesOut/PipeOut";

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

    // metadata
    // sono tutti i dati di questa action tra cui:
    // -id nodo di creazione
    // -data di creazione
    // -array id nodi e data in cui è stata inserita


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

    public onInPipe () {
        
    }

    public onOutPipe () {

    }

    public clone(action?:Action): Action {
        if ( action == null ) return null;
        action._type = this._type;
        action._tags = this.tags.clone();
        return action;
    }

}

export class ActionInstanceNew extends Action {

    constructor( 
        private instanceName:string,
        private instanceId?:string,
        private instance?:any // [II] in futuro questa propriet' non ci sara' piu' e l'istanza sara' creata sempre nella action
    ) {
        super(ACTION_TYPE.INSTANCE_CREATE);
    }

    public execute ( node:NodeManager ) {
        if ( this.instance == null ) { 
            this.instance = node.createClassTnstance(this.instanceName);
        }
        this.instanceId = node.setKeyInObject (this.instance, this.instanceId);
        node.addRemoteObject ( this.instance, this.instanceId );

        // [II] queto lo deve fare l'evento "OnExecute" che va implementato sul pipe o sul nodo
        // oppure no... forse va fatto sul nodoin base ai pipe che ho a disposizione e all'action che devo mandare
        // lo mando fuori
        node.sendOut ( this.clone() );
    }

    public clone(): Action {
        let a = new ActionInstanceNew(
            this.instanceName,
            this.instanceId,
            null
        );
        return super.clone(a);
    }
}

export class ActionPropertyChange extends Action {

    constructor( 
        private instanceId:string, 
        private propertyName:string, 
        private newValue:any 
    ) {
        super(ACTION_TYPE.PROPERTY_CHANGE);
    }

    public execute ( node:NodeManager ) {
        let obj = node.findRemoteObject ( this.instanceId );
        if ( obj == null ) return;
        obj["_p_"+this.propertyName] = this.newValue;

        // lo mando fuori
        node.sendOut ( this );
    }

    public clone(): Action {
        let a = new ActionPropertyChange(
            this.instanceId,
            this.propertyName,
            this.newValue
        );
        return super.clone(a);
    }
}

export class ActionMethodCall extends Action {

    constructor( 
        private instanceId:string, 
        private methodName:string, 
        private params:Array<any>, 
        private idCall:string
    ) {
        super(ACTION_TYPE.METHOD_CALL);
    }

    public execute ( node:NodeManager ) {

        let target = node.findRemoteObject ( this.instanceId );
        let type:REMOTE_METHOD_TYPE = target["_m_type"+this.methodName];

        // il metodo non è implementato lo mando fuori
        if ( type == REMOTE_METHOD_TYPE.ABSTRACT ) {
            // lo mando fuori
            node.sendOut ( this );

        // il metodo è implementato quindi lo eseguo ...
        } else {
            let ret = target["_m_old"+this.methodName].apply ( target, this.params );
            // creo l'action di ritorno
            let actReturn = new ActionMethodReturn (this.idCall, ret);
            // lo mando anche al nodo corrente
            let junction = new PipeOutJunction ( node.pipeInLocal );
            junction.send ( actReturn );
        }
    }

    public clone(): Action {
        let a = new ActionMethodCall(
            this.instanceId,
            this.methodName,
            this.params,
            this.idCall
        );
        return super.clone(a);
    }
}

export class ActionMethodReturn extends Action {

    constructor( 
        private idCall:string, 
        private ret:any 
    ) {
        super(ACTION_TYPE.METHOD_RETURN);
    }

    public execute ( node:NodeManager ) {
        let response = node.deletePromise(this.idCall);
        if ( response != null ) {
            response(this.ret);
        }
        // lo mando fuori
        node.sendOut ( this );
    }

    public clone(): Action {
        let a = new ActionMethodReturn(
            this.idCall,
            this.ret
        );
        return super.clone(a);
    }
    
}


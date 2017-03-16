
import { ACTION_TYPE, Action, ActionInstanceNew, ActionPropertyChange, ActionMethodCall } from "./actions/Action";
import { NodeManager } from "./NodeManager";
import { PipeOut, PipeOutJunction, PipeOutLocal } from "./pipesOut/PipeOut";


export enum REMOTE_METHOD_TYPE { IMPLEMENTED, ABSTRACT }


// OVERWRITING del costruttore della classe riferimento
export function RemoteClass ( node?:NodeManager, className?:string ): any {

    let nodeContext = (node!=null? node : NodeManager.Current);
    let junction = new PipeOutJunction ( nodeContext.pipeInLocal );

    return function ( constructor:any ) {

        if ( className==null ) className = constructor.name;
        nodeContext.addClass ( className, constructor );

        var f: any = function (...args) {
            let instance = nodeContext.createClassTnstance(className); // [II] l'operazione di creazione dell'oggetto dovrebbe essere fatta dalla action
            let action = new ActionInstanceNew( className, null, instance );
            junction.send ( action );
            return instance;
        }
        f.prototype = constructor.prototype;

        return f;
    }
}


// OVERWRITING delle proprietà
export function RemoteProperty( node?:NodeManager ): (target:any, key:string) => any {
    let nodeContext = (node!=null? node : NodeManager.Current);
    let junction = new PipeOutJunction ( nodeContext.pipeInLocal );

    /**
     * "target"" è il contesto, cioe' l'oggetto che contiene la proprietà
     * "name" è il nome della properietà
     */
    return (target:any, key:string) => {

        // creo la proprietà nascosta:
        // [II] DA SISTEMARE!!!
        target["_p_"+key] = this[key];

        // // property value
        // var _val = this[key];
 
        // property getter
        var getter = function () {
            return target["_p_"+key];
        };
 
        // property setter
        var setter = function (newVal) {
            //[II] da sistemare! si tratta dell'impostazione iniziale quindi il "key" non è stato ancora definito
            if ( target["key"] == null ) return;
            let action = new ActionPropertyChange ( target["key"], key, newVal );
            junction.send ( action );
        };
 
        // Delete property.
        if (delete this[key]) {
            // Create new property with getter and setter
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
}


// OVERWRITING dei metodi della classe riferimento
export function RemoteMethod( type:REMOTE_METHOD_TYPE=REMOTE_METHOD_TYPE.IMPLEMENTED, node?:NodeManager,  ): (target:any, propertyKey:string, descriptor:PropertyDescriptor) => any {
    let nodeContext = (node!=null? node : NodeManager.Current);
    let junction = new PipeOutJunction ( nodeContext.pipeInLocal );

    // target: Istanza
    // methodName: nome del metodo
    return (target:any, methodName:string, descriptor: PropertyDescriptor) => {

        target["_m_type"+methodName] = type;
        target["_m_old"+methodName] = descriptor.value;

        descriptor.value = (...args) => {
            let idCall = new Date().getTime().toString(16);
            let promise = nodeContext.createPromise(idCall);
            let action = new ActionMethodCall ( target.key, methodName, args, idCall ); 
            junction.send ( action );

            return promise;
        };
    };
}


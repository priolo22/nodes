
import { ACTION_TYPE, Action, ActionInstanceNew } from "./Action";
import { NodeManager } from "./NodeManager";
import { PipeOut, PipeOutJunction, PipeOutLocal } from "./PipeOut";



export enum REMOTE_METHOD_TYPE { IMPLEMENTED, ABSTRACT }


// OVERWRITING del costruttore della classe riferimento
export function RemoteClass ( node?:NodeManager, alias?:string ): any {

    let nodeContext = (node!=null? node : NodeManager.Current);
    let junction = new PipeOutJunction ( nodeContext.pipeInLocal );

    return function (original:any) {
        let instance = (new original()).__proto__;
        let action = new ActionInstanceNew( instance );
        junction.send ( action );
        return instance;
    };
}


// OVERWRITING delle proprietà
export function RemoteProperty( node?:NodeManager ): (target:any, key:string) => any {
    return (target:any, propertyKey:string) => {
        console.log ( target );
    }
}


// OVERWRITING dei metodi della classe riferimento
export function RemoteMethod( type?:REMOTE_METHOD_TYPE, node?:NodeManager,  ): (target:any, propertyKey:string, descriptor:PropertyDescriptor) => any {

    let nodeContext = (node!=null? node : NodeManager.Current);

    return (target:any, propertyKey:string, descriptor: PropertyDescriptor) => {
        let oldFunc = descriptor.value;
        descriptor.value = (...args) => {
            console.log( "sovrascrittura metodo istanza key "+ target._key);
            return oldFunc.apply(target,args);
        };
    };
}


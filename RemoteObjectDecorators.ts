
import { ACTION_TYPE, Action, ActionInstanceNew, ActionPropertyChange } from "./Action";
import { NodeManager } from "./NodeManager";
import { PipeOut, PipeOutJunction, PipeOutLocal } from "./PipeOut";


export enum REMOTE_METHOD_TYPE { IMPLEMENTED, ABSTRACT }


// OVERWRITING del costruttore della classe riferimento
export function RemoteClass ( node?:NodeManager, className?:string ): any {



// // save a reference to the original constructor
//   var original = target;
 
//   // a utility function to generate instances of a class
//   function construct(constructor, args) {
//     var c : any = function () {
//       return constructor.apply(this, args);
//     }
//     c.prototype = constructor.prototype;
//     return new c();
//   }
 
//   // the new constructor behaviour
//   var f : any = function (...args) {
//     console.log("New: " + original.name);
//     return construct(original, args);
//   }
 
//   // copy prototype so intanceof operator still works
//   f.prototype = original.prototype;
 
//   // return new constructor (will override original)
//   return f;



    let nodeContext = (node!=null? node : NodeManager.Current);
    let junction = new PipeOutJunction ( nodeContext.pipeInLocal );

    return function ( constructor: any ) {
        var f: any = function (...args) {
            var instance = new constructor(); // [II] l'operazione di creazione dell'oggetto dovrebbe essere fatta dalla action
            let action = new ActionInstanceNew( className, instance );
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

        // property value
        var _val = this[key];
 
        // property getter
        var getter = function () {
            return _val;
        };
 
        // property setter
        var setter = function (newVal) {
            let action = new ActionPropertyChange ( target["key"], key, newVal );
            junction.send ( action );
            _val = newVal;
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
export function RemoteMethod( type?:REMOTE_METHOD_TYPE, node?:NodeManager,  ): (target:any, propertyKey:string, descriptor:PropertyDescriptor) => any {
    let nodeContext = (node!=null? node : NodeManager.Current);

    // target: Istanza
    // methodName: nome del metodo
    return (target:any, methodName:string, descriptor: PropertyDescriptor) => {

let returnType = Reflect.getMetadata("design:returntypes", target, methodName);

        let oldFunc = descriptor.value;
        descriptor.value = (...args) => {
            console.log( "sovrascrittura metodo istanza key "+ target.key);

            if ( type==REMOTE_METHOD_TYPE.ABSTRACT ) {
                if ( returnType instanceof Promise ) {
                    console.log( "OK!" )
                }
            }

            return oldFunc.apply(target,args);
        };
    };
}


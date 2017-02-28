"use strict";
const Action_1 = require("./Action");
const NodeManager_1 = require("./NodeManager");
const PipeOut_1 = require("./PipeOut");
var REMOTE_METHOD_TYPE;
(function (REMOTE_METHOD_TYPE) {
    REMOTE_METHOD_TYPE[REMOTE_METHOD_TYPE["IMPLEMENTED"] = 0] = "IMPLEMENTED";
    REMOTE_METHOD_TYPE[REMOTE_METHOD_TYPE["ABSTRACT"] = 1] = "ABSTRACT";
})(REMOTE_METHOD_TYPE = exports.REMOTE_METHOD_TYPE || (exports.REMOTE_METHOD_TYPE = {}));
// OVERWRITING del costruttore della classe riferimento
function RemoteClass(node, className) {
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
    let nodeContext = (node != null ? node : NodeManager_1.NodeManager.Current);
    let junction = new PipeOut_1.PipeOutJunction(nodeContext.pipeInLocal);
    return function (constructor) {
        var f = function (...args) {
            var instance = new constructor(); // [II] l'operazione di creazione dell'oggetto dovrebbe essere fatta dalla action
            let action = new Action_1.ActionInstanceNew(className, instance);
            junction.send(action);
            return instance;
        };
        f.prototype = constructor.prototype;
        return f;
    };
}
exports.RemoteClass = RemoteClass;
// OVERWRITING delle proprietà
function RemoteProperty(node) {
    let nodeContext = (node != null ? node : NodeManager_1.NodeManager.Current);
    let junction = new PipeOut_1.PipeOutJunction(nodeContext.pipeInLocal);
    /**
     * "target"" è il contesto, cioe' l'oggetto che contiene la proprietà
     * "name" è il nome della properietà
     */
    return (target, key) => {
        // property value
        var _val = this[key];
        // property getter
        var getter = function () {
            return _val;
        };
        // property setter
        var setter = function (newVal) {
            let action = new Action_1.ActionPropertyChange(target["key"], key, newVal);
            junction.send(action);
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
    };
}
exports.RemoteProperty = RemoteProperty;
// OVERWRITING dei metodi della classe riferimento
function RemoteMethod(type, node) {
    let nodeContext = (node != null ? node : NodeManager_1.NodeManager.Current);
    // target: Istanza
    // methodName: nome del metodo
    return (target, methodName, descriptor) => {
        let returnType = Reflect.getMetadata("design:returntypes", target, methodName);
        let oldFunc = descriptor.value;
        descriptor.value = (...args) => {
            console.log("sovrascrittura metodo istanza key " + target.key);
            if (type == REMOTE_METHOD_TYPE.ABSTRACT) {
                if (returnType instanceof Promise) {
                    console.log("OK!");
                }
            }
            return oldFunc.apply(target, args);
        };
    };
}
exports.RemoteMethod = RemoteMethod;
//# sourceMappingURL=RemoteObjectDecorators.js.map
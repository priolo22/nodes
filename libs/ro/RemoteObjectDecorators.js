"use strict";
const Action_1 = require("./actions/Action");
const NodeManager_1 = require("./NodeManager");
const PipeOut_1 = require("./pipesOut/PipeOut");
var REMOTE_METHOD_TYPE;
(function (REMOTE_METHOD_TYPE) {
    REMOTE_METHOD_TYPE[REMOTE_METHOD_TYPE["IMPLEMENTED"] = 0] = "IMPLEMENTED";
    REMOTE_METHOD_TYPE[REMOTE_METHOD_TYPE["ABSTRACT"] = 1] = "ABSTRACT";
})(REMOTE_METHOD_TYPE = exports.REMOTE_METHOD_TYPE || (exports.REMOTE_METHOD_TYPE = {}));
// OVERWRITING del costruttore della classe riferimento
function RemoteClass(node, className) {
    let nodeContext = (node != null ? node : NodeManager_1.NodeManager.Current);
    let junction = new PipeOut_1.PipeOutJunction(nodeContext.pipeInLocal);
    return function (constructor) {
        if (className == null)
            className = constructor.name;
        nodeContext.addClass(className, constructor);
        var f = function (...args) {
            let instance = nodeContext.createClassTnstance(className); // [II] l'operazione di creazione dell'oggetto dovrebbe essere fatta dalla action
            let action = new Action_1.ActionInstanceNew(className, null, instance);
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
        // creo la proprietà nascosta:
        // [II] DA SISTEMARE!!!
        target["_p_" + key] = this[key];
        // // property value
        // var _val = this[key];
        // property getter
        var getter = function () {
            return target["_p_" + key];
        };
        // property setter
        var setter = function (newVal) {
            //[II] da sistemare! si tratta dell'impostazione iniziale quindi il "key" non è stato ancora definito
            if (target["key"] == null)
                return;
            let action = new Action_1.ActionPropertyChange(target["key"], key, newVal);
            junction.send(action);
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
function RemoteMethod(type = REMOTE_METHOD_TYPE.IMPLEMENTED, node) {
    let nodeContext = (node != null ? node : NodeManager_1.NodeManager.Current);
    let junction = new PipeOut_1.PipeOutJunction(nodeContext.pipeInLocal);
    // target: Istanza
    // methodName: nome del metodo
    return (target, methodName, descriptor) => {
        target["_m_type" + methodName] = type;
        target["_m_old" + methodName] = descriptor.value;
        descriptor.value = (...args) => {
            let idCall = new Date().getTime().toString(16);
            let promise = nodeContext.createPromise(idCall);
            let action = new Action_1.ActionMethodCall(target.key, methodName, args, idCall);
            junction.send(action);
            return promise;
        };
    };
}
exports.RemoteMethod = RemoteMethod;
//# sourceMappingURL=RemoteObjectDecorators.js.map
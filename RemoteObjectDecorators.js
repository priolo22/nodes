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
function RemoteClass(node, alias) {
    let nodeContext = (node != null ? node : NodeManager_1.NodeManager.Current);
    let junction = new PipeOut_1.PipeOutJunction(nodeContext.pipeInLocal);
    return function (original) {
        let instance = (new original()).__proto__;
        let action = new Action_1.ActionInstanceNew(instance);
        junction.send(action);
        return instance;
    };
}
exports.RemoteClass = RemoteClass;
// OVERWRITING delle proprietà
function RemoteProperty(node) {
    return (target, propertyKey) => {
        console.log(target);
    };
}
exports.RemoteProperty = RemoteProperty;
// OVERWRITING dei metodi della classe riferimento
function RemoteMethod(type, node) {
    let nodeContext = (node != null ? node : NodeManager_1.NodeManager.Current);
    return (target, propertyKey, descriptor) => {
        let oldFunc = descriptor.value;
        descriptor.value = (...args) => {
            console.log("sovrascrittura metodo istanza key " + target._key);
            return oldFunc.apply(target, args);
        };
    };
}
exports.RemoteMethod = RemoteMethod;
//# sourceMappingURL=RemoteObjectDecorators.js.map
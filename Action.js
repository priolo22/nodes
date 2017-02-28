"use strict";
const Tags_1 = require("./Tags");
const RemoteObjectDecorators_1 = require("./RemoteObjectDecorators");
/**
 * Permette di memorizzare un' "azione" che aggiorna un "nodo"
 * Un Action puo' far riferiemnto a:
 * - un instanza di oggetto
 * - ad un nodo (un domani sarà un namespace)
 * Le Action possono essere trasferite da un nodo all'altro tramite i canali (pipe)
 */
var ACTION_TYPE;
(function (ACTION_TYPE) {
    ACTION_TYPE[ACTION_TYPE["UNKNOW"] = 0] = "UNKNOW";
    ACTION_TYPE[ACTION_TYPE["INSTANCE_CREATE"] = 1] = "INSTANCE_CREATE";
    ACTION_TYPE[ACTION_TYPE["INSTANCE_DELETE"] = 2] = "INSTANCE_DELETE";
    ACTION_TYPE[ACTION_TYPE["METHOD_CALL"] = 3] = "METHOD_CALL";
    ACTION_TYPE[ACTION_TYPE["METHOD_RETURN"] = 4] = "METHOD_RETURN";
    ACTION_TYPE[ACTION_TYPE["PROPERTY_CHANGE"] = 5] = "PROPERTY_CHANGE";
})(ACTION_TYPE = exports.ACTION_TYPE || (exports.ACTION_TYPE = {}));
class Action {
    // CONSTRUCTOR
    constructor(type) {
        this._type = ACTION_TYPE.UNKNOW;
        this._type = type;
        this._tags = new Tags_1.Tags();
    }
    // PROPERTIES
    get type() {
        return this._type;
    }
    // sono dei tag che qualificano l'action 
    get tags() {
        return this._tags;
    }
}
exports.Action = Action;
class ActionInstanceNew extends Action {
    constructor(className, instance) {
        super(ACTION_TYPE.INSTANCE_CREATE);
        this.instance = instance;
        this.instanceName = className;
    }
    execute(node) {
        if (this.instance == null) {
            this.instance = new global[this.instanceName]();
        }
        node.addRemoteObject(this.instance);
    }
}
exports.ActionInstanceNew = ActionInstanceNew;
class ActionPropertyChange extends Action {
    constructor(instanceId, propertyName, newValue) {
        super(ACTION_TYPE.PROPERTY_CHANGE);
        this.propertyName = propertyName;
        this.newValue = newValue;
    }
    execute(node) {
        let obj = node.findRemoteObject(this.instanceId);
        if (obj == null)
            return;
        obj[this.propertyName] = this.newValue;
        node.sendOut(this);
    }
}
exports.ActionPropertyChange = ActionPropertyChange;
class ActionMethodCall extends Action {
    constructor(instanceId) {
        super(ACTION_TYPE.METHOD_CALL);
    }
    execute(node) {
        let obj = node.findRemoteObject(this.instanceId);
        // capire se questo metodo è implementato o meno
        let methodType = RemoteObjectDecorators_1.REMOTE_METHOD_TYPE.ABSTRACT;
        // *********************************************
        switch (methodType) {
            case RemoteObjectDecorators_1.REMOTE_METHOD_TYPE.ABSTRACT:
                node.sendOut(this);
                break;
            case RemoteObjectDecorators_1.REMOTE_METHOD_TYPE.IMPLEMENTED:
                obj[this.methodName](this.params);
                break;
        }
    }
}
exports.ActionMethodCall = ActionMethodCall;
//# sourceMappingURL=Action.js.map
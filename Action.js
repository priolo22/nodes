"use strict";
const Tags_1 = require("./Tags");
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
    get tags() {
        return this._tags;
    }
}
exports.Action = Action;
class ActionInstanceNew extends Action {
    constructor(instance) {
        super(ACTION_TYPE.INSTANCE_CREATE);
        if (instance instanceof String) {
            this.instanceName = instance.toString();
        }
        else {
            this.instance = instance;
            this.instanceName = this.instance.constructor.name;
        }
    }
    execute(node) {
        if (this.instance == null) {
            this.instance = new global[this.instance]();
        }
        node.addRemoteObject(this.instance);
    }
}
exports.ActionInstanceNew = ActionInstanceNew;
//# sourceMappingURL=Action.js.map
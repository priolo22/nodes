"use strict";
const Tags_1 = require("../Tags");
const RemoteObjectDecorators_1 = require("../RemoteObjectDecorators");
const PipeOut_1 = require("../pipesOut/PipeOut");
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
    clone(action) {
        if (action == null)
            return null;
        action._type = this._type;
        action._tags = this.tags.clone();
        return action;
    }
}
exports.Action = Action;
class ActionInstanceNew extends Action {
    constructor(instanceName, instanceId, instance // [II] in futuro questa propriet' non ci sara' piu' e l'istanza sara' creata sempre nella action
    ) {
        super(ACTION_TYPE.INSTANCE_CREATE);
        this.instanceName = instanceName;
        this.instanceId = instanceId;
        this.instance = instance; // [II] in futuro questa propriet' non ci sara' piu' e l'istanza sara' creata sempre nella action
    }
    execute(node) {
        if (this.instance == null) {
            this.instance = node.createClassTnstance(this.instanceName);
        }
        this.instanceId = node.setKeyInObject(this.instance, this.instanceId);
        node.addRemoteObject(this.instance, this.instanceId);
        // lo mando fuori
        node.sendOut(this.clone());
    }
    clone() {
        let a = new ActionInstanceNew(this.instanceName, this.instanceId, null);
        return super.clone(a);
    }
}
exports.ActionInstanceNew = ActionInstanceNew;
class ActionPropertyChange extends Action {
    constructor(instanceId, propertyName, newValue) {
        super(ACTION_TYPE.PROPERTY_CHANGE);
        this.instanceId = instanceId;
        this.propertyName = propertyName;
        this.newValue = newValue;
    }
    execute(node) {
        let obj = node.findRemoteObject(this.instanceId);
        if (obj == null)
            return;
        obj["_p_" + this.propertyName] = this.newValue;
        // lo mando fuori
        node.sendOut(this);
    }
    clone() {
        let a = new ActionPropertyChange(this.instanceId, this.propertyName, this.newValue);
        return super.clone(a);
    }
}
exports.ActionPropertyChange = ActionPropertyChange;
class ActionMethodCall extends Action {
    constructor(instanceId, methodName, params, idCall) {
        super(ACTION_TYPE.METHOD_CALL);
        this.instanceId = instanceId;
        this.methodName = methodName;
        this.params = params;
        this.idCall = idCall;
    }
    execute(node) {
        let target = node.findRemoteObject(this.instanceId);
        let type = target["_m_type" + this.methodName];
        // il metodo non è implementato lo mando fuori
        if (type == RemoteObjectDecorators_1.REMOTE_METHOD_TYPE.ABSTRACT) {
            // lo mando fuori
            node.sendOut(this);
        }
        else {
            let ret = target["_m_old" + this.methodName].apply(target, this.params);
            // creo l'action di ritorno
            let actReturn = new ActionMethodReturn(this.idCall, ret);
            // lo mando anche al nodo corrente
            let junction = new PipeOut_1.PipeOutJunction(node.pipeInLocal);
            junction.send(actReturn);
        }
    }
    clone() {
        let a = new ActionMethodCall(this.instanceId, this.methodName, this.params, this.idCall);
        return super.clone(a);
    }
}
exports.ActionMethodCall = ActionMethodCall;
class ActionMethodReturn extends Action {
    constructor(idCall, ret) {
        super(ACTION_TYPE.METHOD_RETURN);
        this.idCall = idCall;
        this.ret = ret;
    }
    execute(node) {
        let response = node.deletePromise(this.idCall);
        if (response != null) {
            response(this.ret);
        }
        // lo mando fuori
        node.sendOut(this);
    }
    clone() {
        let a = new ActionMethodReturn(this.idCall, this.ret);
        return super.clone(a);
    }
}
exports.ActionMethodReturn = ActionMethodReturn;
//# sourceMappingURL=Action.js.map
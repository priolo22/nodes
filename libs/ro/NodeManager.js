"use strict";
const PipeIn_1 = require("./pipesIn/PipeIn");
const PipeOut_1 = require("./pipesOut/PipeOut");
class NodeManager {
    // CONSTRUCTOR
    constructor() {
        this.name = "";
        this.syncronize = false;
        // PROMISE DICTIONARY 
        this.actionsPromise = {};
        // CLASSI
        this.classes = {};
        this.pipesIn = [];
        this.pipesOut = [];
        this.actions = [];
        this.actionsHistory = [];
        this.remoteObjects = {};
    }
    // STATIC
    /** Restituisce il contesto
     * Per il momento è un singleton
     * ma in futuro si dovranno creare dei namescpace privati e uno globale
     */
    static get Current() {
        if (NodeManager._Current == null) {
            NodeManager._Current = new NodeManager();
        }
        return NodeManager._Current;
    }
    // PROPERTIES
    get id() {
        if (this._id == null) {
            // in futuro sara' "macaddress-getTime()-random"
            this._id = Math.floor((Math.random() * 99999) + 1).toString(16);
        }
        return this._id;
    }
    /**
     * E' il canale per inserire le action localmente
     */
    get pipeInLocal() {
        if (this._pipeInLocal == null) {
            this._pipeInLocal = new PipeIn_1.PipeInLocal();
            this.addPipeIn(this._pipeInLocal);
        }
        return this._pipeInLocal;
    }
    /**
     * inserisce un nuovo canale di input
     * cioe' che riceve action
     */
    addPipeIn(pipe) {
        this.pipesIn.push(pipe);
        pipe.events.on("action", this.receiveActionFromPipeIn.bind(this));
    }
    /**
     * funzione richiamata quando arriva una nuova action da un pipe
     */
    receiveActionFromPipeIn(action, pipe) {
        let cont = this.addAction(action);
        if (cont == true)
            this.flushActions(); //[II] il flush (quindi l'esecuzione delle action) va fatto in maniera strutturata e non semplicemente quando arriva una action. In maniera da garantire prestazioni e sincronizzazione
    }
    /**
     * E' il canale per inserire le action localmente
     */
    get pipeOutLocal() {
        if (this._pipeOutLocal == null) {
            this._pipeOutLocal = new PipeOut_1.PipeOutLocal();
            this.addPipeOut(this._pipeOutLocal);
        }
        return this._pipeOutLocal;
    }
    /**
     * inserisce un nuovo canale di input
     * cioe' che riceve action
     */
    addPipeOut(pipe) {
        this.pipesOut.push(pipe);
    }
    /**
     * inserisce un nuovo canale di input
     * cioe' che riceve action
     */
    removePipeOut(pipe) {
        this.pipesOut.remove(pipe);
    }
    /**
     * manda un action su tutti i pipe out
     */
    sendOut(action) {
        this.pipesOut.forEach(pipe => {
            pipe.send(action);
        });
    }
    /**
     * Inserisco una nuova action nel node
     * serviranno ad aggiornare il suo stato.
     * invio l'action a tutti i nodi collegati tramite "pipe"
     */
    addAction(action) {
        // [II] per prevenire i loop infiniti non inserisco action che sono gia' stati inseriti
        // questo lo verifico con il tags ... ma devo trovare un sistema migliore
        if (action.tags.findIndex(this.id) != -1)
            return false;
        action.tags.add(this.id);
        // inserisco l'action nell'array
        this.actions.push(action);
        return true;
    }
    /**
     * Esegue tutte le action nel buffer
     * aggiorna lo stato
     * sposta le action eseguite correttamente nella history
     */
    flushActions() {
        if (this.syncronize == true)
            return;
        this.syncronize = true;
        // [II] tocca controllare NON che non ci siano piu' elementi ma che tutte le action sono state "eseguite" quindi potrebbero stare alcuni elementi ma "bloccati" in attesa e in tal caso deve usitre dal ciclo while
        let cont = 0;
        while (this.actions.length != 0) {
            let action = this.actions.shift();
            let result = action.execute(this);
        }
        this.syncronize = false;
    }
    // ACTION: Creazione di una nuova istanza
    // qua creo pure la key che lega il RO al "nodo"
    addRemoteObject(obj, key) {
        this.remoteObjects[key] = obj;
    }
    setKeyInObject(obj, key) {
        if (key == null) {
            key = new Date().getTime().toString(16);
        }
        obj["key"] = key;
        return key;
    }
    /**
     * Restituisce un instanza tramite key
     * @param key
     */
    findRemoteObject(key) {
        let instance = this.remoteObjects[key];
        if (!instance)
            return;
        return instance;
    }
    createPromise(key) {
        let promise = new Promise((resolve, reject) => {
            this.actionsPromise[key] = resolve;
        });
        return promise;
    }
    deletePromise(key) {
        let resolve = this.actionsPromise[key];
        delete this.actionsPromise[key];
        return resolve;
    }
    addClass(key, constr) {
        this.classes[key] = constr;
    }
    createClassTnstance(key) {
        let constr = this.classes[key];
        let instance = new constr();
        return instance.__proto__;
    }
}
NodeManager._Current = null;
exports.NodeManager = NodeManager;
//# sourceMappingURL=NodeManager.js.map
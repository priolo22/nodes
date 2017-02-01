"use strict";
const PipeIn_1 = require("./PipeIn");
const PipeOut_1 = require("./PipeOut");
class NodeManager {
    // CONSTRUCTOR
    constructor() {
        this.pipesIn = [];
        this.pipesOut = [];
        this.actions = [];
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
    receiveActionFromPipeIn(action, pipe) {
        this.addAction(action);
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
     * Inserisco una nuova action nel node
     * serviranno ad aggiornare il suo stato.
     * invio l'action a tutti i nodi collegati tramite "pipe"
     */
    addAction(action) {
        if (action.tags.findIndex(this.id) != -1)
            return;
        action.tags.add(this.id);
        this.actions.push(action);
        this.pipesOut.forEach(pipe => {
            pipe.send(action);
        });
    }
    /**
     * Esegue tutte le action nel buffer
     * aggiorna lo stato
     * sposta le action eseguite correttamente nella history
     */
    flush() {
        let toHistory = [];
        let toActions = [];
        this.actions.forEach(action => {
            let result = action.execute(this);
            (result == false ? toActions : toHistory).push(result);
        });
        this.actionsHistory.concat(toHistory);
        this.actions = toActions;
    }
    // ACTION: Creazione di una nuova istanza
    // qua creo pure la key che lega il RO al "nodo"
    addRemoteObject(ro) {
        ro.key = new Date().getTime();
        this.remoteObjects[ro.key] = ro;
    }
}
NodeManager._Current = null;
exports.NodeManager = NodeManager;
//# sourceMappingURL=NodeManager.js.map
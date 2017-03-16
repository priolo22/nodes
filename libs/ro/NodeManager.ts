
import { PipeIn, PipeInLocal } from "./pipesIn/PipeIn";
import { PipeOut, PipeOutLocal } from "./pipesOut/PipeOut";
import { Action } from "./actions/Action";
import { RemoteObject } from "./RemoteObject";



export class NodeManager  {

    public name:string = "";

    // STATIC

    /** Restituisce il contesto
     * Per il momento è un singleton
     * ma in futuro si dovranno creare dei namescpace privati e uno globale
     */
    static get Current():NodeManager {
        if ( NodeManager._Current == null ) {
            NodeManager._Current = new NodeManager();
        }
        return NodeManager._Current;
    }
    private static _Current:NodeManager = null;

    // CONSTRUCTOR
    constructor () {
        this.pipesIn = [];
        this.pipesOut = [];
        this.actions = [];
        this.actionsHistory = [];
        this.remoteObjects = {};
    }

    // PROPERTIES
    public get id():string {
        if ( this._id==null ) {
            // in futuro sara' "macaddress-getTime()-random"
            this._id = Math.floor((Math.random() * 99999) + 1).toString(16);
        }
        return this._id;
    }
    private _id:string;

// -------------------------------------------------------------------
// PIPES

    // PIPE IN

    /**
     * Sono tutti i canali per trasferire le action da un nodo all'altro
     */
    private pipesIn:Array<PipeIn>;

    /**
     * E' il canale per inserire le action localmente
     */
    public get pipeInLocal():PipeInLocal {
        if ( this._pipeInLocal == null ){
            this._pipeInLocal = new PipeInLocal();
            this.addPipeIn ( this._pipeInLocal );
        }
        return this._pipeInLocal;
    }
    private _pipeInLocal:PipeInLocal;

    /**
     * inserisce un nuovo canale di input
     * cioe' che riceve action
     */
    public addPipeIn ( pipe:PipeIn ): void {
        this.pipesIn.push(pipe);
        pipe.events.on ( "action", this.receiveActionFromPipeIn.bind(this) );
    }

    /**
     * funzione richiamata quando arriva una nuova action da un pipe
     */
    private receiveActionFromPipeIn ( action:Action, pipe:PipeIn ) {
        let cont = this.addAction( action );
        if ( cont==true ) this.flushActions(); //[II] il flush (quindi l'esecuzione delle action) va fatto in maniera strutturata e non semplicemente quando arriva una action. In maniera da garantire prestazioni e sincronizzazione
    }

    // PIPE OUT

    private pipesOut:Array<PipeOut>;

    /**
     * E' il canale per inserire le action localmente
     */
    public get pipeOutLocal():PipeOutLocal {
        if ( this._pipeOutLocal == null ){
            this._pipeOutLocal = new PipeOutLocal();
            this.addPipeOut ( this._pipeOutLocal );
        }
        return this._pipeOutLocal;
    }
    private _pipeOutLocal:PipeOutLocal;

    /**
     * inserisce un nuovo canale di input
     * cioe' che riceve action
     */
    public addPipeOut ( pipe:PipeOut ): void {
        this.pipesOut.push(pipe);
    }

    /**
     * manda un action su tutti i pipe out
     */
    public sendOut ( action:Action ): void {
        this.pipesOut.forEach ( pipe => {
            pipe.send ( action );
        });
    }

// -------------------------------------------------------------------
// ACTIONS

    /**
     * Le action che devono essere eseguite
     */
    private actions:Action[];

    /**
     * Action eseguite buone per il rollback
     */
    private actionsHistory:Action[];

    /**
     * Inserisco una nuova action nel node 
     * serviranno ad aggiornare il suo stato.
     * invio l'action a tutti i nodi collegati tramite "pipe"
     */
    public addAction ( action:Action ): boolean {
        // [II] per prevenire i loop infiniti non inserisco action che sono gia' stati inseriti
        // questo lo verifico con il tags ... ma devo trovare un sistema migliore
        if ( action.tags.findIndex(this.id)!=-1 ) return false;
        action.tags.add ( this.id );

        // inserisco l'action nell'array
        this.actions.push ( action );

        return true;
    }

    /**
     * Esegue tutte le action nel buffer
     * aggiorna lo stato
     * sposta le action eseguite correttamente nella history
     */
    public flushActions() {
        if ( this.syncronize==true) return;
        this.syncronize = true;

        // [II] tocca controllare NON che non ci siano piu' elementi ma che tutte le action sono state "eseguite" quindi potrebbero stare alcuni elementi ma "bloccati" in attesa e in tal caso deve usitre dal ciclo while
        let cont = 0;
        while ( this.actions.length != 0 ) {
            let action = this.actions.shift();
            let result = action.execute(this);
            // [II] controllare quindi se l'action ha avuto successo "result" nel caso in cui non si possa fare: valutare se bloccare tutto e rimandare al prossimo flush
        }

        this.syncronize = false;
    }

    private syncronize:boolean = false;


// -------------------------------------------------------------------
// OBJECTS POPULATION

    /**
     * Tutti gli oggetti contenuti in questo node
     */
    private remoteObjects:{[key:string]:RemoteObject};

    // ACTION: Creazione di una nuova istanza
    // qua creo pure la key che lega il RO al "nodo"
    public addRemoteObject ( obj:any, key?:string ):void {
        this.remoteObjects[key] = obj;
    }

    public setKeyInObject ( obj:any, key?:string ) : string {
        if ( key == null ){
            key = new Date().getTime().toString(16);
        }
        obj["key"] = key;
        return key;
    }

    /**
     * Restituisce un instanza tramite key
     * @param key 
     */
    public findRemoteObject ( key:string ): any {
        let instance = this.remoteObjects[key];
        if ( !instance ) return;
        return instance;
    }

// PROMISE DICTIONARY 

    private actionsPromise:{[key:string]:(ret:any)=>void} = {};

    public createPromise (key:string): Promise<any> {
        let promise = new Promise ( (resolve,reject)=>{
            this.actionsPromise[key] = resolve;
        });
        
        return promise;
    }

    public deletePromise (key:string): (ret:any)=>void {
        let resolve = this.actionsPromise[key];
        delete this.actionsPromise[key];
        return resolve;
    }

// CLASSI

    private classes:Object = {};

    public addClass ( key:string, constr:any ): void {
        this.classes[key] = constr;
    }

    public createClassTnstance ( key:string ): any {
        let constr = this.classes[key];
        let instance =  new constr();
        return instance.__proto__;
    }

}


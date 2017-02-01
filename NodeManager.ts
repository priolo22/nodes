
import { PipeIn, PipeInLocal } from "./PipeIn";
import { PipeOut, PipeOutLocal } from "./PipeOut";
import { Action } from "./Action";
import { RemoteObject } from "./RemoteObject";



export class NodeManager  {

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
    private receiveActionFromPipeIn ( action:Action, pipe:PipeIn ) {
        this.addAction( action );
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
    public addAction ( action:Action ) {
        if ( action.tags.findIndex(this.id)!=-1 ) return;
        action.tags.add ( this.id );
        this.actions.push ( action );
        this.pipesOut.forEach ( pipe => {
            pipe.send ( action );
        });
    }

    /**
     * Esegue tutte le action nel buffer
     * aggiorna lo stato
     * sposta le action eseguite correttamente nella history
     */
    public flush() {
        let toHistory = [];
        let toActions = [];
        this.actions.forEach ( action => {
            let result = action.execute(this);
            (result==false? toActions : toHistory).push(result);
        });
        this.actionsHistory.concat ( toHistory );
        this.actions = toActions;
    }



    // -------------------------------------------------------------------

    // OBJECTS POPULATION

    /**
     * Tutti gli oggetti contenuti in questo node
     */
    private remoteObjects:{[key:string]:RemoteObject};

    // ACTION: Creazione di una nuova istanza
    // qua creo pure la key che lega il RO al "nodo"
    public addRemoteObject ( ro:RemoteObject ) {
        ro.key = new Date().getTime();
        this.remoteObjects[ro.key] = ro;
    }

    

}






// serve per i decorator
import "reflect-metadata";

import { NodeManager } from "ro/NodeManager";
import { RemoteObject } from "ro/RemoteObject";
import { REMOTE_METHOD_TYPE, RemoteMethod, RemoteProperty, RemoteClass } from "ro/RemoteObjectDecorators";
import { PipeIn, PipeInLocal } from "ro/PipeIn";
import { PipeOut, PipeOutJunction, PipeOutLocal } from "ro/PipeOut";

import { ACTION_TYPE, Action } from "ro/Action";



// collego i due nodi
let node1 = new NodeManager();
node1.name = "name1";
let node2 = new NodeManager();
node2.name = "name2";
node1.addPipeOut(new PipeOutJunction(node2.pipeInLocal));
node2.addPipeOut(new PipeOutJunction(node1.pipeInLocal));

// creo il modello in node1
@RemoteClass(node1, "User")
class User {
    
    @RemoteProperty(node1)
    public name: string;

    @RemoteProperty(node1)
    public surname: string;

    @RemoteMethod(REMOTE_METHOD_TYPE.ABSTRACT, node1)
    public async fullname(param: string) {
    }
}

// creo il modello in node2
@RemoteClass(node2,"User")
class User2 {

    @RemoteProperty(node2)
    public name:string = "";

    @RemoteProperty(node2)
    public surname:string = "";

    @RemoteMethod(REMOTE_METHOD_TYPE.IMPLEMENTED, node2)
    public async fullname ( param:string ) {
        return this.name + param + this.surname;
    }
}

let user = new User();
user.name = "ivano";
user.surname = "iorio";

let res = user.fullname(" - ");
res.then ( (value)=>{
    console.log(value);
});



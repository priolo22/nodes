// serve per i decorator
import "reflect-metadata";

import { NodeManager } from "./NodeManager";
import { RemoteObject } from "./RemoteObject";
import { REMOTE_METHOD_TYPE, RemoteMethod, RemoteProperty, RemoteClass } from "./RemoteObjectDecorators";
import { PipeIn, PipeInLocal } from "./PipeIn";
import { PipeOut, PipeOutJunction, PipeOutLocal } from "./PipeOut";

import { ACTION_TYPE, Action, ActionInstanceNew } from "./Action";


let node1 = new NodeManager();
let node2 = new NodeManager();

node1.addPipeOut(new PipeOutJunction(node2.pipeInLocal));
node2.addPipeOut(new PipeOutJunction(node1.pipeInLocal));



//@RemoteClass(node1)
class User {
    
    @RemoteProperty(node1)
    public name: string;

    @RemoteProperty(node1)
    public surname: string;

    @RemoteMethod(REMOTE_METHOD_TYPE.ABSTRACT, node1)
    public async fullname(param: string) {}
}

/*
@RemoteClass(node2,"User")
class User2 {

    @RemoteProperty(node2)
    public name:string = "";

    @RemoteProperty(node2)
    public surname:string = "";

    @RemoteMethod(REMOTE_METHOD_TYPE.IMPLEMENTED, node2)
    public async fullname ( param:string ): Promise<String> {
        return  this.name + param + this.surname;
    }
}
*/


let user = new User();
user.name = "ivano";
user.surname = "iorio";
console.log(user.fullname(" - "));


// node1.sync().then ( ()=>{
//     console.log("tutto sincronizzato");
// });


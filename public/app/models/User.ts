import { REMOTE_METHOD_TYPE, RemoteMethod, RemoteProperty, RemoteClass } from "libs/ro/RemoteObjectDecorators";

// creo il modello in node1
@RemoteClass()
class User {
    
    @RemoteProperty()
    public name: string;

    @RemoteProperty()
    public surname: string;

    @RemoteMethod(REMOTE_METHOD_TYPE.ABSTRACT)
    public async fullname(param: string) {
    }
}
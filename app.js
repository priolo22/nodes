"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// serve per i decorator
require("reflect-metadata");
const NodeManager_1 = require("./NodeManager");
const RemoteObjectDecorators_1 = require("./RemoteObjectDecorators");
const PipeOut_1 = require("./PipeOut");
let node1 = new NodeManager_1.NodeManager();
let node2 = new NodeManager_1.NodeManager();
node1.addPipeOut(new PipeOut_1.PipeOutJunction(node2.pipeInLocal));
node2.addPipeOut(new PipeOut_1.PipeOutJunction(node1.pipeInLocal));
let User = class User {
    constructor() {
        this.name = "default";
        this.surname = "iorio";
    }
    fullname(param) { }
};
__decorate([
    RemoteObjectDecorators_1.RemoteProperty(node1),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    RemoteObjectDecorators_1.RemoteProperty(node1),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    RemoteObjectDecorators_1.RemoteMethod(RemoteObjectDecorators_1.REMOTE_METHOD_TYPE.ABSTRACT, node1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], User.prototype, "fullname", null);
User = __decorate([
    RemoteObjectDecorators_1.RemoteClass(node1)
], User);
// @RemoteClass(node2,"User")
// class User2 {
//     @RemoteProperty(node2)
//     public name:string = "ivano";
//     @RemoteProperty(node2)
//     public surname:string = "iorio";
//     @RemoteMethod(REMOTE_METHOD_TYPE.IMPLEMENTED, node2)
//     public fullname ( param:string ): string {
//         return this.name + param + this.surname;
//     }
// }
let user = new User();
user.name = "ivano";
user.surname = "iorio";
console.log(user.fullname(" - "));
// node1.sync().then ( ()=>{
//     console.log("tutto sincronizzato");
// });
//# sourceMappingURL=app.js.map
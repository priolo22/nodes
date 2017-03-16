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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// serve per i decorator
require("reflect-metadata");
const NodeManager_1 = require("ro/NodeManager");
const RemoteObjectDecorators_1 = require("ro/RemoteObjectDecorators");
const PipeOut_1 = require("ro/PipeOut");
// collego i due nodi
let node1 = new NodeManager_1.NodeManager();
node1.name = "name1";
let node2 = new NodeManager_1.NodeManager();
node2.name = "name2";
node1.addPipeOut(new PipeOut_1.PipeOutJunction(node2.pipeInLocal));
node2.addPipeOut(new PipeOut_1.PipeOutJunction(node1.pipeInLocal));
// creo il modello in node1
let User = class User {
    fullname(param) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
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
    __metadata("design:returntype", Promise)
], User.prototype, "fullname", null);
User = __decorate([
    RemoteObjectDecorators_1.RemoteClass(node1, "User")
], User);
// creo il modello in node2
let User2 = class User2 {
    // creo il modello in node2
    constructor() {
        this.name = "";
        this.surname = "";
    }
    fullname(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.name + param + this.surname;
        });
    }
};
__decorate([
    RemoteObjectDecorators_1.RemoteProperty(node2),
    __metadata("design:type", String)
], User2.prototype, "name", void 0);
__decorate([
    RemoteObjectDecorators_1.RemoteProperty(node2),
    __metadata("design:type", String)
], User2.prototype, "surname", void 0);
__decorate([
    RemoteObjectDecorators_1.RemoteMethod(RemoteObjectDecorators_1.REMOTE_METHOD_TYPE.IMPLEMENTED, node2),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User2.prototype, "fullname", null);
User2 = __decorate([
    RemoteObjectDecorators_1.RemoteClass(node2, "User")
], User2);
let user = new User();
user.name = "ivano";
user.surname = "iorio";
let res = user.fullname(" - ");
res.then((value) => {
    console.log(value);
});
//# sourceMappingURL=app_____.js.map
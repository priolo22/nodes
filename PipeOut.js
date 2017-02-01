"use strict";
class PipeOut {
}
exports.PipeOut = PipeOut;
class PipeOutJunction extends PipeOut {
    constructor(pipeIn) {
        super();
        this.pipeIn = pipeIn;
    }
    send(action) {
        this.pipeIn.events.emit("action", action);
    }
}
exports.PipeOutJunction = PipeOutJunction;
class PipeOutLocal extends PipeOut {
    constructor() {
        super();
    }
    get nodeLink() {
        return this._nodeLink;
    }
    send(action) {
    }
}
exports.PipeOutLocal = PipeOutLocal;
// export class PipeClientHttp extends PipeOut {
// } 
//# sourceMappingURL=PipeOut.js.map
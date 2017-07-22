"use strict";
const PipeOutExpressResponse_1 = require("../pipesOut/PipeOutExpressResponse");
const PipeIn_1 = require("./PipeIn");
class PipeInExpress extends PipeIn_1.PipeIn {
    constructor(parent, app) {
        super();
        this.parent = parent;
        this.app = app;
        app.post("/ro/action", (req, res, next) => {
            let jsonAction = req.body.action;
            let action; // DA FARE: deserializzazione action
            let pipeOut = new PipeOutExpressResponse_1.PipeOutExpressResponse(res);
            this.parent.addPipeOut(pipeOut);
            // SPECIALIZZAZIONE DELL'ACTION IN BASE AL PIPE
            action.onOutPipe = () => {
                pipeOut.send(action);
                this.parent.removePipeOut(pipeOut);
            };
            this.push(action);
        });
    }
}
exports.PipeInExpress = PipeInExpress;
//# sourceMappingURL=PipeInExpress.js.map
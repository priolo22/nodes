"use strict";
const events_1 = require("events");
class PipeIn {
    constructor() {
        this._events = new events_1.EventEmitter();
    }
    // PROPERTIES
    get events() {
        return this._events;
    }
}
exports.PipeIn = PipeIn;
class PipeInLocal extends PipeIn {
    constructor() {
        super();
    }
}
exports.PipeInLocal = PipeInLocal;
class PipeServerHttp extends PipeIn {
}
exports.PipeServerHttp = PipeServerHttp;
//# sourceMappingURL=PipeIn.js.map
"use strict";
const events_1 = require("events");
class PipeIn {
    constructor() {
        this._events = new events_1.EventEmitter();
    }
    push(action) {
        action.onInPipe();
        this.events.emit("action", action);
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
//# sourceMappingURL=PipeIn.js.map
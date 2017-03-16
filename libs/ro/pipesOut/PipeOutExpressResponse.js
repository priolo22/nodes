"use strict";
const PipeOut_1 = require("../pipesOut/PipeOut");
class PipeOutExpressResponse extends PipeOut_1.PipeOut {
    constructor(res) {
        super();
        this.res = res;
    }
    send(action) {
        this.res.send(action);
    }
}
exports.PipeOutExpressResponse = PipeOutExpressResponse;
//# sourceMappingURL=PipeOutExpressResponse.js.map
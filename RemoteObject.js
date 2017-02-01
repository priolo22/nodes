"use strict";
class RemoteObject {
    // CONSTRUCTOR
    constructor() {
    }
    get reference() {
        return this._reference;
    }
    set reference(value) {
        if (this._reference != null) {
            //[II] eliminare le dipendenze con questo oggetto
            delete (this._reference._ro);
        }
        this._reference = value;
        if (this._reference != null) {
            this._reference._ro = value;
        }
    }
}
exports.RemoteObject = RemoteObject;
//# sourceMappingURL=RemoteObject.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
let TruncatePipe = class TruncatePipe {
    transform(value, args) {
        if (value == null)
            return "";
        let length = 20;
        let suffix = "...";
        if (args != null && !Array.isArray(args)) {
            length = args;
        }
        else {
            if (args[0])
                length = parseInt(args[0]);
            if (args[1])
                suffix = args[1];
        }
        if (value.length <= length) {
            return value;
        }
        return value.substring(0, length) + suffix;
    }
};
TruncatePipe = __decorate([
    core_1.Pipe({
        name: "truncate"
    })
], TruncatePipe);
exports.TruncatePipe = TruncatePipe;
//# sourceMappingURL=truncate.pipe.js.map
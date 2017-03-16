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
const core_1 = require("@angular/core");
// components
const page_base_component_1 = require("./page-base.component");
// models
const test_1 = require("../models/test");
// services-providers
// pipes
let PageLoginComponent = class PageLoginComponent extends page_base_component_1.PageBaseComponent {
    // @HostBinding('@routeAnimation') get routeAnimation() {
    //     return true;
    // }
    // @HostBinding('style.display') get display() {
    //     return 'block';
    // }
    // @HostBinding('style.position') get position() {
    //     return 'absolute';
    // }
    constructor(elem) {
        super(elem);
        this.elem = elem;
        // PROPERTIES        
        this.test = new test_1.Test();
    }
    // EVENTS
    // METHODS
    // LIFECYCLE HOOKS    
    ngOnInit() {
        this.test.state = "active";
    }
    ngAfterViewInit() {
    }
};
PageLoginComponent = __decorate([
    core_1.Component({
        host: {
            '[@routeAnimation]': 'true',
            '[style.display]': "'block'",
            '[style.position]': "'absolute'"
        },
        selector: "page-login",
        templateUrl: "app/pages/page-login.component.html",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object])
], PageLoginComponent);
exports.PageLoginComponent = PageLoginComponent;
var _a;
//# sourceMappingURL=page-login.component.js.map
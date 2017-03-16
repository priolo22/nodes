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
let PageTest1Component = class PageTest1Component extends page_base_component_1.PageBaseComponent {
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
PageTest1Component = __decorate([
    core_1.Component({
        host: {
            '[@routeAnimation]': 'true',
            '[style.display]': "'block'",
            '[style.position]': "'absolute'"
        },
        selector: "page-test1",
        templateUrl: "app/pages/page-test1.component.html",
        //styleUrls: ["app/pages/pages.component.css", "app/pages/page-test1.component.css"],
        animations: [
            core_1.trigger('routeAnimation', [
                core_1.state('*', core_1.style({ transform: 'translateX(0)', opacity: 1 })),
                core_1.transition('void => *', [
                    core_1.style({ transform: 'translateX(-100%)', opacity: 0 }),
                    core_1.animate(1000)
                ]),
                core_1.transition('* => void', core_1.animate(1000, core_1.style({ transform: 'translateX(100%)', opacity: 0 })))
            ]),
            core_1.trigger('testState', [
                core_1.state('inactive', core_1.style({
                    backgroundColor: '#eee',
                    transform: 'scale(1)'
                })),
                core_1.state('active', core_1.style({
                    backgroundColor: '#cfd8dc',
                    transform: 'scale(1.01)'
                })),
                core_1.transition('inactive => active', core_1.animate('100ms ease-in')),
                core_1.transition('active => inactive', core_1.animate('100ms ease-out')),
            ])
        ],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object])
], PageTest1Component);
exports.PageTest1Component = PageTest1Component;
var _a;
//# sourceMappingURL=page-test1.component.js.map
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
// models
// components
const page_base_component_1 = require("./page-base.component");
// services-providers
// pipes
let PageTest2Component = class PageTest2Component extends page_base_component_1.PageBaseComponent {
    constructor(elem) {
        super(elem);
        this.elem = elem;
        // PROPERTIES        
        this.lat = 51.678418;
        this.lng = 7.809007;
    }
    // EVENTS
    // METHODS
    // LIFECYCLE HOOKS    
    ngOnInit() {
    }
    ngAfterViewInit() {
    }
};
PageTest2Component = __decorate([
    core_1.Component({
        selector: "page-test2",
        templateUrl: "app/pages/page-test2.component.html",
        styleUrls: ["app/pages/pages.component.css", "app/pages/page-test2.component.css"],
        host: {
            '[@routeAnimation]': 'true',
            '[style.display]': "'block'",
            '[style.position]': "'absolute'"
        },
        animations: [
            core_1.trigger('routeAnimation', [
                core_1.state('*', core_1.style({ transform: 'translateX(0)', opacity: 1 })),
                core_1.transition('void => *', [
                    core_1.style({ transform: 'translateX(-100%)', opacity: 0 }),
                    core_1.animate(1000)
                ]),
                core_1.transition('* => void', core_1.animate(1000, core_1.style({ transform: 'translateX(100%)', opacity: 0 })))
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], PageTest2Component);
exports.PageTest2Component = PageTest2Component;
//# sourceMappingURL=page-test2.component.js.map
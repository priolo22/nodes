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
let LayoutPageComponet = class LayoutPageComponet {
    constructor() {
        // set/get che definisce se il drawer è aperto o chiuso
        this._isDrawerOpen = true;
        // le opzioni da visualizzare sull'header
        this.headerOptions = null;
    }
    get isDrawerOpen() {
        return this._isDrawerOpen;
    }
    set isDrawerOpen(value) {
        this._isDrawerOpen = value;
        if (this._isDrawerOpen) {
            this.drawerOpen();
        }
        else {
            this.drawerClose();
        }
    }
    // EVENTS
    onHeaderChanged(evn) {
        this.headerOptions = evn.detail;
    }
    // METHODS
    drawerOpen() {
        let eDrawer = this.elemDrawer.nativeElement;
        let eDrawerClose = this.elemDrawerClose.nativeElement;
        Velocity(eDrawer, {
            width: 225,
        }, {
            duration: 500,
            easing: "easeInOutCubic",
        });
        Velocity(eDrawerClose, "fadeOut", { duration: 500 });
    }
    drawerClose() {
        let eDrawer = this.elemDrawer.nativeElement;
        let eDrawerClose = this.elemDrawerClose.nativeElement;
        Velocity(eDrawer, {
            width: 50,
        }, {
            duration: 500,
            easing: "easeInOutCubic",
        });
        Velocity(eDrawerClose, "fadeIn", { duration: 500 });
    }
};
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", Object)
], LayoutPageComponet.prototype, "elemDrawer", void 0);
__decorate([
    core_1.ViewChild("drawer_close"),
    __metadata("design:type", Object)
], LayoutPageComponet.prototype, "elemDrawerClose", void 0);
__decorate([
    core_1.ViewChild("drawer_open"),
    __metadata("design:type", Object)
], LayoutPageComponet.prototype, "elemDrawerOpen", void 0);
LayoutPageComponet = __decorate([
    core_1.Component({
        selector: "layout-page",
        templateUrl: "app/layouts/layout-page.component.html",
        styleUrls: ["app/layouts/layout-page.component.css"],
    }),
    __metadata("design:paramtypes", [])
], LayoutPageComponet);
exports.LayoutPageComponet = LayoutPageComponet;
//# sourceMappingURL=layout-page.component.js.map
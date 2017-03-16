"use strict";
class PageBaseComponent {
    constructor(elem) {
        this.elem = elem;
    }
    onBack() {
        window.history.back();
    }
    // LIFECYCLE HOOKS
    ngAfterViewInit(headerParam) {
        Velocity(this.elem.nativeElement, "fadeIn", { duration: 500 });
    }
}
exports.PageBaseComponent = PageBaseComponent;
//# sourceMappingURL=page-base.component.js.map
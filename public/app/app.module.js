"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const app_component_1 = require("./app.component");
const layout_page_component_1 = require("./layouts/layout-page.component");
const page_test1_component_1 = require("./pages/page-test1.component");
const page_test2_component_1 = require("./pages/page-test2.component");
const core_2 = require("angular2-google-maps/core");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            common_1.CommonModule,
            core_2.AgmCoreModule.forRoot({ apiKey: "AIzaSyCoZ9YIy_iqkp354ExyHDzjyn1fCxQ-1gU" }),
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: '/test1', pathMatch: 'full' },
                //{ path: '**', component: PageNotFoundComponent },
                { path: 'test1', component: page_test1_component_1.PageTest1Component, data: { title: "titolone" } },
                { path: 'test2/:id', component: page_test2_component_1.PageTest2Component }
            ])
        ],
        declarations: [app_component_1.AppComponent, layout_page_component_1.LayoutPageComponet, page_test1_component_1.PageTest1Component, page_test2_component_1.PageTest2Component],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
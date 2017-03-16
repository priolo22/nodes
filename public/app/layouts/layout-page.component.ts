import { Component, ViewChild } from "@angular/core";

// components

// services-providers

declare var Velocity:any;



@Component ({
    selector: "layout-page", 
    templateUrl: "app/layouts/layout-page.component.html",
    styleUrls: ["app/layouts/layout-page.component.css"],
})
export class LayoutPageComponet {
    constructor() {
    }


// PROPERTIES

    // interface
    @ViewChild("drawer") private elemDrawer:any;
    @ViewChild("drawer_close") private elemDrawerClose:any;
    @ViewChild("drawer_open") private elemDrawerOpen:any;
    
    // set/get che definisce se il drawer è aperto o chiuso
    private _isDrawerOpen:Boolean = true;
    get isDrawerOpen():Boolean {
        return this._isDrawerOpen;
    }
    set isDrawerOpen(value:Boolean) {
        this._isDrawerOpen = value;
        if ( this._isDrawerOpen ) {
            this.drawerOpen();
        } else {
            this.drawerClose();
        }
    }
    
    // le opzioni da visualizzare sull'header
    public headerOptions:any = null;
    
    
    
// EVENTS
    onHeaderChanged ( evn:any ): void {
        this.headerOptions = evn.detail;
    }    



// METHODS
    
    private drawerOpen(): void {
        let eDrawer:HTMLElement = this.elemDrawer.nativeElement;
        let eDrawerClose:HTMLElement = this.elemDrawerClose.nativeElement;
        
        Velocity ( eDrawer, {
            width: 225,
        },{
            duration: 500,
            easing: "easeInOutCubic",
        });
        Velocity ( eDrawerClose, "fadeOut", { duration:500 } );
    }

    private drawerClose(): void {
        let eDrawer:HTMLElement = this.elemDrawer.nativeElement;
        let eDrawerClose:HTMLElement = this.elemDrawerClose.nativeElement;
        
        Velocity ( eDrawer, {
            width: 50,
        },{
            duration: 500,
            easing: "easeInOutCubic",
        });
        Velocity ( eDrawerClose, "fadeIn", { duration:500 } );
    }
    
    
// LIFECYCLE HOOKS
    
    
}
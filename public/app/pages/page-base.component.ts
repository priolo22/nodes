import { ElementRef } from "@angular/core";
declare var Velocity:any;



export class PageBaseComponent {
    constructor( elem:ElementRef ) {
        this.elem = elem;
    }

    protected elem:ElementRef;


    protected onBack():void {
        window.history.back();
    }

// LIFECYCLE HOOKS
    ngAfterViewInit( headerParam:any ):void {
        Velocity( this.elem.nativeElement, "fadeIn", {duration:500} );
    }
    
}
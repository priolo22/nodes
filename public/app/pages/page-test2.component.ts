import {
    Component, ViewChild, Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef,
    trigger, state, style, transition, animate, HostBinding
} from "@angular/core";

// models

// components
import { PageBaseComponent } from "./page-base.component";

// services-providers

// pipes




@Component({
    selector: "page-test2",
    templateUrl: "app/pages/page-test2.component.html",
    styleUrls: ["app/pages/pages.component.css", "app/pages/page-test2.component.css"],
    host: {
        '[@routeAnimation]': 'true',
        '[style.display]': "'block'",
        '[style.position]': "'absolute'"
    },
    animations: [
        trigger('routeAnimation', [
            state('*', style({ transform: 'translateX(0)', opacity: 1 })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                animate(1000)
            ]),
            transition('* => void', animate(1000, style({ transform: 'translateX(100%)', opacity: 0 })))
        ])
    ]
})
export class PageTest2Component extends PageBaseComponent implements AfterViewInit {
    constructor(
        protected elem: ElementRef,
    ) {
        super(elem);
    }

    // PROPERTIES        
    lat: number = 51.678418;
    lng: number = 7.809007;

    // EVENTS

    // METHODS

    // LIFECYCLE HOOKS    

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

}


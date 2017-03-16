import {
    Component, ViewChild, Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef,
    trigger, state, style, transition, animate, HostBinding
} from "@angular/core";


// components
import { PageBaseComponent } from "./page-base.component";

// models
import { Test } from "../models/test";

// services-providers

// pipes




@Component({
    host: {
        '[@routeAnimation]': 'true',
        '[style.display]': "'block'",
        '[style.position]': "'absolute'"
    },
    selector: "page-test1",
    templateUrl: "app/pages/page-test1.component.html",
    //styleUrls: ["app/pages/pages.component.css", "app/pages/page-test1.component.css"],
    animations: [
        trigger('routeAnimation', [
            state('*', style({ transform: 'translateX(0)', opacity: 1 })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                animate(1000)
            ]),
            transition('* => void', animate(1000, style({ transform: 'translateX(100%)', opacity: 0 })))
        ]),
        trigger('testState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active', style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.01)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out')),
        ])
    ],
})
export class PageTest1Component extends PageBaseComponent implements AfterViewInit {

    // @HostBinding('@routeAnimation') get routeAnimation() {
    //     return true;
    // }

    // @HostBinding('style.display') get display() {
    //     return 'block';
    // }

    // @HostBinding('style.position') get position() {
    //     return 'absolute';
    // }


    constructor(
        protected elem: ElementRef,
    ) {
        super(elem);
    }

    // PROPERTIES        

    test = new Test();

    // EVENTS

    // METHODS

    // LIFECYCLE HOOKS    

    ngOnInit(): void {
        this.test.state = "active";
    }

    ngAfterViewInit(): void {

    }

}


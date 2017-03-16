import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

// models

// pages

// components

// services (providers)


 

@Component({
    selector: "my-app",
    providers: [ ],
    templateUrl: "app/app.component.html",
    styleUrls: ["app/app.component.css"],
})

export class AppComponent implements OnInit {
    constructor ( 
        private elem:ElementRef
    ){
        
    }

// PROPERTIES
     
// EVENTS

// LIFE CYCLE    
    
    public ngOnInit () {
    }
   
}

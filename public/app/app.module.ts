import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LayoutPageComponet } from './layouts/layout-page.component';
import { PageTest1Component } from './pages/page-test1.component';
import { PageTest2Component } from './pages/page-test2.component';

import { AgmCoreModule } from 'angular2-google-maps/core';




@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		AgmCoreModule.forRoot({ apiKey: "AIzaSyCoZ9YIy_iqkp354ExyHDzjyn1fCxQ-1gU" }),
		RouterModule.forRoot([
			{ path: '', redirectTo: '/test1', pathMatch: 'full' },
			//{ path: '**', component: PageNotFoundComponent },
			{ path: 'test1', component: PageTest1Component, data: { title: "titolone" } },
			{ path: 'test2/:id', component: PageTest2Component }
		])
	],
	declarations: [AppComponent, LayoutPageComponet, PageTest1Component, PageTest2Component],
	bootstrap: [AppComponent]
})
export class AppModule { }
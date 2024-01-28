import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    template: `
 <p>Swipe to change slides</p>
 <swiper-container loop="true">
   <swiper-slide>Slide 1</swiper-slide>
   <swiper-slide>Slide 2</swiper-slide>
   <swiper-slide>Slide 3</swiper-slide>
   <swiper-slide>Slide 4</swiper-slide>
 </swiper-container>
`,
    styles: [
        `
 swiper-slide {
   height: 400px;
 }
 swiper-slide:nth-of-type(1) {
   background-color: red;
 }
 swiper-slide:nth-of-type(2) {
   background-color: green;
 }
 swiper-slide:nth-of-type(3) {
   background-color: blue;
   color: white;
 }
 swiper-slide:nth-of-type(4) {
   background-color: yellow;
 }
`,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
    title = 'prince';
}
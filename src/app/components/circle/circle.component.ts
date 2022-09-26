import { Component } from '@angular/core';
// import employeeData from '../assets/SampleData/employees.json';

@Component({
  selector: 'circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
})
export class Circle {
  // public employees: Employee[];
  // public relationships: Relationship[];
  public width: number = 10;
  public height: number = 10;
  public x: number = 50;
  public y: number = 50;
  public active: boolean = false;
  public boxshow: boolean = false;
  public circleshow: boolean = false;

  constructor() {
  }

  public pointerdown(event: PointerEvent) {
    // console.log(event);
    this.active = true;
  }

  public pointerup(event: PointerEvent) {
    this.active = false;
  }

  public pointermove(event: PointerEvent) {
    // if (this.active == true) {
    //   this.x = event.offsetX;
    //   this.y = event.offsetY;
    // }
  }

  public circlePointerdown(event: PointerEvent) {
    console.log("This is circle");
  }

  public circle() {
    this.circleshow = true;
    this.boxshow = false;
    this.x = 50;
    this.y = 50;
  }
  public box() {
    this.circleshow = false;
    this.boxshow = true;
    this.x = 50;
    this.y = 50;
  }
  public increaseWidth() {
    this.width = this.width + 50;
  }
  public increaseHeight() {
    this.height = this.height + 50;
  }
  public increaseUp() {
    this.y = this.y - 50;
  }
  public increaseDown() {
    this.y = this.y + 50;
  }
  public increaseLeft() {
    this.x = this.x + 50;
  }
  public increaseRight() {
    this.x = this.x - 50;
  }
}
import { Component } from '@angular/core';
// import employeeData from '../assets/SampleData/employees.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public rectangulars: Rectangular[] = [
    {
      height: 100,
      width: 200,
      color: 'rgba(125, 125, 32, 0.5)',
      x: 20,
      y: 30,
      rx: 0,
      ry: 0,
    },
    {
      height: 50,
      width: 50,
      color: 'rgba(12, 32, 222, 0.7)',
      x: 200,
      y: 20,
      rx: 10,
      ry: 15,
    },
  ];

  // public circleX = 15;
  // public circleY = 26;
  public radiusCircle = 10;
  constructor() {}

  /**
   * Adds new rectangular element.
   */
  addNew() {
    this.rectangulars.push({
      height: 0,
      width: 0,
      color: '#000',
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
    });
  }

  /**
   * Retrieves the maximum height of all elements.
   * @returns Height of the container.
   */
  getHeight(): number {
    return 0;
    // return Math.max.apply(Math, this.rectangulars.map(el => el.height + el.y)) + 20;
  }

  /**
   * Removes specific rectangular element.
   * @param index - Index of rectangular element, which needs to be removed.
   */
  removeRow(index: number) {
    this.rectangulars.splice(index, 1);
  }

  public pointerdown(event: PointerEvent) {
    // console.log(event);
    // this.active = true;
  }

  public pointerup(event: PointerEvent) {
    // this.active = false;
  }

  public pointermove(event: PointerEvent) {
    // if (this.active == true) {
    //   this.x = event.offsetX;
    //   this.y = event.offsetY;
    // }
  }

  public circlePointerdown(event: PointerEvent) {
    console.log('This is circle');
  }
}
interface Rectangular {
  height: number;
  width: number;
  color: string;
  x: number;
  y: number;
  rx: number;
  ry: number;
}

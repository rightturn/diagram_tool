import { Component } from '@angular/core';
// import employeeData from '../assets/SampleData/employees.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public points: Point[] = [];

  public rectangulars: Rectangular[] = [];

  public radiusCircle = 5;


  private activeShape?: Rectangular = undefined;

  constructor() {
    this.rectangulars.push(
      {
        height: 100,
        width: 200,
        color: 'rgba(255,255,255)',
        x: 20,
        y: 30,
        rx: 0,
        ry: 0,
        id: this.getNextIdForRectangle()
      }
    );
  }

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
      id: this.getNextIdForRectangle()
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

  public containerClick(event: any) {
    console.log(event);
  }

  public clickRect(event: MouseEvent, rect: Rectangular) {

    let element = (event.target as HTMLElement);

    this.toggleBoxActiveState(rect, element);

    this.updateBoxBoundary(rect);

  }

  public mouseMove(event: Point) {

    if (this.activeShape) {
      this.activeShape.x = event.x - this.activeShape.width / 2;
      this.activeShape.y = event.y - this.activeShape.height / 2;
      this.updateBoxBoundary(this.activeShape);
    }

  }

  private getNextIdForRectangle(): number {
    if (this.rectangulars.length > 0) {
      return this.rectangulars.length;
    }

    return 1;
  }

  private toggleBoxActiveState(rect: Rectangular, element: HTMLElement) {

    if (this.activeShape) {
      this.activeShape = undefined;
      element.classList.remove("active_rect");
    } else {
      this.activeShape = rect;
      element.classList.add("active_rect");
    }

  }

  private updateBoxBoundary(rect: Rectangular) {

    let box: BoxBoundaryCordinates = this.getBoxBoundaryCordinates(rect);

    let top_left: Point = { x: box.left_x, y: box.top_y };
    let top_right: Point = { x: box.right_x, y: box.top_y };
    let bottom_right: Point = { x: box.right_x, y: box.bottom_y };
    let bottom_left: Point = { x: box.left_x, y: box.bottom_y };

    this.points = [top_left, top_right, bottom_right, bottom_left];
  }

  private getBoxBoundaryCordinates(rect: Rectangular) {

    let left_x: number = rect.x - this.radiusCircle;
    let right_x: number = left_x + rect.width;
    let top_y: number = rect.y - this.radiusCircle;
    let bottom_y: number = top_y + rect.height;

    return {
      left_x, right_x, top_y, bottom_y
    };
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
  id: number;
}

interface Point {
  x: number;
  y: number;
}

interface BoxBoundaryCordinates {
  left_x: number;
  right_x: number;
  top_y: number;
  bottom_y: number;
}


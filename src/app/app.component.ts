import { Component } from '@angular/core';

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

    this.addNew();
  }

  /**
   * Adds new rectangular element.
   */
  addNew() {
    this.rectangulars.push({
      height: 30,
      width: 30,
      color: '#000',
      x: 30,
      y: 30,
      rx: 0,
      ry: 0,
      id: this.getNextIdForRectangle()
    });
  }

  public containerClick(event: any) {
    console.log(event);
  }

  public mouseDownRect(event: MouseEvent, rect: Rectangular) {

    let element = (event.target as HTMLElement);

    this.toggleBoxActiveState(rect, element);

    this.updateBoxBoundary(rect);

    event.preventDefault();

  }

  public mouseUpRect(event: MouseEvent, rect: Rectangular) {

    let element = (event.target as HTMLElement);

    this.toggleBoxActiveState(rect, element);

    this.updateBoxBoundary(rect);

    event.preventDefault();

  }

  public mouseOutRect(event: MouseEvent) {
    console.log("mouseOutRect");
    let t: HTMLElement = (event.target as HTMLElement);
    t.classList.remove("rect_border")
  }

  public mouseOverRect(event: MouseEvent) {
    console.log("mouseOverRect");
    let t: HTMLElement = (event.target as HTMLElement);
    t.classList.add("rect_border")
  }

  public mouseMove(event: Point) {

    if (this.activeShape) {
      this.activeShape.x = event.x - this.activeShape.width / 2;
      this.activeShape.y = event.y - this.activeShape.height / 2;
      this.updateBoxBoundary(this.activeShape);
    }

  }

  public mouseOutContainer(event: MouseEvent) {
    this.activeShape = undefined;
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


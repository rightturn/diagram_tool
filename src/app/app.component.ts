import { Component } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CircleList } from './core/CircleList';
import { DrawingShape, Point } from './core/DrawingShape';
import { Line } from './core/Line';
import { RectangleList } from './core/RectangleList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public rectangleList: RectangleList;
  public circleList: CircleList;
  public line: Line;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  public active_colors_index = 0;
  public all_colors: string[][] = [];
  public active_colors: string[] = [];

  private dragStartLocation?: Point = undefined;

  constructor() {
    this.line = new Line();

    this.rectangleList = RectangleList.getInstance();
    this.circleList = CircleList.getInstance();

    this.all_colors = [["#ffa347", "#ff4b47", "#ff4b92", "#ff4b1a", "#2c4b1a", "#f1173a", "#21463a", "#2146b6"],
    ["#FFA07A", "#B22222", "#FFA500", "#BDB76B", "#228B22", "#3CB371", "#48D1CC", "#008B8B"]];
    this.active_colors = this.all_colors[this.active_colors_index];

  }

  public fillColor(color: string) {
    // this.rectangle.setFillColor(color);
  }

  public switchColors(index: number) {
    this.active_colors_index = index;
    this.active_colors = this.all_colors[this.active_colors_index];
  }

  public containerClick(event: Event) {
    // this.rectangle.inactive();
  }

  public mouseMove(event: Point) {
    if (this.dragStartLocation) {
      let drag = this.getDragDifference(event);
      this.rectangleList.moveActive(event,drag);
      this.rectangleList.resize(event);

      this.circleList.moveActive(event,drag);
      this.circleList.resize(event);
      // this.line.updatePosition(event);
    }
  }

  public mouseUpContainer(event: Event) {
    this.rectangleList.deactivateResize();
    this.circleList.deactivateResize();
  }

  public mouseDownContainer(event: MouseEvent) {
    this.dragStartLocation = { x: event.offsetX, y: event.offsetY };
  }


  public mouseOutContainer(event: MouseEvent) {
  }

  private getDragDifference(new_location: Point): Point {
    let x_difference = new_location.x - this.dragStartLocation!.x;
    let y_difference = new_location.y - this.dragStartLocation!.y;
    return { x: x_difference, y: y_difference };
  }

}


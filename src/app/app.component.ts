import { Component } from '@angular/core';
import { faCoffee, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { DrawingShape, Point } from './core/DrawingShape';
import { Line } from './core/Line';
import { PositionIndicator } from './core/PositionIndicator';
import { RectangleList } from './core/RectangleList';
import { ResizingPoint } from './core/ResizingPoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public rectangleList: RectangleList;
  public resizingPoints: ResizingPoint;
  public positionIndicator: PositionIndicator;
  public line: Line;

  public static moveableShape?: DrawingShape = undefined;


  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  public active_colors_index = 0;
  public all_colors: string[][] = [];
  public active_colors: string[] = [];

  private dragStartLocation?: Point = undefined;

  constructor() {
    this.line = new Line();
    this.resizingPoints = new ResizingPoint();
    this.positionIndicator = new PositionIndicator();
    this.rectangleList = RectangleList.getInstance(this.resizingPoints, this.positionIndicator);


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
      if (AppComponent.moveableShape) {
        AppComponent.moveableShape.updateMovement(event, drag);
      }
      this.resizingPoints.updateResize(event)
      this.line.updatePosition(event);
    }
  }

  public mouseUpContainer(event: Event) {
    if (AppComponent.moveableShape) {
      AppComponent.moveableShape.deactivateMovement();
    }
    this.resizingPoints.deactivate();
  }

  public mouseDownContainer(event: MouseEvent) {
    this.dragStartLocation = { x: event.offsetX, y: event.offsetY };
  }

  public mouseOutContainer(event: MouseEvent) {
    // this.rectangle.inactive();
    // this.rectangle.deactivateMovement();
  }

  private getDragDifference(new_location: Point): Point {
    let x_difference = new_location.x - this.dragStartLocation!.x;
    let y_difference = new_location.y - this.dragStartLocation!.y;
    return { x: x_difference, y: y_difference };
  }

}


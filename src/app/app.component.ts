import { Component } from '@angular/core';
import { faCoffee, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Line } from './core/Line';
import { Point, Rectangle, Rectangular } from './core/Rectangle';
import { ResizingPoint } from './core/ResizingPoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public rectangle: Rectangle;
  public resizingPoints: ResizingPoint;
  public line: Line;


  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  public active_colors_index = 0;
  public all_colors: string[][] = [];
  public active_colors: string[] = [];

  constructor() {
    this.line = new Line();
    this.resizingPoints = new ResizingPoint();
    this.rectangle = new Rectangle(this.resizingPoints);


    this.all_colors = [["#ffa347", "#ff4b47", "#ff4b92", "#ff4b1a", "#2c4b1a", "#f1173a", "#21463a", "#2146b6"],
    ["#FFA07A", "#B22222", "#FFA500", "#BDB76B", "#228B22", "#3CB371", "#48D1CC", "#008B8B"]];
    this.active_colors = this.all_colors[this.active_colors_index];

  }

  public fillColor(color: string) {
    this.rectangle.setFillColor(color);
  }

  public switchColors(index: number) {
    this.active_colors_index = index;
    this.active_colors = this.all_colors[this.active_colors_index];
  }

  public addBox(event: Event) {
    this.rectangle.add();
  }

  public containerClick(event: Event) {
    this.rectangle.inactive();
  }

  public mouseMove(event: Point) {
    this.rectangle.updateMovement(event);
    this.line.updatePosition(event);
  }

  public mouseUpContainer(event: Event) {
    this.rectangle.deactivateMovement();
  }

  public mouseDownContainer(event: MouseEvent) {
    let location: Point = { x: event.offsetX, y: event.offsetY };
    this.rectangle.setContainerMouseDownPoint(location);
  }

  public mouseOutContainer(event: MouseEvent) {
    // this.rectangle.inactive();
    this.rectangle.deactivateMovement();
  }

}


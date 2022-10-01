import { Component } from '@angular/core';
import { faCoffee, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
  public rectangulars: Rectangular[] = [];

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  public colors: String[] = [];

  constructor() {
    this.resizingPoints = new ResizingPoint();
    this.rectangle = new Rectangle(this.resizingPoints);
    this.rectangulars = this.rectangle.rectangulars;


    this.colors = ["#ffa347", "#ff4b47", "#ff4b92", "#ff4b1a", "#2c4b1a", "#f1173a", "#21463a", "#2146b6"];
  }

  public addBox(event: Event) {
    this.rectangle.add();
  }

  public containerClick(event: Event) {
    this.rectangle.inactive();
  }

  public mouseMove(event: Point) {
    this.rectangle.updateMovement(event);
  }

  public mouseUpContainer(event: Event) {
    this.rectangle.deactivateMovement();
  }

  public mouseOutContainer(event: MouseEvent) {
    this.rectangle.inactive();
  }

}


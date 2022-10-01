import { Component } from '@angular/core';
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

  constructor() {
    this.resizingPoints = new ResizingPoint();
    this.rectangle = new Rectangle(this.resizingPoints);
    this.rectangulars = this.rectangle.rectangulars;
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


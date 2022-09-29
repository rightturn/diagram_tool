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

  public containerClick(event: any) {
    console.log(event);
  }

  public mouseMove(event: Point) {
    this.rectangle.updateMovement(event);
  }

  public mouseUpContainer(event: Event) {
    this.rectangle.deactivate();
  }

  public mouseOutContainer(event: MouseEvent) {
    this.rectangle.deactivate();
  }

}


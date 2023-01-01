import { Component } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ContextMenu } from './core/ContextMenu';
import { Point } from './core/DrawingShape';
import { DrawingShapeList } from './core/DrawingShapeList';
import { Triangle } from './core/Triangle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public drawingShapeList: DrawingShapeList;
  public contextMenu: ContextMenu;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  public active_colors_index = 0;
  public all_colors: string[][] = [];
  public active_colors: string[] = [];

  private dragStartLocation?: Point = undefined;

  constructor() {

    this.drawingShapeList = DrawingShapeList.getInstance();
    this.contextMenu = ContextMenu.getInstance();

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
    this.drawingShapeList.inactiveAll();
  }

  public mouseMove(event: MouseEvent) {
    let point = { x: event.offsetX, y: event.offsetY };
    if (this.dragStartLocation) {
      let drag = this.getDragDifference(point);
      this.drawingShapeList.moveActive(point, drag);
      this.drawingShapeList.rotateActive(point, drag);
      this.drawingShapeList.resize(point);
    }
  }

  public mouseUpContainer(event: Event) {
    console.log("container mouse up");
    this.drawingShapeList.stopMovementForAll();
    this.drawingShapeList.stopRotationForAll();
    this.drawingShapeList.deactivateResize();
  }

  public mouseDownContainer(event: MouseEvent) {
    console.log("container mouse down");
    // this.drawingShapeList.unfocusAll();
    this.dragStartLocation = { x: event.offsetX, y: event.offsetY };
    event.preventDefault();
  }


  public mouseOutContainer(event: MouseEvent) {
    // this.drawingShapeList.inactiveAll();
    this.drawingShapeList.stopMovementForAll();
    this.drawingShapeList.deactivateResize();
  }

  private getDragDifference(new_location: Point): Point {
    let x_difference = new_location.x - this.dragStartLocation!.x;
    let y_difference = new_location.y - this.dragStartLocation!.y;
    return { x: x_difference, y: y_difference };
  }

}


import { AppComponent } from "../app.component";
import { DrawingShape, Point } from "./DrawingShape";

export abstract class ShapeMovement {

    // protected moveableShape: DrawingShape;
    // protected initialLocation?: Point = undefined;
    // protected htmlElement?: HTMLElement = undefined;
    // // protected resizingPoints: ResizingPoint;

    // constructor(resizingPoints: ResizingPoint, moveableShape: DrawingShape) {
    //     this.resizingPoints = resizingPoints;
    //     this.moveableShape = moveableShape;
    // }

    // abstract updateMovement(drag: Point): boolean;

    // public activate(element: HTMLElement) {
    //     AppComponent.moveableShape = this.moveableShape;
    //     this.initialLocation = { x: this.moveableShape.x, y: this.moveableShape.y };
    //     // this.moveableShape = shape;
    //     this.htmlElement = element;
    //     // element.classList.add("active_line");
    // }

    // public deactivate() {
    //     AppComponent.moveableShape = undefined;
    //     this.initialLocation = undefined;
    //     // this.moveableShape = undefined;
    //     if (this.htmlElement) {
    //         // this.htmlElement!.classList.remove("active_rect");
    //     }

    // }

}
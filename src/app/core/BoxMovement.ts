import { IMoveable } from "./IMoveable";
import { Point, Rectangle, Rectangular } from "./Rectangle";
import { RectangleList } from "./RectangleList";
import { ResizingPoint } from "./ResizingPoint";

export class BoxMovement implements IMoveable {

    private moveableShape: Rectangle;
    private initialLocation?: Point = undefined;
    private htmlElement?: HTMLElement = undefined;
    private resizingPoints: ResizingPoint;

    constructor(resizingPoints: ResizingPoint, moveableShape: Rectangle) {
        this.resizingPoints = resizingPoints;
        this.moveableShape = moveableShape;
    }

    public updateMovement(drag: Point): boolean {

        if (this.moveableShape) {

            let new_x = this.initialLocation!.x + drag.x;
            let new_y = this.initialLocation!.y + drag.y;

            if (new_x >= 0) {
                this.moveableShape.x = new_x;
            }

            if (new_y >= 0) {
                this.moveableShape.y = new_y;
            }

            this.resizingPoints.updateBoxBoundary();
            return true
        }

        return false;

    }


    public activateBox(element: HTMLElement) {
        RectangleList.moveableRectangle = this.moveableShape;
        this.initialLocation = { x: this.moveableShape.x, y: this.moveableShape.y };
        this.htmlElement = element;
        element.classList.add("active_rect");
    }

    public deactivateBox() {
        RectangleList.moveableRectangle = undefined;
        this.initialLocation = undefined;
        if (this.htmlElement) {
            this.htmlElement!.classList.remove("active_rect");
        }

    }
}
import { DrawingShape } from "./DrawingShape";
import { IMoveable } from "./IMoveable";
import { Point } from "./Rectangle";
import { ResizingPoint } from "./ResizingPoint";

export class ShapeMovement implements IMoveable {

    private moveableShape?: DrawingShape = undefined;
    private initialLocation?: Point = undefined;
    private htmlElement?: HTMLElement = undefined;
    private resizingPoints: ResizingPoint;

    constructor(resizingPoints: ResizingPoint) {
        this.resizingPoints = resizingPoints;
    }

    updateMovement(drag: Point): void {
        throw new Error("Method not implemented.");
    }

    public activate(shape: DrawingShape, element: HTMLElement) {
        this.initialLocation = { x: shape.x, y: shape.y };
        this.moveableShape = shape;
        this.htmlElement = element;
        // element.classList.add("active_line");
    }

    public deactivate() {
        this.initialLocation = undefined;
        this.moveableShape = undefined;

        if (this.htmlElement) {
            // this.htmlElement!.classList.remove("active_rect");
        }

    }

}
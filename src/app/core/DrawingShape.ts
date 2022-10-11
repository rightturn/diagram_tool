import { PositionIndicator } from "./PositionIndicator";
import { ResizingPoint } from "./ResizingPoint";
import { ShapeMovement } from "./ShapeMovement";

export abstract class DrawingShape {

    public x: number = 0;
    public y: number = 0;
    public id: number = 0;
    public color: string = "";
    public classes: string[] = [];

    protected shapeMovement?: ShapeMovement;
    protected resizingPoints: ResizingPoint;
    protected positionIndicator: PositionIndicator;

    constructor(id: number, x: number, y: number, color: string, resizingPoints: ResizingPoint, positionIndicator: PositionIndicator) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.resizingPoints = resizingPoints;
        this.positionIndicator = positionIndicator;
        this.color = color;
    }

    public abstract updateMovement(new_location: Point, drag: Point): void;

    public setFillColor(color: string) {
        // if (this.focusedShape) {
        //     this.focusedShape.color = color;
        // }
        this.color = color;
    }

    public mouseDownRect(event: Event): void {

        this.positionIndicator.visible = true;

        let element = (event.target as HTMLElement);

        // this.focusedShape = rect;

        this.shapeMovement!.activate(element);

        this.resizingPoints.updateBoxBoundary();

        event.preventDefault();

    }

    public mouseUpRect(event: Event) {

        this.shapeMovement!.deactivate();

        this.resizingPoints.updateBoxBoundary();

        this.positionIndicator.visible = false;

        event.preventDefault();

    }

    public mouseOutRect(event: MouseEvent) {
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.remove("rect_border");
    }

    public mouseOverRect(event: MouseEvent) {
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.add("rect_border");
    }

    public deactivateMovement() {
        this.shapeMovement!.deactivate();
    }

    public clickRect(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    public inactive() {
        // this.focusedShape = undefined;
        this.deactivateMovement();
        this.resizingPoints.inactive();
    }
}
export interface Point {
    x: number;
    y: number;
}
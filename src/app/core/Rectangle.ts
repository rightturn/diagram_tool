import { BoxMovement } from "./BoxMovement";
import { ResizingPoint } from "./ResizingPoint";
import { DrawingShape } from "./DrawingShape";
import { PositionIndicator } from "./PositionIndicator";
import { RectangleList } from "./RectangleList";

export class Rectangle extends DrawingShape {

    // private focusedShape?: Rectangular = undefined;
    private boxMovement: BoxMovement;
    private resizingPoints: ResizingPoint;
    private positionIndicator: PositionIndicator;

    public height: number;
    public width: number;
    public color: string;

    public classes: string[] = [];

    constructor(resizingPoints: ResizingPoint, positionIndicator: PositionIndicator, rectangular: Rectangular,) {

        super(rectangular.id, rectangular.x, rectangular.y);
        this.height = rectangular.height;
        this.width = rectangular.width;
        this.color = rectangular.color;

        this.positionIndicator = positionIndicator;
        this.resizingPoints = resizingPoints;
        this.classes = ['moveable']
        this.boxMovement = new BoxMovement(resizingPoints, this);

    }

    public setFillColor(color: string) {
        // if (this.focusedShape) {
        //     this.focusedShape.color = color;
        // }
        this.color = color;
    }

    public mouseDownRect(event: Event) {

        this.positionIndicator.visible = true;

        let element = (event.target as HTMLElement);

        // this.focusedShape = rect;

        this.boxMovement.activateBox(element);

        // this.resizingPoints.updateBoxBoundary(rect);

        event.preventDefault();

    }

    public mouseUpRect(event: Event) {

        this.boxMovement.deactivateBox();

        this.resizingPoints.updateBoxBoundary(this);

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


    public updateMovement(new_location: Point, drag: Point) {
        let movedStatus = this.boxMovement.updateMovement(drag);
        if (movedStatus) {
            this.updateIndicatorPosition(new_location)
        }
        // this.resizingPoints.updateResize(new_location, this.focusedShape!);
    }

    public deactivateMovement() {
        this.boxMovement.deactivateBox();
        this.resizingPoints.deactivate();
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


    private updateIndicatorPosition(cord: Point) {

        if (this.positionIndicator.visible) {

            this.positionIndicator.top = (this.y + this.height + 20) + "px";
            this.positionIndicator.left = (this.x + this.width / 2 - 25) + "px";
            this.positionIndicator.position_text = `${this.x},${this.y}`;
        }

    }

}

export interface Rectangular {
    height: number;
    width: number;
    color: string;
    x: number;
    y: number;
    rx: number;
    ry: number;
    id: number;
}
export interface Point {
    x: number;
    y: number;
}
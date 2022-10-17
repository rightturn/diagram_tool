import { DrawingShape, Point } from "./DrawingShape";
export class Rectangle extends DrawingShape {

    public height: number;
    public width: number;

    constructor(rectangular: Rectangular) {
        super(rectangular.id, rectangular.x, rectangular.y, rectangular.color);
        this.height = rectangular.height;
        this.width = rectangular.width;
    }

    public override mouseDown(event: Event): void {
        this.shapeBoundary.setFocusedShape(this)
        super.mouseDown(event);
    }

    public getBoundaryWidth(): number {
        return this.width;
    }

    public setBoundaryWidth(width: number): void {
        this.width = width;
    }

    public getBoundaryHeight(): number {
        return this.height;
    }

    public setBoundaryHeight(height: number): void {
        this.height = height;
    }

    public move(drag: Point): void {

        let new_x = this.initialLocation!.x + drag.x;
        let new_y = this.initialLocation!.y + drag.y;

        if (new_x >= 0) {
            this.x = new_x;
        }

        if (new_y >= 0) {
            this.y = new_y;
        }

        this.shapeBoundary.updateBoxBoundary();
    }

    public updateMovement(new_location: Point, drag: Point): void {
        this.move(drag);
        this.updateIndicatorPosition(new_location)
    }

    public updateResize(new_location:Point){
        this.shapeBoundary.updateResize(new_location);
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
import { DrawingShape, Point } from "./DrawingShape";
export class Circle extends DrawingShape {

    public getBoundaryWidth(): number {
        return this.width;
    }
    public setBoundaryWidth(width: number): void {
        this.diameter = width;
        this.width = width;
        this.height = width;
    }
    public getBoundaryHeight(): number {
        return this.height;
    }
    public setBoundaryHeight(height: number): void {
        this.diameter = height;
        this.height = height;
        this.width = height;
    }

    public height: number;
    public width: number;
    public diameter:number;

    constructor(circular: Circular) {
        super(circular.id, circular.x, circular.y, circular.color);
        this.height = circular.diameter;
        this.width = circular.diameter;
        this.diameter = circular.diameter;
    }

    public override mouseDown(event: Event): void {
        this.shapeBoundary.setFocusedShape(this)
        super.mouseDown(event);
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

export interface Circular {
    color: string;
    x: number;
    y: number;
    diameter:number;
    id: number;
}
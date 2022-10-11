import { BoxMovement } from "./BoxMovement";
import { ResizingPoint } from "./ResizingPoint";
import { DrawingShape, Point } from "./DrawingShape";
import { PositionIndicator } from "./PositionIndicator";
export class Rectangle extends DrawingShape {

    public height: number;
    public width: number;

    constructor(resizingPoints: ResizingPoint, positionIndicator: PositionIndicator, rectangular: Rectangular) {
        super(rectangular.id, rectangular.x, rectangular.y, rectangular.color, resizingPoints, positionIndicator);
        this.height = rectangular.height;
        this.width = rectangular.width;
        this.shapeMovement = new BoxMovement(resizingPoints, this);
    }

    public override mouseDownRect(event: Event): void {
        this.resizingPoints.setFocusedShape(this)
        super.mouseDownRect(event);
    }

    public updateMovement(new_location: Point, drag: Point): void {
        let movedStatus = this.shapeMovement!.updateMovement(drag);
        if (movedStatus) {
            this.updateIndicatorPosition(new_location)
        }
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
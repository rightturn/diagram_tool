import { DrawingShape, Point } from "./DrawingShape";
export class Rectangle extends DrawingShape {

    constructor(rectangular: Rectangular) {
        super(rectangular.id, rectangular.x, rectangular.y, rectangular.color);
        this.height = rectangular.height;
        this.width = rectangular.width;
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
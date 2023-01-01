import { DrawingShape, Point } from "./DrawingShape";
export class Circle extends DrawingShape {

    public diameter: number;

    constructor(circular: Circular) {
        super(circular.id, circular.x, circular.y, circular.color);
        this.height = circular.diameter;
        this.width = circular.diameter;
        this.diameter = circular.diameter;
        this.name = "circle";
    }

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

}

export interface Circular {
    color: string;
    x: number;
    y: number;
    diameter: number;
    id: number;
}
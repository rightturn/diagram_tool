import { DrawingShape, Point } from "./DrawingShape";

export class Triangle extends DrawingShape {

    public p1: Point;
    public p2: Point;
    public p3: Point;

    constructor(triangular: Triangular) {
        super(triangular.id, triangular.p1.x, triangular.p1.y, triangular.color);
        this.height = triangular.p3.y - triangular.p1.y;
        this.width = triangular.p2.x - triangular.p1.x;
        this.p1 = triangular.p1;
        this.p2 = triangular.p2;
        this.p3 = triangular.p3;
    }

    public getPoint1(): [number, number] {
        return [this.p1.x, this.p1.y];
    }

    public getPoint2(): [number, number] {
        return [this.p2.x, this.p2.y];
    }

    public getPoint3(): [number, number] {
        return [this.p3.x, this.p3.y];
    }

    public getBoundaryWidth(): number {
        return this.width;
    }

    public setBoundaryWidth(width: number): void {
        this.width = width;
        this.p2.x = width;
    }

    public getBoundaryHeight(): number {
        return this.height;
    }

    public setBoundaryHeight(height: number): void {
        this.height = height;
        this.p3.y = height;
    }

    protected override setX(x: number): void {
        super.setX(x);
        this.p1.x = x;
        this.p2.x = x + this.width;
        this.p3.x = x;
    }

    protected override setY(y: number): void {
        super.setY(y);
        this.p1.y = y;
        this.p2.y = y + this.height / 2;
        this.p3.y = y + this.height;
    }

}

export interface Triangular {
    color: string;
    p1: Point;
    p2: Point;
    p3: Point;
    id: number;
}
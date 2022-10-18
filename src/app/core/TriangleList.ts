import { Point } from "./DrawingShape";
import { Rectangle, Rectangular } from "./Rectangle";
import { Triangle, Triangular } from "./Triangle";

export class TriangleList {

    private static instance?: TriangleList = undefined;

    public triangles: Triangle[] = [];

    private constructor() { }

    public static getInstance(): TriangleList {
        if (TriangleList.instance == undefined) {
            TriangleList.instance = new TriangleList();
        }
        return TriangleList.instance;
    }

    public moveActive(new_location: Point, drag: Point) {
        this.triangles.forEach(rect => {
            if (rect.isMoveable()) {
                rect.updateMovement(new_location, drag);
            }
        });
    }

    public inactiveAll() {
        this.triangles.forEach(shape => {
            shape.inactive();
        });
    }

    public resize(new_location: Point) {
        this.triangles.forEach(rect => {
            rect.updateResize(new_location);
        });
    }

    public deactivateResize() {
        this.triangles.forEach(rect => {
            rect.stopResizing();
        });
    }

    public add() {
        let triangular: Triangular =
        {
            color: 'rgba(255,255,255)',
            p1: { x: 0, y: 0 },
            p2: { x: 100, y: 50 },
            p3: { x: 0, y: 100 },
            id: this.getNextIdForRectangle()
        };

        this.triangles.push(new Triangle(triangular));
    }

    private getNextIdForRectangle(): number {
        if (this.triangles.length > 0) {
            return this.triangles.length;
        }
        return 1;
    }
}
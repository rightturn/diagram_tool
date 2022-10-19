import { Circle, Circular } from "./Circle";
import { DrawingShape, Point } from "./DrawingShape";
import { Rectangle, Rectangular } from "./Rectangle";
import { Triangle, Triangular } from "./Triangle";

export class DrawingShapeList {

    private static instance?: DrawingShapeList = undefined;

    public drawingShapes: DrawingShape[] = [];
    public rectangles: Rectangle[] = [];
    public circles: Circle[] = [];
    public triangles: Triangle[] = [];

    private constructor() { }

    public static getInstance(): DrawingShapeList {

        if (DrawingShapeList.instance == undefined) {
            DrawingShapeList.instance = new DrawingShapeList();
        }

        return DrawingShapeList.instance;

    }

    public moveActive(new_location: Point, drag: Point) {
        this.drawingShapes.forEach(shape => {
            if (shape.isMoveable()) {
                shape.updateMovement(new_location, drag);
            }
        });
    }

    public inactiveAll() {
        this.drawingShapes.forEach(shape => {
            shape.inactive();
        });
    }

    public resize(new_location: Point) {
        this.drawingShapes.forEach(shape => {
            shape.updateResize(new_location);
        });
    }

    public deactivateResize() {
        this.drawingShapes.forEach(shape => {
            shape.stopResizing();
        });
    }


    public addRectangle() {

        let rectangular: Rectangular =
        {
            height: 100,
            width: 200,
            color: 'rgba(255,255,255)',
            x: 20,
            y: 30,
            rx: 0,
            ry: 0,
            id: this.getNextId()
        };

        let rectangle = new Rectangle(rectangular);
        this.rectangles.push(rectangle);
        this.drawingShapes.push(rectangle);

    }

    public addCircle() {

        let circular: Circular =
        {
            color: 'rgba(255,255,255)',
            x: 20,
            y: 30,
            diameter: 100,
            id: this.getNextId()
        };

        let circle = new Circle(circular);
        this.drawingShapes.push(circle);
        this.circles.push(circle);

    }

    public addTriangle() {
        let triangular: Triangular =
        {
            color: 'rgba(255,255,255)',
            p1: { x: 0, y: 0 },
            p2: { x: 100, y: 50 },
            p3: { x: 0, y: 100 },
            id: this.getNextId()
        };

        let triangle = new Triangle(triangular);
        this.drawingShapes.push(triangle);
        this.triangles.push(triangle);
    }

    private getNextId(): number {
        if (this.drawingShapes.length > 0) {
            return this.drawingShapes.length;
        }
        return 1;
    }
}
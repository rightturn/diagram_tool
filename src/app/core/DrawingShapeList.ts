import { DrawingShape, Point } from "./DrawingShape";
import { Rectangle, Rectangular } from "./Rectangle";
import { Circle, Circular } from "./Circle";
import { Triangle, Triangular } from "./Triangle";
import { ContextMenu } from "./ContextMenu";
import { cloneDeep } from "lodash";

export class DrawingShapeList {

    private static instance?: DrawingShapeList = undefined;

    public drawingShapes: DrawingShape[] = [];

    private constructor() { }

    public static getInstance(): DrawingShapeList {

        if (DrawingShapeList.instance == undefined) {
            DrawingShapeList.instance = new DrawingShapeList();
        }

        return DrawingShapeList.instance;

    }

    public fillColor(color: string) {
        this.drawingShapes.forEach(shape => {
            if (shape.focused) {
                shape.setFillColor(color);
            }
        });
    }

    public getTriangle(shape: DrawingShape): Triangle {
        return shape as Triangle;
    }

    public getRectangle(shape: DrawingShape): Rectangle {
        return shape as Rectangle;
    }

    public getCircle(shape: DrawingShape): Circle {
        return shape as Circle;
    }

    public moveActive(new_location: Point, drag: Point) {
        this.drawingShapes.forEach(shape => {
            if (shape.isMoveable()) {
                shape.updateMovement(new_location, drag);
            }
        });
    }

    public rotateActive(new_location: Point, drag: Point) {
        this.drawingShapes.forEach(shape => {
            if (shape.isRotatable()) {
                shape.updateRotation(new_location, drag);
            }
        });
    }

    public unfocusAll() {
        this.drawingShapes.forEach(shape => {
            shape.unfocused();
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

    public stopMovementForAll() {
        this.drawingShapes.forEach(shape => {
            shape.deactivate();
        });
    }

    public stopRotationForAll() {
        this.drawingShapes.forEach(shape => {
            shape.setAsNotRotatable();
        });
    }

    public dublicate() {
        let focused_shape = ContextMenu.getInstance().drawingShape;
        let new_object: DrawingShape = cloneDeep<DrawingShape>(focused_shape!);
        new_object.id = this.getNextId();
        this.drawingShapes.push(new_object);
        ContextMenu.getInstance().show = false;
    }

    public delete() {
        let focused_shape = ContextMenu.getInstance().drawingShape;
        let index = this.drawingShapes.findIndex(shape => {
            return shape.id == focused_shape?.id;
        });

        this.drawingShapes.splice(index, 1);
        ContextMenu.getInstance().show = false;
    }

    public sendBackward() {

        let focused_shape = ContextMenu.getInstance().drawingShape;
        let index = this.drawingShapes.findIndex(shape => {
            return shape.id == focused_shape?.id;
        });

        this.drawingShapes.splice(index, 1);
        this.drawingShapes.splice(index - 1, 0, focused_shape!);
        ContextMenu.getInstance().show = false;
    }


    public addRectangle() {

        let rectangular: Rectangular =
        {
            height: 100,
            width: 100,
            color: 'rgba(255,255,255)',
            x: 20,
            y: 30,
            rx: 0,
            ry: 0,
            id: this.getNextId()
        };

        console.log(rectangular);

        let rectangle = new Rectangle(rectangular);
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
    }

    private getNextId(): number {
        return this.drawingShapes.length;
    }
}
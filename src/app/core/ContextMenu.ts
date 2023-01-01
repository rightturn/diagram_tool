import { DrawingShape, Point } from "./DrawingShape";

export class ContextMenu {

    private static instance?: ContextMenu = undefined;

    public show: boolean = false;

    public position: Point;

    public drawingShape?: DrawingShape;

    private constructor() {
        this.position = { x: 0, y: 0 };
    }

    public static getInstance(): ContextMenu {
        if (ContextMenu.instance == undefined) {
            ContextMenu.instance = new ContextMenu();
        }

        return ContextMenu.instance;
    }

    public setPosition(point: Point) {
        this.position = point;
        console.log(this.position);
    }

    public setDrawingShape(drawingShape: DrawingShape) {
        this.drawingShape = drawingShape;
    }

    // public getPosition(): Point {
    //     return this.position;
    // }

}
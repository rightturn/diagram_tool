import { Rectangle, Rectangular } from "./Rectangle";

export class RectangleList {

    private static instance?: RectangleList = undefined;
    // public static moveableRectangle?: Rectangle = undefined;

    public rectangles: Rectangle[] = [];

    private constructor() { }

    public static getInstance(): RectangleList {

        if (RectangleList.instance == undefined) {
            RectangleList.instance = new RectangleList();
        }

        return RectangleList.instance;

    }

    public add() {

        let rectangular: Rectangular =
        {
            height: 100,
            width: 200,
            color: 'rgba(255,255,255)',
            x: 20,
            y: 30,
            rx: 0,
            ry: 0,
            id: this.getNextIdForRectangle()
        };

        let rectangle = new Rectangle(rectangular);
        this.rectangles.push(rectangle);

    }

    private getNextIdForRectangle(): number {
        if (this.rectangles.length > 0) {
            return this.rectangles.length;
        }
        return 1;
    }
}
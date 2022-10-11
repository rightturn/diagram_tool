import { Line, SimpleLine } from "./Line";
import { PositionIndicator } from "./PositionIndicator";
import { Rectangle, Rectangular } from "./Rectangle";
import { ResizingPoint } from "./ResizingPoint";

export class LineList {

    private static instance?: LineList = undefined;
    public static moveableLine?: Line = undefined;

    public lines: Line[] = [];
    private resizingPoints: ResizingPoint;
    private positionIndicator: PositionIndicator;

    private constructor(resizingPoints: ResizingPoint, positionIndicator: PositionIndicator) {
        this.resizingPoints = resizingPoints;
        this.positionIndicator = positionIndicator;
    }

    public static getInstance(resizingPoints: ResizingPoint, positionIndicator: PositionIndicator): LineList {

        if (LineList.instance == undefined) {
            LineList.instance = new LineList(resizingPoints, positionIndicator);
        }

        return LineList.instance;

    }

    public add() {

        let line: SimpleLine =
        {
            x0: 200,
            x1: 400,
            y0: 200,
            y1: 400
        }

        // let rectangle = new Line(this.resizingPoints, this.positionIndicator, rectangular);
        // this.rectangles.push(rectangle);

    }

    // private getNextIdForRectangle(): number {
    //     if (this.rectangles.length > 0) {
    //         return this.rectangles.length;
    //     }
    //     return 1;
    // }
}
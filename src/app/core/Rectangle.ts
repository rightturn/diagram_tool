import { ResizingPoint } from "./ResizingPoint";

export class Rectangle {

    private moveableShape?: Rectangular = undefined;
    private focusedShape?: Rectangular = undefined;
    private resizingPoints: ResizingPoint;
    public rectangulars: Rectangular[] = [];

    constructor(resizingPoints: ResizingPoint) {
        this.rectangulars.push(
            {
                height: 100,
                width: 200,
                color: 'rgba(255,255,255)',
                x: 20,
                y: 30,
                rx: 0,
                ry: 0,
                id: this.getNextIdForRectangle()
            }
        );

        this.resizingPoints = resizingPoints;

    }

    public mouseDownRect(event: Event, rect: Rectangular) {

        let element = (event.target as HTMLElement);

        this.focusedShape = rect;

        this.toggleBoxActiveState(rect, element);

        this.resizingPoints.updateBoxBoundary(rect);

        event.preventDefault();

    }

    public mouseUpRect(event: Event, rect: Rectangular) {

        let element = (event.target as HTMLElement);

        this.toggleBoxActiveState(rect, element);

        this.resizingPoints.updateBoxBoundary(rect);

        event.preventDefault();

    }

    public mouseOutRect(event: MouseEvent) {
        console.log("mouseOutRect");
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.remove("rect_border")
    }

    public mouseOverRect(event: MouseEvent) {
        console.log("mouseOverRect");
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.add("rect_border")
    }


    public updateMovement(cords: Point) {
        if (this.moveableShape) {
            this.moveableShape.x = cords.x - this.moveableShape.width / 2;
            this.moveableShape.y = cords.y - this.moveableShape.height / 2;
            this.resizingPoints.updateBoxBoundary(this.moveableShape);
        }

        this.resizingPoints.updateResize(cords,this.focusedShape!);
    }

    public deactivate() {
        this.moveableShape = undefined;
        this.resizingPoints.deactivate();
    }

    private getNextIdForRectangle(): number {
        if (this.rectangulars.length > 0) {
            return this.rectangulars.length;
        }
        return 1;
    }

    private toggleBoxActiveState(rect: Rectangular, element: HTMLElement) {

        if (this.moveableShape) {
            this.moveableShape = undefined;
            element.classList.remove("active_rect");
        } else {
            this.moveableShape = rect;
            element.classList.add("active_rect");
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
export interface Point {
    x: number;
    y: number;
}
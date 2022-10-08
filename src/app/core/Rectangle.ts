import { ResizingPoint } from "./ResizingPoint";

export class Rectangle {

    private moveableShape?: Rectangular = undefined;
    private focusedShape?: Rectangular = undefined;
    private resizingPoints: ResizingPoint;

    private containerMouseDownPoint?: Point = undefined;
    private initialLocation?: Point = undefined;

    public rectangulars: Rectangular[] = [];
    public classes: string[] = [];

    public position_indicator = false;
    public top = '50px';
    public left = '50px';
    public position_text = "";

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
        this.classes = ['moveable']

    }

    public setFillColor(color: string) {
        if (this.focusedShape) {
            this.focusedShape.color = color;
        }
    }

    public setContainerMouseDownPoint(location: Point) {
        this.containerMouseDownPoint = location;
    }

    public add() {

        this.rectangulars.push(
            {
                height: 100,
                width: 100,
                color: 'rgba(255,255,255)',
                x: 100,
                y: 100,
                rx: 0,
                ry: 0,
                id: this.getNextIdForRectangle()
            }
        );

    }

    public mouseDownRect(event: Event, rect: Rectangular) {

        this.position_indicator = true;

        let element = (event.target as HTMLElement);

        this.focusedShape = rect;

        this.toggleBoxActiveState(rect, element);

        this.resizingPoints.updateBoxBoundary(rect);

        this.initialLocation = { x: this.focusedShape.x, y: this.focusedShape.y };
        console.log("mouse down rect");

        event.preventDefault();

    }

    public mouseUpRect(event: Event, rect: Rectangular) {

        let element = (event.target as HTMLElement);

        this.toggleBoxActiveState(rect, element);

        this.resizingPoints.updateBoxBoundary(rect);

        this.position_indicator = false;

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


    public updateMovement(new_location: Point) {

        if (this.moveableShape) {

            this.updateIndicatorPosition(new_location);

            let old_location = this.containerMouseDownPoint;

            let x_difference = new_location.x - old_location!.x;
            let y_difference = new_location.y - old_location!.y;

            let new_x = this.initialLocation!.x + x_difference;
            let new_y = this.initialLocation!.y + y_difference;

            if (new_x >= 0) {
                this.moveableShape.x = new_x;
            }

            if (new_y >= 0) {
                this.moveableShape.y = new_y;
            }

            this.resizingPoints.updateBoxBoundary(this.moveableShape);
        }

        this.resizingPoints.updateResize(new_location, this.focusedShape!);
    }

    private updateIndicatorPosition(cord: Point) {

        if (this.position_indicator == true) {

            this.top = (this.moveableShape!.y + this.moveableShape!.height + 20) + "px";
            this.left = (this.moveableShape!.x + this.moveableShape!.width / 2 - 25) + "px";
            this.position_text = `${this.moveableShape!.x},${this.moveableShape!.y}`;
        }

    }

    public deactivateMovement() {
        this.moveableShape = undefined;
        this.resizingPoints.deactivate();
    }

    public clickRect(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    public inactive() {
        this.focusedShape = undefined;
        this.deactivateMovement();
        this.resizingPoints.inactive();
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
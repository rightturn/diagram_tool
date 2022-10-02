import { ResizingPoint } from "./ResizingPoint";

export class Rectangle {

    private moveableShape?: Rectangular = undefined;
    private focusedShape?: Rectangular = undefined;
    private resizingPoints: ResizingPoint;

    private containerMouseDownPoint?:Point = undefined;
    private initialLocation?:Point = undefined;

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

    public setContainerMouseDownPoint(location:Point){
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

        let element = (event.target as HTMLElement);

        this.focusedShape = rect;

        this.toggleBoxActiveState(rect, element);

        this.resizingPoints.updateBoxBoundary(rect);

        this.initialLocation = {x:this.focusedShape.x,y:this.focusedShape.y};
        console.log("mouse down rect");

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


    public updateMovement(new_location: Point) {

        if (this.moveableShape) {
            let old_location = this.containerMouseDownPoint;

            let x_difference = new_location.x - old_location!.x;
            let y_difference = new_location.y - old_location!.y;

            this.moveableShape.x = this.initialLocation!.x + x_difference
            this.moveableShape.y = this.initialLocation!.y + y_difference
            this.resizingPoints.updateBoxBoundary(this.moveableShape);
        }

        this.resizingPoints.updateResize(new_location, this.focusedShape!);
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
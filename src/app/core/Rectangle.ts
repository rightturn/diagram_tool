import { BoxMovement } from "./BoxMovement";
import { ResizingPoint } from "./ResizingPoint";

export class Rectangle {

    private focusedShape?: Rectangular = undefined;
    private resizingPoints: ResizingPoint;
    private boxMovement: BoxMovement;

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
        this.boxMovement = new BoxMovement(resizingPoints);

    }

    public setFillColor(color: string) {
        if (this.focusedShape) {
            this.focusedShape.color = color;
        }
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

        this.boxMovement.activateBox(rect, element);

        this.resizingPoints.updateBoxBoundary(rect);

        console.log("mouse down rect");

        event.preventDefault();

    }

    public mouseUpRect(event: Event, rect: Rectangular) {

        let element = (event.target as HTMLElement);

        this.boxMovement.deactivateBox(element);

        this.resizingPoints.updateBoxBoundary(rect);

        this.position_indicator = false;

        event.preventDefault();

    }

    public mouseOutRect(event: MouseEvent) {
        console.log("mouseOutRect");
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.remove("rect_border");
    }

    public mouseOverRect(event: MouseEvent) {
        console.log("mouseOverRect");
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.add("rect_border");
    }


    public updateMovement(new_location: Point,drag:Point) {
        let movedStatus = this.boxMovement.updateMovement(new_location,drag);
        if(movedStatus){
            this.updateIndicatorPosition(new_location)
        }
        this.resizingPoints.updateResize(new_location, this.focusedShape!);
    }

    public deactivateMovement() {
        this.boxMovement.deactivateMovement();
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

    private updateIndicatorPosition(cord: Point) {

        if (this.position_indicator == true) {

            this.top = (this.focusedShape!.y + this.focusedShape!.height + 20) + "px";
            this.left = (this.focusedShape!.x + this.focusedShape!.width / 2 - 25) + "px";
            this.position_text = `${this.focusedShape!.x},${this.focusedShape!.y}`;
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
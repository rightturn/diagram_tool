import { PositionIndicator } from "./PositionIndicator";
import { ShapeBoundary } from "./ShapeBoundary";

export abstract class DrawingShape {

    protected x: number = 0;
    protected y: number = 0;
    protected height: number = 0;
    protected width: number = 0;
    public id: number = 0;
    public color: string = "";
    public classes: string[] = [];
    public shapeBoundary: ShapeBoundary;

    protected positionIndicator: PositionIndicator;
    protected initialLocation?: Point = undefined;
    protected htmlElement?: HTMLElement = undefined;

    private moveable: boolean = false;

    constructor(id: number, x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = color;
        this.shapeBoundary = new ShapeBoundary();
        this.positionIndicator = new PositionIndicator();
    }

    public abstract getBoundaryWidth(): number;
    public abstract setBoundaryWidth(width: number): void;
    public abstract getBoundaryHeight(): number;
    public abstract setBoundaryHeight(height: number): void;

    public isMoveable(): boolean {
        return this.moveable;
    }

    public setFillColor(color: string) {
        // if (this.focusedShape) {
        //     this.focusedShape.color = color;
        // }
        this.color = color;
    }

    public mouseDown(event: Event): void {
        console.log("mouse down called");
        this.activate(event);
        this.shapeBoundary.setFocusedShape(this)
        this.shapeBoundary.setBoxBoundary();
        event.preventDefault();
    }

    public mouseUp(event: Event) {
        this.deactivate();
        this.shapeBoundary.setBoxBoundary();
        event.preventDefault();
    }

    // public mouseOut(event: MouseEvent) {
    //     let t: HTMLElement = (event.target as HTMLElement);
    //     t.classList.remove("rect_border");
    // }

    // public mouseOver(event: MouseEvent) {
    //     let t: HTMLElement = (event.target as HTMLElement);
    //     t.classList.add("rect_border");
    // }

    public stopResizing() {
        this.shapeBoundary!.stopResizing();
    }

    public click(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    public inactive() {
        this.shapeBoundary.inactive();
    }

    public move(drag: Point): void {

        let new_x = this.initialLocation!.x + drag.x;
        let new_y = this.initialLocation!.y + drag.y;

        if (new_x >= 0) {
            this.setX(new_x);
        }

        if (new_y >= 0) {
            this.setY(new_y);
        }

        this.shapeBoundary.setBoxBoundary();
    }

    public updateMovement(new_location: Point, drag: Point): void {
        this.move(drag);
        this.updateIndicatorPosition(new_location)
    }

    public updateResize(new_location: Point) {
        this.shapeBoundary.updateResize(new_location);
    }

    public setX(x: number) {
        this.x = x;
    }

    public getX(): number {
        return this.x;
    }

    public setY(y: number) {
        this.y = y;
    }

    public getY(): number {
        return this.y;
    }

    private updateIndicatorPosition(cord: Point) {
        if (this.positionIndicator.visible) {
            this.positionIndicator.top = (this.y + this.height + 20) + "px";
            this.positionIndicator.left = (this.x + this.width / 2 - 25) + "px";
            this.positionIndicator.position_text = `${this.x},${this.y}`;
        }
    }
    private activate(event: Event): void {
        this.setAsMoveable();
        this.setInitialLocation();
        this.setPositionIndicatorToVisible();
        this.setHtmlElement(event);
        this.addActiveClassOnElement();
    }

    private deactivate(): void {
        this.setAsNotMoveable();
        this.setPositionIndicatorToHidden();
        this.removeActiveClassFromElement();
    }

    private setAsMoveable() {
        this.moveable = true;
    }

    private setInitialLocation() {
        this.initialLocation = { x: this.x, y: this.y };
    }

    private setAsNotMoveable() {
        this.moveable = false;
    }

    private setPositionIndicatorToVisible() {
        this.positionIndicator.visible = true;
    }

    private setPositionIndicatorToHidden() {
        this.positionIndicator.visible = false;
    }

    private setHtmlElement(event: Event) {
        this.htmlElement = (event.target as HTMLElement);
    }

    private addActiveClassOnElement() {
        this.htmlElement?.classList.add("active_rect");
    }

    private removeActiveClassFromElement() {
        this.htmlElement?.classList.remove("active_rect");
    }

}

export interface Point {
    x: number;
    y: number;
}
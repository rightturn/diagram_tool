import { PositionIndicator } from "./PositionIndicator";
import { ShapeBoundary } from "./ShapeBoundary";

export abstract class DrawingShape {

    public x: number = 0;
    public y: number = 0;
    public id: number = 0;
    public color: string = "";
    public classes: string[] = [];
    private moveable:boolean = false;

    public shapeBoundary: ShapeBoundary;
    protected positionIndicator: PositionIndicator;

    protected initialLocation?: Point = undefined;
    protected htmlElement?: HTMLElement = undefined;

    constructor(id: number, x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = color;
        this.shapeBoundary = new ShapeBoundary();
        this.positionIndicator = new PositionIndicator();
    }

    public abstract updateMovement(new_location: Point, drag: Point): void;
    public abstract getBoundaryWidth():number;
    public abstract setBoundaryWidth(width:number):void;
    public abstract getBoundaryHeight():number;
    public abstract setBoundaryHeight(height:number):void;


    public isMoveable():boolean{
        return this.moveable;
    }
    public setFillColor(color: string) {
        // if (this.focusedShape) {
        //     this.focusedShape.color = color;
        // }
        this.color = color;
    }

    public mouseDown(event: Event): void {

        this.activate(event);

        this.shapeBoundary.updateBoxBoundary();

        event.preventDefault();

    }


    public mouseUp(event: Event) {

        // this.shapeMovement!.deactivate();
        this.deactivate();

        this.shapeBoundary.updateBoxBoundary();

        event.preventDefault();

    }

    public mouseOut(event: MouseEvent) {
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.remove("rect_border");
    }

    public mouseOver(event: MouseEvent) {
        let t: HTMLElement = (event.target as HTMLElement);
        t.classList.add("rect_border");
    }

    public deactivateResize() {
        this.shapeBoundary!.deactivate();
    }

    public click(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    public inactive() {
        this.deactivateResize();
        this.shapeBoundary.inactive();
    }

    private activate(event: Event): void {
        this.setAsMoveable();
        this.setInitialLocation();
        this.setPositionIndicatorToVisible();
        this.setHtmlElement(event);
        this.addActiveClassOnElement();
    }

    private setAsMoveable(){
        this.moveable = true;
    }

    private setAsNotMoveable(){
        this.moveable = false;
    }

    private deactivate(): void {
        this.setAsNotMoveable();
        this.setPositionIndicatorToHidden();
        this.removeActiveClassFromElement();
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

    private setInitialLocation() {
        this.initialLocation = { x: this.x, y: this.y };
    }
}
export interface Point {
    x: number;
    y: number;
}
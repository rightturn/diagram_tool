import { ContextMenu } from "./ContextMenu";
import { DrawingShapeList } from "./DrawingShapeList";
import { PositionIndicator } from "./PositionIndicator";
import { ShapeBoundary } from "./ShapeBoundary";

export abstract class DrawingShape {

    protected x: number = 0;
    protected y: number = 0;
    protected height: number = 0;
    protected width: number = 0;
    public id: number = 0;
    public name: string = "";
    public color: string = "";
    public classes: string[] = [];
    public shapeBoundary: ShapeBoundary;
    public focused: boolean;

    private degree: number = 0;

    protected positionIndicator: PositionIndicator;
    protected initialLocation?: Point = undefined;
    protected htmlElement?: HTMLElement = undefined;


    private moveable: boolean = false;
    private rotatable: boolean = false;
    private contextMenu: ContextMenu;

    constructor(id: number, x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.color = color;
        this.shapeBoundary = new ShapeBoundary();
        this.positionIndicator = new PositionIndicator();
        this.focused = false;
        this.contextMenu = ContextMenu.getInstance();
    }

    public abstract getBoundaryWidth(): number;
    public abstract setBoundaryWidth(width: number): void;
    public abstract getBoundaryHeight(): number;
    public abstract setBoundaryHeight(height: number): void;

    public contextmenu(event: MouseEvent) {
        let point = { x: event.offsetX, y: event.offsetY };
        this.contextMenu = ContextMenu.getInstance();
        this.contextMenu.setPosition(point);
        this.contextMenu.show = true;
        this.contextMenu.setDrawingShape(this);
        event.preventDefault();
    }

    public isMoveable(): boolean {
        return this.moveable;
    }

    public isRotatable(): boolean {
        return this.rotatable;
    }

    public setFillColor(color: string) {
        this.color = color;
    }

    public mouseDown(event: Event): void {
        this.activate(event);
        this.shapeBoundary.setFocusedShape(this)
        this.shapeBoundary.setBoxBoundary();
        this.contextMenu.show = false;

        let drawingShapeList = DrawingShapeList.getInstance();
        drawingShapeList.unfocusAll();
        this.focused = true;

        console.log("shape mouse down");
        // event.stopPropagation();
        event.preventDefault();
    }

    public unfocused() {
        this.focused = false;
        // console.log(`focused false for ${this.name}`);
    }

    public mouseUp(event: MouseEvent) {
        this.deactivate();
        console.log("shape mouse up");
        // this.focused = true;
        // console.log(`focused true for ${this.name}`);
        // this.shapeBoundary.setBoxBoundary();
        // event.stopPropagation();
        event.preventDefault();
    }

    public stopResizing() {
        this.shapeBoundary!.stopResizing();
    }

    public click(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    public inactive() {
        this.shapeBoundary.inactive();
        this.contextMenu.show = false;
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

    public rotate(new_location: Point, drag: Point): void {

        let center_x = this.getX() + this.getBoundaryWidth() / 2;
        let center_y = this.getY() + this.getBoundaryHeight() / 2;

        let dy = new_location.y - center_y;
        let dx = new_location.x - center_x;
        let theta = Math.atan(dy / dx);
        theta *= 180 / Math.PI; // rads to degs

        theta = Math.abs(theta);

        // first quadrant
        this.degree = theta;

        if (dx < 0 && dy >= 0) {
            // second quadrant
            this.degree = 180 - theta;
        } else if (dx < 0 && dy < 0) {
            // third quadrant
            this.degree = 180 + theta;
        } else if (dx >= 0 && dy < 0) {
            // fourth quadrant
            this.degree = 360 - theta;
        }


        // console.log("rotate called");
        // console.log(new_location);
        // console.log("center point");
        // console.log(`center_x : ${center_x} , center_y : ${center_y}`);

        this.shapeBoundary.setBoxBoundary();
    }

    public getDegree(): number {
        return this.degree;
    }

    public getRotationValue(): string {
        let center_x = this.getX() + this.getBoundaryWidth() / 2;
        let center_y = this.getY() + this.getBoundaryHeight() / 2;
        return `rotate(${this.degree},${center_x},${center_y})`;
    }

    public updateMovement(new_location: Point, drag: Point): void {
        this.move(drag);
        this.updateIndicatorPosition(new_location)
    }

    public updateRotation(new_location: Point, drag: Point): void {
        this.rotate(new_location, drag);
        // this.updateIndicatorPosition(new_location)
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

    public deactivate(): void {
        this.setAsNotMoveable();
        this.setPositionIndicatorToHidden();
        this.removeActiveClassFromElement();
    }

    private setAsMoveable() {
        this.moveable = true;
    }

    public setAsRotatable() {
        this.rotatable = true;
    }

    private setInitialLocation() {
        this.initialLocation = { x: this.x, y: this.y };
    }

    private setAsNotMoveable() {
        this.moveable = false;
    }

    public setAsNotRotatable() {
        this.rotatable = false;
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
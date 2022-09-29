
export class Rectangle {

    public points: ResizeablePoint[] = [];

    public radiusCircle = 5;

    private mouseStartingPoint?: Point = undefined;
    private moveableShape?: Rectangular = undefined;
    private focusedShape?: Rectangular = undefined;
    private activeResizePoint?: ResizeablePoint = undefined;
    public rectangulars: Rectangular[] = [];

    constructor() {
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

        this.addNew();
    }
    /**
     * Adds new rectangular element.
     */
    addNew() {
        this.rectangulars.push({
            height: 30,
            width: 30,
            color: '#000',
            x: 30,
            y: 30,
            rx: 0,
            ry: 0,
            id: this.getNextIdForRectangle()
        });
    }

    public mouseDownRect(event: Event, rect: Rectangular) {

        let element = (event.target as HTMLElement);

        this.focusedShape = rect;

        this.toggleBoxActiveState(rect, element);

        this.updateBoxBoundary(rect);

        event.preventDefault();

    }

    public mouseUpRect(event: Event, rect: Rectangular) {

        let element = (event.target as HTMLElement);

        this.toggleBoxActiveState(rect, element);

        this.updateBoxBoundary(rect);

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

    public mouseUpResizePoint(event: Event, point: ResizeablePoint) {
        this.activeResizePoint = undefined;
        this.mouseStartingPoint = undefined;
    }

    public mouseDownResizePoint(event: Event, point: ResizeablePoint) {
        this.activeResizePoint = point;
        let mouseEvent = (event as MouseEvent);
        this.mouseStartingPoint = { x: mouseEvent.x, y: mouseEvent.y };
        console.log(this.mouseStartingPoint);
    }

    public updateMovement(cords: Point) {
        if (this.moveableShape) {
            this.moveableShape.x = cords.x - this.moveableShape.width / 2;
            this.moveableShape.y = cords.y - this.moveableShape.height / 2;
            this.updateBoxBoundary(this.moveableShape);
        }
    }

    public deactivate() {
        this.activeResizePoint = undefined;
        this.mouseStartingPoint = undefined;
        this.moveableShape = undefined;
    }

    public updateResize(cords: Point) {

        if (this.activeResizePoint) {
            console.log(this.activeResizePoint);
            console.log(this.focusedShape);
            console.log(event);

            if (this.activeResizePoint.label == ResizeablePointLabel.RIGHT) {
                let new_width = cords.x - this.focusedShape!.x;
                this.focusedShape!.width = new_width;
                this.updateBoxBoundary(this.focusedShape!);
            }

            if (this.activeResizePoint.label == ResizeablePointLabel.BOTTOM) {
                let new_height = cords.y - this.focusedShape!.y;
                this.focusedShape!.height = new_height;
                this.updateBoxBoundary(this.focusedShape!);
            }

        }
    }

    private getNextIdForRectangle(): number {
        if (this.rectangulars.length > 0) {
            return this.rectangulars.length;
        }

        return 1;
    }

    private updateBoxBoundary(rect: Rectangular) {

        // let box: BoxBoundaryCordinates = this.getBoxCornerBoundaryCordinates(rect);

        // let top_left: Point = { x: box.left_x, y: box.top_y };
        // let top_right: Point = { x: box.right_x, y: box.top_y };
        // let bottom_right: Point = { x: box.right_x, y: box.bottom_y };
        // let bottom_left: Point = { x: box.left_x, y: box.bottom_y };

        let box = this.getBoxLineCenterBoundaryCordinates(rect);

        let top: ResizeablePoint = { x: box.center_x, y: box.start_y, label: ResizeablePointLabel.TOP };
        let right: ResizeablePoint = { x: box.end_x, y: box.center_y, label: ResizeablePointLabel.RIGHT };
        let bottom: ResizeablePoint = { x: box.center_x, y: box.end_y, label: ResizeablePointLabel.BOTTOM };
        let left: ResizeablePoint = { x: box.start_x, y: box.center_y, label: ResizeablePointLabel.LEFT };


        this.points = [top, right, bottom, left];
    }

    private getBoxLineCenterBoundaryCordinates(rect: Rectangular) {

        let start_x = rect.x - this.radiusCircle;
        let center_x = start_x + rect.width / 2;
        let end_x = start_x + rect.width;

        let start_y = rect.y - this.radiusCircle;
        let center_y = start_y + rect.height / 2;
        let end_y = start_y + rect.height;

        return {
            start_x, center_x, end_x, start_y, center_y, end_y
        };
    }

    private getBoxCornerBoundaryCordinates(rect: Rectangular) {

        let left_x: number = rect.x - this.radiusCircle;
        let right_x: number = left_x + rect.width;
        let top_y: number = rect.y - this.radiusCircle;
        let bottom_y: number = top_y + rect.height;

        return {
            left_x, right_x, top_y, bottom_y
        };
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

interface ResizeablePoint {
    x: number;
    y: number;
    label: ResizeablePointLabel;
}

interface BoxBoundaryCordinates {
    left_x: number;
    right_x: number;
    top_y: number;
    bottom_y: number;
}

enum ResizeablePointLabel {
    TOP = "top", BOTTOM = "bottom", LEFT = "left", RIGHT = "right"
}

export interface Point {
    x: number;
    y: number;
}
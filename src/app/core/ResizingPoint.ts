import { Box } from "./Box";
import { Point, Rectangle, Rectangular } from "./Rectangle";

export class ResizingPoint {

    private activeResizePoint?: ResizeablePoint = undefined;
    private focusedShape?: Rectangle = undefined;

    public points: ResizeablePoint[] = [];
    public radiusCircle = 5;

    public mouseUpResizePoint(event: Event, point: ResizeablePoint) {
        this.deactivate();
    }

    public mouseDownResizePoint(event: Event, point: ResizeablePoint) {
        this.activeResizePoint = point;
    }

    public deactivate() {
        this.activeResizePoint = undefined;
    }

    public inactive() {
        this.points = [];
    }

    public updateResize(cords: Point) {

        console.log("updateResize");
        if (this.activeResizePoint) {

            if (this.activeResizePoint.label == ResizeablePointLabel.RIGHT) {
                this.resizeFromRight(cords);
            }

            if (this.activeResizePoint.label == ResizeablePointLabel.LEFT) {
                this.resizeFromLeft(cords);
            }

            if (this.activeResizePoint.label == ResizeablePointLabel.BOTTOM) {
                this.resizeFromBottom(cords);
            }

            if (this.activeResizePoint.label == ResizeablePointLabel.TOP) {
                this.resizeFromTop(cords);
            }

            this.updateBoxBoundary();

        }
    }

    private resizeFromRight(cords: Point) {
        let new_width = cords.x - this.focusedShape!.x;
        this.focusedShape!.width = new_width >= (this.radiusCircle * 2) ? new_width : this.focusedShape!.width;
    }

    private resizeFromTop(cords: Point) {
        let old_y = this.focusedShape!.y;
        if (cords.y > old_y) {
            if (this.focusedShape!.height >= this.radiusCircle * 2) {
                this.focusedShape!.height -= cords.y - old_y;
                this.focusedShape!.y = cords.y;
            }
        } else {
            this.focusedShape!.height += old_y - cords.y;
            this.focusedShape!.y = cords.y;
        }
    }

    private resizeFromBottom(cords: Point) {
        let new_height = cords.y - this.focusedShape!.y;
        this.focusedShape!.height = new_height >= (this.radiusCircle * 2) ? new_height : this.focusedShape!.height;
    }

    private resizeFromLeft(cords: Point) {
        let old_x = this.focusedShape!.x;
        if (cords.x > old_x) {
            if (this.focusedShape!.width >= this.radiusCircle * 2) {
                this.focusedShape!.width -= cords.x - old_x;
                this.focusedShape!.x = cords.x;
            }
        } else {
            this.focusedShape!.width += old_x - cords.x;
            this.focusedShape!.x = cords.x;
        }
    }

    public setFocusedShape(rect: Rectangle) {
        this.focusedShape = rect;
    }

    public updateBoxBoundary() {

        // let box: BoxBoundaryCordinates = this.getBoxCornerBoundaryCordinates(rect);

        // let top_left: Point = { x: box.left_x, y: box.top_y };
        // let top_right: Point = { x: box.right_x, y: box.top_y };
        // let bottom_right: Point = { x: box.right_x, y: box.bottom_y };
        // let bottom_left: Point = { x: box.left_x, y: box.bottom_y };

        let box = this.getBoxLineCenterBoundaryCordinates(this.focusedShape!);

        let top: ResizeablePoint = { x: box.center_x, y: box.start_y, label: ResizeablePointLabel.TOP };
        let right: ResizeablePoint = { x: box.end_x, y: box.center_y, label: ResizeablePointLabel.RIGHT };
        let bottom: ResizeablePoint = { x: box.center_x, y: box.end_y, label: ResizeablePointLabel.BOTTOM };
        let left: ResizeablePoint = { x: box.start_x, y: box.center_y, label: ResizeablePointLabel.LEFT };


        this.points = [top, right, bottom, left];
    }

    private getBoxLineCenterBoundaryCordinates(box: Box) {

        let start_x = box.x - this.radiusCircle;
        let center_x = start_x + box.width / 2;
        let end_x = start_x + box.width;

        let start_y = box.y - this.radiusCircle;
        let center_y = start_y + box.height / 2;
        let end_y = start_y + box.height;

        return {
            start_x, center_x, end_x, start_y, center_y, end_y
        };
    }

    private getBoxCornerBoundaryCordinates(box: Box) {

        let left_x: number = box.x - this.radiusCircle;
        let right_x: number = left_x + box.width;
        let top_y: number = box.y - this.radiusCircle;
        let bottom_y: number = top_y + box.height;

        return {
            left_x, right_x, top_y, bottom_y
        };
    }

}

export interface ResizeablePoint {
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
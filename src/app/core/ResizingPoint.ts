import { Box } from "./Box";
import { Point, Rectangular } from "./Rectangle";

export class ResizingPoint {

    private activeResizePoint?: ResizeablePoint = undefined;

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

    public updateResize(cords: Point, focusedShape: Rectangular) {

        if (this.activeResizePoint) {

            if (this.activeResizePoint.label == ResizeablePointLabel.RIGHT) {
                this.resizeFromRight(cords, focusedShape);
            }

            if (this.activeResizePoint.label == ResizeablePointLabel.LEFT) {
                this.resizeFromLeft(cords, focusedShape);
            }

            if (this.activeResizePoint.label == ResizeablePointLabel.BOTTOM) {
                this.resizeFromBottom(cords, focusedShape);
            }

            if (this.activeResizePoint.label == ResizeablePointLabel.TOP) {
                this.resizeFromTop(cords, focusedShape);
            }

            this.updateBoxBoundary(focusedShape);

        }
    }

    private resizeFromRight(cords: Point, focusedShape: Rectangular) {
        let new_width = cords.x - focusedShape.x;
        focusedShape.width = new_width >= (this.radiusCircle * 2) ? new_width : focusedShape.width;
    }

    private resizeFromTop(cords: Point, focusedShape: Rectangular) {
        let old_y = focusedShape.y;
        focusedShape.y = cords.y;
        if (cords.y > old_y) {
            focusedShape.height -= cords.y - old_y;
        } else {
            focusedShape.height += old_y - cords.y;
        }
    }

    private resizeFromBottom(cords: Point, focusedShape: Rectangular) {
        let new_height = cords.y - focusedShape.y;
        focusedShape.height = new_height >= (this.radiusCircle * 2) ? new_height : focusedShape.height;
    }

    private resizeFromLeft(cords: Point, focusedShape: Rectangular) {
        let old_x = focusedShape.x;
        focusedShape.x = cords.x;
        if (cords.x > old_x) {
            focusedShape.width -= cords.x - old_x;
        } else {
            focusedShape.width += old_x - cords.x;
        }
    }

    public updateBoxBoundary(rect: Box) {

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
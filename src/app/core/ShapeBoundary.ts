import { Box } from "./Box";
import { DrawingShape, Point } from "./DrawingShape";

export class ShapeBoundary {

    public points: ResizeablePoint[] = [];
    public radiusCircle = 5;

    private activeResizePoint?: ResizeablePoint = undefined;
    private focusedShape?: DrawingShape = undefined;

    public mouseUpResizePoint(event: Event, point: ResizeablePoint) {
        this.unsetActiveResizePoint();
    }

    public mouseDownResizePoint(event: Event, point: ResizeablePoint) {
        this.setActiveResizePoint(point);
    }

    public stopResizing(){
        this.unsetActiveResizePoint();
    }

    public inactive() {
        this.points = [];
        this.unsetActiveResizePoint();
    }

    public updateResize(cords: Point) {
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
            this.setBoxBoundary();
        }
    }

    public setFocusedShape(shape: DrawingShape) {
        this.focusedShape = shape;
    }

    public setBoxBoundary() {

        // let box: BoxBoundaryCordinates = this.getBoxCornerBoundaryCordinates(rect);

        // let top_left: Point = { x: box.left_x, y: box.top_y };
        // let top_right: Point = { x: box.right_x, y: box.top_y };
        // let bottom_right: Point = { x: box.right_x, y: box.bottom_y };
        // let bottom_left: Point = { x: box.left_x, y: box.bottom_y };

        let box = this.getBoxLineCenterBoundaryCordinates();

        let top: ResizeablePoint = { x: box.center_x, y: box.start_y, label: ResizeablePointLabel.TOP };
        let right: ResizeablePoint = { x: box.end_x, y: box.center_y, label: ResizeablePointLabel.RIGHT };
        let bottom: ResizeablePoint = { x: box.center_x, y: box.end_y, label: ResizeablePointLabel.BOTTOM };
        let left: ResizeablePoint = { x: box.start_x, y: box.center_y, label: ResizeablePointLabel.LEFT };

        this.points = [top, right, bottom, left];
    }

    private setActiveResizePoint(point: ResizeablePoint){
        this.activeResizePoint = point;
    }

    private unsetActiveResizePoint() {
        this.activeResizePoint = undefined;
    }

    private resizeFromRight(cords: Point) {
        let new_width = cords.x - this.focusedShape!.x;
        let updated_width = new_width >= (this.radiusCircle * 2) ? new_width : this.focusedShape!.getBoundaryWidth();
        this.focusedShape!.setBoundaryWidth(updated_width);
    }

    private resizeFromTop(cords: Point) {
        let old_y = this.focusedShape!.y;
        let updated_height = this.focusedShape!.getBoundaryHeight() - cords.y + old_y;
        if(updated_height > this.radiusCircle * 2){
            this.focusedShape!.setBoundaryHeight(updated_height);
            this.focusedShape!.y = cords.y;
        }
    }

    private resizeFromBottom(cords: Point) {
        let new_height = cords.y - this.focusedShape!.y;
        let updated_height = new_height >= (this.radiusCircle * 2) ? new_height : this.focusedShape!.getBoundaryHeight();
        this.focusedShape!.setBoundaryHeight(updated_height);
    }

    private resizeFromLeft(cords: Point) {
        let old_x = this.focusedShape!.x;
        let updated_width =  this.focusedShape!.getBoundaryWidth() + old_x - cords.x;
        if(updated_width > this.radiusCircle * 2){
            this.focusedShape!.setBoundaryWidth(updated_width);
            this.focusedShape!.x = cords.x;
        }
    }

    private getBoxLineCenterBoundaryCordinates() {

        let start_x = this.focusedShape!.x - this.radiusCircle;
        let center_x = start_x + this.focusedShape!.getBoundaryWidth() / 2;
        let end_x = start_x + this.focusedShape!.getBoundaryWidth();

        let start_y = this.focusedShape!.y - this.radiusCircle;
        let center_y = start_y + this.focusedShape!.getBoundaryHeight() / 2;
        let end_y = start_y + this.focusedShape!.getBoundaryHeight();

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
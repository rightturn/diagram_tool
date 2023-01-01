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

    public stopResizing() {
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

        let top: ResizeablePoint = this.getTopPoint();
        // let top: ResizeablePoint = { x: box.center_x, y: box.start_y, label: ResizeablePointLabel.TOP };
        // let right: ResizeablePoint = { x: box.end_x, y: box.center_y, label: ResizeablePointLabel.RIGHT };
        // let bottom: ResizeablePoint = { x: box.center_x, y: box.end_y, label: ResizeablePointLabel.BOTTOM };
        // let left: ResizeablePoint = { x: box.start_x, y: box.center_y, label: ResizeablePointLabel.LEFT };

        // this.points = [top, right, bottom, left];
        this.points = [top];
    }

    private getTopPoint(): ResizeablePoint {

        let rad = (Math.PI / 180) * this.focusedShape!.getDegree();

        let half_height = this.focusedShape!.getBoundaryHeight() / 2;
        let half_width = this.focusedShape!.getBoundaryWidth() / 2;

        let center_x = this.focusedShape!.getX() + half_width;
        let center_y = this.focusedShape!.getY() + half_height;

        let initial_degree_rad = -90 * (Math.PI / 180);

        let new_x = (half_height * Math.cos(rad + initial_degree_rad));
        let new_y = (half_height * Math.sin(rad + initial_degree_rad));

        // console.log("getTopPoint");
        // console.log(this.focusedShape!.getDegree());
        // console.log(new_x);
        // console.log(new_y);

        new_x = center_x + new_x;
        new_y = center_y + new_y;

        return { x: new_x, y: new_y, label: ResizeablePointLabel.TOP };
    }

    private setActiveResizePoint(point: ResizeablePoint) {
        this.activeResizePoint = point;
    }

    private unsetActiveResizePoint() {
        this.activeResizePoint = undefined;
    }

    private resizeFromRight(cords: Point) {
        let new_width = cords.x - this.focusedShape!.getX();
        let updated_width = new_width >= (this.radiusCircle * 2) ? new_width : this.focusedShape!.getBoundaryWidth();
        this.focusedShape!.setBoundaryWidth(updated_width);
    }

    private resizeFromTop(cords: Point) {
        let old_y = this.focusedShape!.getY();
        let y_diff = old_y - cords.y
        let updated_height = this.focusedShape!.getBoundaryHeight() + y_diff;
        if (updated_height > this.radiusCircle * 2) {
            this.focusedShape!.setBoundaryHeight(updated_height);

            //resize only from up
            // this.focusedShape!.setY(cords.y);

            //resize up and down
            this.focusedShape!.setY(old_y - y_diff / 2);
        }
    }

    private resizeFromBottom(cords: Point) {
        let new_height = cords.y - this.focusedShape!.getY();
        let updated_height = new_height >= (this.radiusCircle * 2) ? new_height : this.focusedShape!.getBoundaryHeight();
        this.focusedShape!.setBoundaryHeight(updated_height);
    }

    private resizeFromLeft(cords: Point) {
        let old_x = this.focusedShape!.getX();
        let updated_width = this.focusedShape!.getBoundaryWidth() + old_x - cords.x;
        if (updated_width > this.radiusCircle * 2) {
            this.focusedShape!.setBoundaryWidth(updated_width);
            this.focusedShape!.setX(cords.x);
        }
    }

    private getBoxLineCenterBoundaryCordinates() {


        let half_width = this.focusedShape!.getBoundaryWidth() / 2;
        let x_diff = half_width - Math.abs(half_width * Math.cos(this.focusedShape!.getDegree()));

        let half_height = this.focusedShape!.getBoundaryHeight() / 2;
        let y_diff = half_height - Math.abs(half_height * Math.sin(this.focusedShape!.getDegree()));

        // console.log(this.focusedShape!.getDegree());
        // console.log(Math.cos(this.focusedShape!.getDegree()));
        // console.log(Math.abs(half_width * Math.cos(this.focusedShape!.getDegree())));


        let start_x = this.focusedShape!.getX() + x_diff;
        let center_x = this.focusedShape!.getX() + this.focusedShape!.getBoundaryWidth() / 2;
        let end_x = this.focusedShape!.getX() + this.focusedShape!.getBoundaryWidth() - x_diff;

        let start_y = this.focusedShape!.getY() + y_diff;
        let center_y = this.focusedShape!.getY() + this.focusedShape!.getBoundaryHeight() / 2;
        let end_y = this.focusedShape!.getY() + this.focusedShape!.getBoundaryHeight() - y_diff;

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
export interface Box {
    height: number;
    width: number;
    x: number;
    y: number;
}

enum ResizeablePointLabel {
    TOP = "top", BOTTOM = "bottom", LEFT = "left", RIGHT = "right"
}
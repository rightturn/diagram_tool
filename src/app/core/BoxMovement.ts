import { Point } from "./DrawingShape";
import { ShapeMovement } from "./ShapeMovement";

export class BoxMovement extends ShapeMovement {

    public updateMovement(drag: Point): boolean {

        if (this.moveableShape) {

            let new_x = this.initialLocation!.x + drag.x;
            let new_y = this.initialLocation!.y + drag.y;

            if (new_x >= 0) {
                this.moveableShape.x = new_x;
            }

            if (new_y >= 0) {
                this.moveableShape.y = new_y;
            }

            this.resizingPoints.updateBoxBoundary();
            return true
        }

        return false;

    }


    public override activate(element: HTMLElement) {
        super.activate(element);
        element.classList.add("active_rect");
    }

    public override deactivate() {
        super.deactivate();
        if (this.htmlElement) {
            this.htmlElement!.classList.remove("active_rect");
        }
    }
}
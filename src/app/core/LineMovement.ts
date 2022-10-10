import { IMoveable } from "./IMoveable";
import { Line } from "./Line";
import { Point } from "./Rectangle";

export class LineMovement implements IMoveable {

    updateMovement(drag: Point): void {
        throw new Error("Method not implemented.");
    }

    public activate(line: Line, element: HTMLElement) {
        this.initialLocation = { x: rect.x, y: rect.y };
        this.moveableShape = rect;
        this.htmlElement = element;
        element.classList.add("active_line");
    }

    public deactivate() {
        this.initialLocation = undefined;
        this.moveableShape = undefined;

        if (this.htmlElement) {
            this.htmlElement!.classList.remove("active_rect");
        }

    }

}
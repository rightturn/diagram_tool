import { Point } from "./DrawingShape";
import { ShapeMovement } from "./ShapeMovement";

export class CircleMovement extends ShapeMovement {
    updateMovement(drag: Point): boolean {
        throw new Error("Method not implemented.");
    }

}
import { Point } from "./DrawingShape";

export interface IMoveable {
    updateMovement(drag: Point): void;
}
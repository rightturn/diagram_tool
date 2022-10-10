import { Point } from "./Rectangle";

export interface IMoveable {
    updateMovement(drag: Point): void;
}
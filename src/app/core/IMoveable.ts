import { Point } from "./Rectangle";

export interface IMoveable {
    updateMovement(new_location:Point,drag:Point):void;
}
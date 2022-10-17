import { Circle, Circular } from "./Circle";
import { Point } from "./DrawingShape";

export class CircleList {

    private static instance?: CircleList = undefined;
    // public static moveableRectangle?: Rectangle = undefined;

    public circles: Circle[] = [];

    private constructor() { }

    public static getInstance(): CircleList {

        if (CircleList.instance == undefined) {
            CircleList.instance = new CircleList();
        }

        return CircleList.instance;

    }

    public moveActive(new_location: Point, drag: Point){
        this.circles.forEach(circle => {
            if(circle.isMoveable()){
                circle.updateMovement(new_location,drag);
            }
            // rect.updateResize(drag);
        });
    }

    public resize(new_location:Point){
        this.circles.forEach(circle => {
            circle.updateResize(new_location);
        });
    }

    public deactivateResize(){
        this.circles.forEach(circle => {
            circle.stopResizing();
        });
    }


    public add() {

        let circular: Circular = 
        {
            color: 'rgba(255,255,255)',
            x: 20,
            y: 30,
            diameter:100,
            id: this.getNextIdForRectangle()
        };

        this.circles.push(new Circle(circular));

    }

    private getNextIdForRectangle(): number {
        if (this.circles.length > 0) {
            return this.circles.length;
        }
        return 1;
    }
}
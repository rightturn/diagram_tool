
export abstract class DrawingShape {

    public x: number = 0;
    public y: number = 0;
    public id?: number;

    constructor(id: number, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

}
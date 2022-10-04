
export class Line {

    public line_border_size = 3;

    public lines: SimpleLine[] = [];

    public points: PositionPoint[] = [];
    public diameterCircle = 10;

    private activeLine?: SimpleLine;

    constructor() {

        this.lines = [
            {
                x0: 200,
                x1: 400,
                y0: 200,
                y1: 400
            }
        ];

    }

    click(event: Event, activeLine: SimpleLine) {
        console.log(event);
        this.activeLine = activeLine;
        this.setPositionPoint();
        console.log(this.points);
    }

    private setPositionPoint() {

        let start_x = this.activeLine!.x0 - this.diameterCircle / 2;
        let end_x = this.activeLine!.x1 - this.diameterCircle / 2;
        let start_y = this.activeLine!.y0 - this.diameterCircle / 2;
        let end_y = this.activeLine!.y1 - this.diameterCircle / 2;

        let start_point: PositionPoint = { x: start_x, y: start_y };
        let end_point: PositionPoint = { x: end_x, y: end_y };
        this.points = [];
        this.points.push(start_point)
        this.points.push(end_point)
    }

}

export interface SimpleLine {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}
export interface PositionPoint {
    x: number;
    y: number;
}
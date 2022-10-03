
export class Line {

    public line_x0 = 5;
    public line_y0 = 5;
    public line_x1 = 200;
    public line_y1 = 200;
    public line_border_size = 3;

    public lines: SimpleLine[] = [];

    constructor(){

        this.lines = [
            {
                x0: 10,
                x1: 200,
                y0: 10,
                y1: 200
            }
        ];

    }

}

export interface SimpleLine {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}

export class ResizingPoint {

    public points: ResizeablePoint[] = [];
}

export interface ResizeablePoint {
    x: number;
    y: number;
    label: ResizeablePointLabel;
}

interface BoxBoundaryCordinates {
    left_x: number;
    right_x: number;
    top_y: number;
    bottom_y: number;
}

enum ResizeablePointLabel {
    TOP = "top", BOTTOM = "bottom", LEFT = "left", RIGHT = "right"
}
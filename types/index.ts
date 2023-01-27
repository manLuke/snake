export type Snake = Coordinate[];

export type Coordinate = {
  x: number;
  y: number;
};

export type NewSnakePosition = { position: Coordinate; eaten: boolean, newD: number };

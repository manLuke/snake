type Snake = Coordinate[];

type Coordinate = {
  x: number;
  y: number;
};

type NewSnakePosition = { position: Coordinate; eaten: boolean, newD: number };

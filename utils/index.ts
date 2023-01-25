import { Snake, Coordinate, NewSnakePosition } from '../types';

export const getRandomCoordinates = (max: number) => {
  return {
    x: Math.floor(Math.random() * (max - 1)) + 1,
    y: Math.floor(Math.random() * (max - 1)) + 1,
  };
};

export const newFood = (snake: Snake, size: number): Coordinate => {
  const food = getRandomCoordinates(size);
  if (snake.some((s) => s.x === food.x && s.y === food.y)) {
    return newFood(snake, size);
  }
  return food;
};

export const newSnake = (size: number): Snake => {
  const snake: Snake = [];
  const middle = Math.floor(size / 2) + 1;
  for (let i = 0; i < 3; i++) {
    snake.push({ x: middle, y: middle + i });
  }
  return snake;
};

export const isCollision = (c: Coordinate, size: number) =>c.x <= 0 || c.x > size || c.y <= 0 || c.y > size;
export const isCollisionWithItself = (c: Coordinate, snake: Snake) => snake.some((s) => s.x === c.x && s.y === c.y);

export const isGoingBack = (direction: number, lastDirection: number) => {
  return (
    (direction === 0 && lastDirection === 2) ||
    (direction === 1 && lastDirection === 3) ||
    (direction === 2 && lastDirection === 0) ||
    (direction === 3 && lastDirection === 1)
  );
};

export const isEating = (snake: Snake, food: Coordinate): boolean => snake[0].x === food.x && snake[0].y === food.y;

export const moveSnake = (
  snake: Snake,
  food: Coordinate,
  direction: number
): NewSnakePosition => {
  const eaten = isEating(snake, food);
  const newPosition = {
    x: snake[0].x,
    y: snake[0].y,
  };

  switch (direction) {
    case 0:
      newPosition.y -= 1;
      break;
    case 1:
      newPosition.x += 1;
      break;
    case 2:
      newPosition.y += 1;
      break;
    case 3:
      newPosition.x -= 1;
      break;
  }

  return {
    position: newPosition,
    eaten,
  };
};


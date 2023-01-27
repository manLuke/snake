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

export const isCollision = (c: Coordinate, size: number) => c.x <= 0 || c.x > size || c.y <= 0 || c.y > size;
export const isCollisionWithItself = (coordinate: Coordinate, snake: Snake) => {
  // Check if the coordinate is inside the snake
  const isInsideSnake = snake.some((snakeCoordinate) => (snakeCoordinate.x === coordinate.x && snakeCoordinate.y === coordinate.y))
  // Check if the coordinate is not the head of the snake
  const isNotHead = !(snake[0].x === coordinate.x && snake[0].y === coordinate.y)
  // Check if the coordinate is not the tail of the snake
  const isNotTail = !(snake[snake.length - 1].x === coordinate.x && snake[snake.length - 1].y === coordinate.y)
  // Return true if the coordinate is inside the snake and not the head or the tail
  return isInsideSnake && isNotHead && isNotTail
}

export const isGoingBack = (direction: number, lastDirection: number) => {
  return (
    (direction === 0 && lastDirection === 2) ||
    (direction === 1 && lastDirection === 3) ||
    (direction === 2 && lastDirection === 0) ||
    (direction === 3 && lastDirection === 1)
  );
};

export const getFirstValidDirection = (directions: number[], lastDirection: number) => {
  for (let i = 0; i < directions.length; i++) {
    if (!isGoingBack(directions[i], lastDirection)) {
      return directions[i];
    }
  }
  return lastDirection;
}

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


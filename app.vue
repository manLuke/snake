<template>
  <div class="page">
    <nav class="navbar">
      <span>{{ `${score}/${record}` }}</span>
    </nav>
    <div class="snake-container" :style="{ '--size': cssSize }">
      <div v-for="x in size" class="snake-row" :key="x">
        <div v-for="y in size" class="snake-cell" :key="y"
          :class="{ 'snake-active': isSnake(x, y), 'snake-food': isFood(x, y) }"></div>
      </div>
    </div>
    <button class="btn-start" @click="startGame">Start</button>
  </div>
</template>

<script setup lang="ts">
import { Snake, Coordinate, NewSnakePosition } from './types'

const playing = ref(false)
const speed = ref(120)
const size = ref(25)

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

// some weird css to make the app responsive
const cssSize = computed(() => {
  if ((windowHeight.value - 100 ) < windowWidth.value) {
    return (windowHeight.value - 200) / (size.value + 1) + "px"
  }
  if (windowWidth.value < 800) {
    return windowWidth.value / (size.value + 1) + "px"
  } else {
    return 800 / size.value + "px"
  }
})

const record = ref(getRecord());
const score = ref<number>(0);

const d = getDirection()
const snake = ref<Snake>(newSnake(size.value))
const food = ref<Coordinate>()

const isSnake = (x: number, y: number) => snake.value.some((c) => c.x === x && c.y === y)
const isFood = (x: number, y: number) => food.value?.x === x && food.value?.y === y

const startGame = () => {
  if (playing.value) return;
  playing.value = true
  score.value = 0;
  d.value = 0;
  snake.value = newSnake(size.value)
  food.value = newFood(snake.value, size.value)
  play()
}

const endGame = () => {
  playing.value = false
  d.value = 99
  speed.value = 120
  if (setRecord(score.value)) {
    record.value = score.value;
  }
}

const play = async () => {
  const oldD = d.value;
  await new Promise((resolve) => setTimeout(resolve, speed.value))
  if (isGoingBack(d.value, oldD)) {
    d.value = oldD;
  }
  const { position, eaten } = moveSnake(snake.value, food.value!, d.value)
  if (isCollision(position, size.value) || isCollisionWithItself(position, snake.value)) {
    endGame()
    return
  } else if (eaten) {
    food.value = newFood(snake.value, size.value)
    score.value++;
    if (speed.value >= 22) {
      speed.value -= 2;
    }
    
  } else {
    snake.value.pop()
  }
  snake.value.unshift(position)
  window.requestAnimationFrame(play)
}

watch(
  () => d.value,
  () => {
    if (!playing.value && d.value !== 99) {
      startGame()
      playing.value = true
    }
  }
)

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })
})

</script>

<style lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #000;
}

.page {
  @include flex-center;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  gap: 20px;
}

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: rgba(255, 255, 255, 0.81);
  font-size: 1.5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1em;
}

.snake-container {
  @include flex-center;
  align-items: center;
  border: 3px solid #d40de2;
  margin-top: 5rem;
}

.snake-cell {
  @include flex-center;
  background-color: #000;
  text-align: center;
  width: var(--size);
  aspect-ratio: 1;
}

.snake-active {
  border: 1px solid #000;
  background-color: #32de00;
}

.snake-food {
  background-color: #ff0000;
}

.btn-start {
  @include flex-center;
  width: 100px;
  height: 50px;
  background-color: #000;
  color: rgba(255, 255, 255, 0.81);
  font-size: 1.5em;
  border: 2px solid #d40de2;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #fff;
  }
}

@media screen and (max-width: 800px) {
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
}
</style>
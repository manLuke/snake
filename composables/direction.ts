export const getDirection = () => {
  // up = 0, right = 1, down = 2, left = 3
  const d = ref<number>(99);
  let startX: number, startY: number;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        d.value = 1;
      } else {
        d.value = 3;
      }
    } else {
      if (diffY > 0) {
        d.value = 2;
      } else {
        d.value = 0;
      }
    }
  });

  window.onkeydown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        d.value = 0;
        break;
      case 'ArrowRight':
      case 'd':
        d.value = 1;
        break;
      case 'ArrowDown':
      case 's':
        d.value = 2;
        break;
      case 'ArrowLeft':
      case 'a':
        d.value = 3;
        break;
    }
  };

  return d;
};

export const getDirection = () => {
  // up = 0, right = 1, down = 2, left = 3
  const d = ref<number>(99);
  let startX: number, startY: number;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', (e) => {
    let newD: number;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        newD = 1;
      } else {
        newD = 3;
      }
    } else {
      if (diffY > 0) {
        newD = 2;
      } else {
        newD = 0;
      }
    }
    if (newD === undefined) return;
    if (isGoingBack(d.value, newD)) return;
    d.value = newD;
  });

  window.onkeydown = (e) => {
    let newD;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        newD = 0;
        break;
      case 'ArrowRight':
      case 'd':
        newD = 1;
        break;
      case 'ArrowDown':
      case 's':
        newD = 2;
        break;
      case 'ArrowLeft':
      case 'a':
        newD = 3;
        break;
    }
    if (newD === undefined) return;
    if (isGoingBack(d.value, newD)) return;
    d.value = newD;
  };

  return d;
};

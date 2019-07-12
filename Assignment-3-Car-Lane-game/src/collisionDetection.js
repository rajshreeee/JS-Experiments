export function collisionDetection(car1, car2) {
  if (
    car1.x < car2.x + car2.width &&
    car1.x + car1.width > car2.x &&
    car1.y < car2.y + car2.height &&
    car1.y + car1.height > car2.y
  ) {
    return true;
  } else {
    return false;
  }
}

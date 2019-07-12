import Car from "./car.js";
export function buildCarsArray(game) {
  setInterval(function() {
    game.carArray.push(new Car(game, false));
  }, 6000);
}


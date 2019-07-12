export default class InputHandler {
  constructor(car, game) {
    document.addEventListener("keydown", event => {
      //event occurs whenever a user presses a key
      switch (event.keyCode) {
        case 65:
          car.moveLeft();
          break;
        case 68:
          car.moveRight();
          break;
        case 32:
          game.start();
          break;
        case 27:
          game.pause();
          break;
        default:
        //pass
      }
    });
  }
}

export function InputHandler(game, cvs) {
  const startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29
  };
  cvs.addEventListener("click", event => {
    switch (game.gameState) {
      case game.GAMESTATE.gamePlay:
        game.bird.flyUp();
        break;
      case game.GAMESTATE.getReady:
        game.gameState = game.GAMESTATE.gamePlay;
        break;
      case game.GAMESTATE.gameOver:
        let rect = cvs.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;
        //check if we click on start button
        if (
          clickX >= startBtn.x &&
          clickX <= startBtn.x + startBtn.w &&
          clickY >= startBtn.y &&
          clickY <= startBtn.y + startBtn.h
        ) {
          game.restart();
          game.gameState = game.GAMESTATE.getReady;
        }
        break;
      default:
      //pass;
    }
  });
}

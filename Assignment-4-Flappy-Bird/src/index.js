import Game from "./game.js";
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let canvas2 = document.getElementById("gameScreen2");
let ctx2 = canvas2.getContext("2d");

const GAME_WIDTH = 320;
const GAME_HEIGHT = 480;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas);

let game2 = new Game(GAME_WIDTH, GAME_HEIGHT, canvas2);

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); /*clear our canvas */
  ctx2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update();
  game.draw(ctx);
  
  game2.update();
  game2.draw(ctx2);
}

gameloop();


import Game from './game.js';
let canvas = document.getElementById("carLine");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 900;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);


function gameloop() {
  let frame = requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); /*clear our canvas */
  
  game.update( frame);
  game.draw(ctx,canvas);
 
}

gameloop();

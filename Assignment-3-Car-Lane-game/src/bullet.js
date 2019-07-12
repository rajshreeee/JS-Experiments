export default class Bullet {
  constructor( car, carArray) {
    this.size = 16;
    this.x = car.x + car.width/2;
    this.y = 600;
    this.image = document.getElementById("bullet");
    this.speed = 2;
    this.carArray = carArray;
  }

  update() {
    this.y -= this.speed;
    }
  

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    //  console.log("draw");
  }
}

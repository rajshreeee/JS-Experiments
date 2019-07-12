export default class Background {
  constructor() {
    this.width = 900;
    this.height = 600;
    this.dy = 2;
    this.x = 0;
    this.y = 0;
    this.image = document.getElementById("road");
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  update() {
 
    this.y = (this.y + this.dy) % (this.height / 2);
  }
}

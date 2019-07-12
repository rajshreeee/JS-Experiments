export default class Foreground {
  constructor(gameHeight) {
    this.sourceX = 276;
    this.sourceY = 0;
    this.width = 224;
    this.height = 112;
    this.x = 0;
    this.gameHeight = gameHeight;
    this.y = this.gameHeight - this.height;
    this.dx = 5;
    this.image = document.getElementById("sprite");
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.drawImage(
      this.image,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.x = (this.x - this.dx) % (this.width / 2);
  }
}

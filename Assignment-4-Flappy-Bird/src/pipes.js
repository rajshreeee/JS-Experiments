export default class Pipe {
  constructor() {
    this.top = {
      //for top pipe
      sourceX: 553,
      sourceY: 0
    };

    this.bottom = {
      sourceX: 502,
      sourceY: 0
    };

    this.width = 53;
    this.height = 400;
    this.gap = 85;
    this.dx = 2;
    this.image = document.getElementById("sprite");
    this.frames = 0;
  }
  draw(ctx, pipeArray) {
    let position = pipeArray;
    for (let i = 0; i < position.length; i++) {
      let p = position[i];
      let topYPos = p.y;
      let bottomYPos = p.y + this.height + this.gap;
      ctx.drawImage(
        this.image,
        this.top.sourceX,
        this.top.sourceY,
        this.width,
        this.height,
        p.x,
        topYPos,
        this.width,
        this.height
      );

      ctx.drawImage(
        this.image,
        this.bottom.sourceX,
        this.bottom.sourceY,
        this.width,
        this.height,
        p.x,
        bottomYPos,
        this.width,
        this.height
      );
    }
  }
}

export class Home {
  constructor({ ctx, canvas, mouse }) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = mouse.x;
    this.y = mouse.y;

    this.backgroundImage = new Image();
    this.backgroundImage.src = "images/home.png";

    this.statusImage = new Image();
    this.statusImage.src = "images/status.png";
  }
  update() {
    console.log("update");
  }
  draw(ctx) {
    ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    ctx.drawImage(this.statusImage, 600, 50, 350, 300);

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";

    // 텍스트 그리기
    ctx.fillText("텍스트: 10/100", this.canvas.width - 400, 200);
  }
}

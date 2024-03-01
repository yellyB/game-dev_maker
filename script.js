import { Home } from "./pages/index.js";
import { clearCanvas } from "./utils.js";
import { schedules } from "./data.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const button = document.getElementsByClassName("execute_schedule_button");

canvas.width = 1000;
canvas.height = 700;

const mouse = {
  x: undefined,
  y: undefined,
};

const canvasRect = canvas.getBoundingClientRect();

const home = new Home({ ctx, canvas, mouse });

const animate = () => {
  home.draw(ctx);

  //   clearCanvas({ ctx, canvas });
  requestAnimationFrame(animate);
};

const handleClickAction = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
};

const handleMoveAction = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
};

const handleReleaseAction = () => {};

canvas.addEventListener("mousedown", (e) => handleClickAction(e));
canvas.addEventListener("mousemove", (e) => handleMoveAction(e));
canvas.addEventListener("mouseup", () => handleReleaseAction());

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  e.x = e.changedTouches[0].pageX;
  e.y = e.changedTouches[0].pageY;
  handleClickAction(e);
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  e.x = e.changedTouches[0].pageX;
  e.y = e.changedTouches[0].pageY;
  handleMoveAction(e);
});
canvas.addEventListener("touchend", () => handleReleaseAction());

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

animate();

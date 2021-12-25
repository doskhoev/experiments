const MAX_RADIUS = 7;
const MIN_RADIUS = 3;

const MIN_WEIGHT = MIN_RADIUS ** 3;
const MAX_WEIGHT = MAX_RADIUS ** 3;

const MAX_COUNT_OF_FLAKES = 1000;

window.onload = function () {
  const canvas = document.getElementById("my_canvas");
  const ctx = canvas.getContext("2d");

  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const flakes = [];

  for (let i = 0; i < MAX_COUNT_OF_FLAKES; i++) {
    flakes.push({
      x: (H + W) * Math.random(),
      y: H * Math.random(),
      w: MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * Math.random(),
    });
  }

  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < MAX_COUNT_OF_FLAKES; i++) {
      const f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.w ** 0.33, 0, 2 * Math.PI, true);
    }
    ctx.fill();
    moveFlakes();
  }

  let angle = 0;
  function moveFlakes() {
    angle += 0.01;
    for (let i = 0; i < MAX_COUNT_OF_FLAKES; i++) {
      const f = flakes[i];
      const k = f.w / MAX_WEIGHT;
      f.y += 2 * k;
      f.x -= (1 + Math.sin(angle)) * k;

      if (f.y > H + MAX_RADIUS) {
        flakes[i] = {
          ...f,
          x: (H + W) * Math.random(),
          y: 0,
        };
      }
    }
  }

  setInterval(drawFlakes, 20);
};

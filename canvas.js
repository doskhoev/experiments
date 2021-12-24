const MAX_RADIUS = 5;
const MIN_RADIUS = 2;
const MAX_COUNT_OF_FLAKES = 2000;

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
      x: 1.5 * W * Math.random(),
      y: H * Math.random(),
      r: MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * Math.random(),
      d: 1 + Math.random(),
    });
  }

  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < MAX_COUNT_OF_FLAKES; i++) {
      const f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI, true);
    }
    ctx.fill();
    moveFlakes();
  }

  let angle = 0;
  function moveFlakes() {
    angle += 0.01;
    for (let i = 0; i < MAX_COUNT_OF_FLAKES; i++) {
      const f = flakes[i];
      f.y += Math.pow(f.d, 2);
      // f.x += ((1 + Math.sin(angle)) * f.d) / MAX_RADIUS;
      f.x -= f.d / 2 + Math.sin(angle);

      if (f.y > H + MAX_RADIUS) {
        flakes[i] = {
          ...f,
          x: 1.5 * W * Math.random(),
          y: 0,
        };
      }
    }
  }

  setInterval(drawFlakes, 20);
};

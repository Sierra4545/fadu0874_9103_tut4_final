let audio, fft;
let circles = [];
let circleCount = 40;
let layersPerCircle = 8;
let particlesPerLayer = 40;
let circleRadius = 100;
let circleSpacing = 400;
let layoutAngle = 7;

let pearlSize = 15;
let vineThickness = 4;

// Preload the audio file before setup
function preload() {
  audio = loadSound('Wind_In_leaves.mp3');
}

function setup() {
  // Create a canvas that matches the window size
  createCanvas(windowWidth, windowHeight);
  background("#02212f");

  // Initialize the FFT analyzer
  fft = new p5.FFT();
  fft.setInput(audio);

  // Initialize the circle objects
  initCircles();
  noLoop(); // No loop by default, animation starts with mouse interaction
}

function draw() {
  // Set background color for every frame
  background("#055376");

  // Get the frequency spectrum data
  let spectrum = fft.analyze();

  // Use spectrum data to adjust the size of the circles
  for (let i = 0; i < circles.length; i++) {
    let energy = spectrum[i % spectrum.length];
    let sizeFactor = map(energy, 0, 255, 0.5, 2);
    circles[i].show(sizeFactor); // Adjust circle size according to frequency energy
  }
}

// Control the audio playback with mouse press
function mousePressed() {
  if (audio.isPlaying()) {
    audio.pause();
    noLoop();
  } else {
    audio.play();
    loop();
  }
}

// Initialize the circles in a staggered grid pattern
function initCircles() {
  let angleRad = radians(layoutAngle);
  let xStep = circleSpacing * cos(angleRad);
  let yStep = circleSpacing * sin(angleRad);

  let cols = Math.ceil(width / xStep) + 2;
  let rows = Math.ceil(height / yStep) + 4;

  let startX = -circleRadius;
  let startY = -circleRadius;

  // Generate circles in a grid-like structure
  for (let row = 0; row < rows; row++) {
    let offsetX = (row % 2) * (xStep / 2);

    for (let col = 0; col < cols; col++) {
      let x = startX + col * xStep + offsetX;
      let y = startY + row * (yStep * 2.3);

      // Only add circles that are within canvas bounds
      if (x >= -circleRadius && x <= width + circleRadius &&
          y >= -circleRadius && y <= height + circleRadius) {
        circles.push(new Circle(x, y, circleRadius, layersPerCircle, particlesPerLayer));
      }
    }
  }
}

// Circle class defines each circle object
class Circle {
  constructor(x, y, radius, numLayers, particlesPerLayer) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.particles = [];
    this.concentricCircles = [];
    this.rays = [];

    // Randomly assign a background color for the circle
    this.backgroundColor = random(0, 10) >= 3 ? color(255, 255, 255) : color(random(100, 255), random(100, 255), random(100, 255));

    this.showParticle = random(0, 10) >= 2; // Determine if particles should be displayed

    this.initConcentricCircles(); // Initialize concentric circles
    this.initParticles(numLayers, particlesPerLayer); // Initialize particles
    this.initRays(); // Initialize rays

    this.hexagonPoints = this.calculateHexagonPoints(); // Calculate the points for a hexagon frame
  }

  // Calculate hexagon vertex points for drawing
  calculateHexagonPoints() {
    let points = [];
    for (let i = 0; i < 8; i++) {
      let angle = TWO_PI / 8 * i - PI / 8; // Start from top right, counter-clockwise
      let px = this.x + cos(angle) * (this.radius) * 1.2;
      let py = this.y + sin(angle) * (this.radius) * 1.2;
      points.push({x: px, y: py});
    }
    return points;
  }

  // Draw vine edges between two points, with a wavy effect
  drawVineEdge(start, end) {
    let distance = dist(start.x, start.y, end.x, end.y);
    let steps = floor(distance / 10);

    push();
    strokeWeight(vineThickness);
    stroke(150, 180, 180);  //change vine into gray
    noFill();

    beginShape();
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = lerp(start.x, end.x, t);
      let y = lerp(start.y, end.y, t);

      // Add waviness to the connecting line
      let perpX = -(end.y - start.y) / distance;
      let perpY = (end.x - start.x) / distance;
      let amp = 4 * sin(t * PI); // Amplitude
      let freq = 4; // Frequency

      x += perpX * amp * sin(t * TWO_PI * freq);
      y += perpY * amp * sin(t * TWO_PI * freq);

      curveVertex(x, y);
    }
    endShape();
    pop();
  }

  // Draw the hexagon frame with vine edges and pearls at vertices
  drawHexagonFrame() {
    for (let i = 0; i < 8; i++) {
      let start = this.hexagonPoints[i];
      let end = this.hexagonPoints[(i + 1) % 8];
      this.drawVineEdge(start, end);
    }

    // Draw pearls at the vertices
    for (let point of this.hexagonPoints) {
      fill(255); // White pearl
      noStroke();
      ellipse(point.x, point.y, pearlSize);

      // Pearl highlight
      fill(255, 255, 255, 200);
      noStroke();
      ellipse(point.x - pearlSize/4, point.y - pearlSize/4, pearlSize/3);
    }
  }

  // Initialize concentric circles inside each circle
  initConcentricCircles() {
    let numCircles = Math.ceil(random(1,8));
    let colors = [
      color(255, 100, 100),
      color(100, 255, 100),
      color(100, 100, 255),
      color(255, 255, 100),
      color(255, 100, 255),
      color(100, 255, 255),
      color(255, 150, 50),
      color(150, 50, 255)
    ];

    // Create concentric circles from outer to inner
    for (let i = 0; i < numCircles; i++) {
      let radius = map(i, 0, numCircles - 1, this.radius * 0.8, this.radius * 0.1);
      let col = colors[i % colors.length];
      this.concentricCircles.push({
        radius: radius * 1.3,
        color: col,
        strokeWeight: map(i, 0, numCircles - 1, 4, 1)
      });
    }
  }

  // Initialize particles for each circle layer
  initParticles(numLayers, particlesPerLayer) {
    let layerColor = color(random(100, 255), random(100, 255), random(100, 255));
    for (let layer = 0; layer < numLayers; layer++) {
      let layerRadius = (this.radius / numLayers) * (layer + 1);

      for (let i = 0; i < particlesPerLayer; i++) {
        let angle = (TWO_PI / particlesPerLayer) * i;
        let dist = layerRadius;
        let size = map(layer, 0, numLayers - 1, 4, 12) * random(0.8, 1.2);

        this.particles.push(new Particle(this.x, this.y, angle, dist, layerColor, size));
      }
    }
  }
  
  // Initialize rays originating from the circle
  initRays() {
    let numRays = 60;
    let rayLength = this.radius;
    for (let i = 0; i < numRays; i++) {
      let angle = (TWO_PI / numRays) * i;
      let innerRadius = this.radius * 0.4;
      let outerRadius = innerRadius + rayLength * 0.6;
      this.rays.push({
        angle: angle,
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        color: color(random(200, 255), random(100, 200), 50)
      });
    }
  }

  // Show the circle, drawing all of its components
  show(sizeFactor) {
    this.drawBackground();

    if (!this.showParticle) {
      // Draw rays if particles are not displayed
      for (let ray of this.rays) {
        stroke(ray.color);
        strokeWeight(2);
        let x1 = this.x + cos(ray.angle) * ray.innerRadius;
        let y1 = this.y + sin(ray.angle) * ray.innerRadius;
        let x2 = this.x + cos(ray.angle) * ray.outerRadius;
        let y2 = this.y + sin(ray.angle) * ray.outerRadius;
        line(x1, y1, x2, y2);
      }
    } else {
      // Draw particles if enabled
      for (let p of this.particles) {
        p.show(sizeFactor);
      }
    }

    // Draw concentric circles
    for (let circle of this.concentricCircles) {
      fill(circle.color);
      strokeWeight(circle.strokeWeight);
      stroke(255, 100);
      ellipse(this.x, this.y, circle.radius);
    }

    // Draw hexagon frame at the end
    this.drawHexagonFrame();
  }

  // Draw the circle's background
  drawBackground() {
    fill(this.backgroundColor);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2.1);
  }
}

// Particle class defines each particle
class Particle {
  constructor(cx, cy, angle, dist, col, size) {
    this.cx = cx;
    this.cy = cy;
    this.angle = angle;
    this.dist = dist;
    this.col = col;
    this.size = size;
  }
  // Display the particle with the size affected by sizeFactor and rotates
  show(sizeFactor) {
    this.angle += 0.01; // Particle rotates over time
    let px = this.cx + cos(this.angle) * this.dist;
    let py = this.cy + sin(this.angle) * this.dist;

    fill(this.col);
    noStroke();
    ellipse(px, py, this.size * sizeFactor, this.size * sizeFactor);
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circles = [];
  initCircles(); // Reinitialize circles on resize
  redraw();
}

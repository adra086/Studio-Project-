let neurons = [];
let numNeurons = 50;
let connectionCounts = {};
let neuronConnections = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numNeurons; i++) {
    neurons.push(new Neuron(random(width), random(height)));
    neuronConnections[i] = 0;
  }
}

function draw() {
  background(20, 20, 30, 50);
  
  for (let neuron of neurons) {
    neuron.update();
    neuron.show();
  }
  
  connectionCounts = {};
  for (let i = 0; i < neurons.length; i++) {
    for (let j = i + 1; j < neurons.length; j++) {
      let d = dist(neurons[i].x, neurons[i].y, neurons[j].x, neurons[j].y);
      if (d < 100) {
        let key = `${i}-${j}`;
        if (!connectionCounts[key]) {
          connectionCounts[key] = 1;
        } else {
          connectionCounts[key]++;
        }
        
        neuronConnections[i]++;
        neuronConnections[j]++;
        
        let thickness = map(connectionCounts[key], 1, 10, 1, 4);
        strokeWeight(thickness);
        stroke(255, 20, 147, map(d, 0, 100, 255, 50));
        line(neurons[i].x, neurons[i].y, neurons[j].x, neurons[j].y);
        
        if (!neurons[i].isDeactivated && neuronConnections[i] > 3) {
          neurons[i].firePulse();
        }
        if (!neurons[j].isDeactivated && neuronConnections[j] > 3) {
          neurons[j].firePulse();
        }
      }
    }
  }
}

class Neuron {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.baseSize = random(4, 8);
    this.size = this.baseSize;
    this.baseColor = color(138, 43, 226);
    this.isFiring = false;
    this.isDeactivated = false;
    this.fireTime = 0;
    this.deactivateTime = 0;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 10 || this.x > width - 10) this.vx *= -1;
    if (this.y < 10 || this.y > height - 10) this.vy *= -1;
    
    let connectionSizeBoost = map(neuronConnections[neurons.indexOf(this)], 0, 10, 0, 10);
    this.size = constrain(this.baseSize + connectionSizeBoost, 4, 20);
    
    if (this.isFiring && millis() - this.fireTime > 200) {
      this.isFiring = false;
      this.isDeactivated = true;
      this.deactivateTime = millis();
    }
    
    if (this.isDeactivated && millis() - this.deactivateTime > 1000) {
      this.isDeactivated = false;
    }
  }
  
  show() {
    if (this.isDeactivated) {
      fill(75, 0, 130);
    } else if (this.isFiring) {
      fill(255, 105, 180);
    } else {
      fill(this.baseColor);
    }
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
  
  firePulse() {
    this.isFiring = true;
    this.fireTime = millis();
  }
}

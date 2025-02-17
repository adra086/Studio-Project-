# Studio Project - Neural Simulation with Interactive Floating Neurons #
Link to Repository: (https://adra086.github.io/Studio-Project-/)

## Overview ##

This project is a neural network-inspired simulation built using p5.js, where floating neurons can connect dynamically based on proximity. 
Users can click to generate new neurons, drag to move them, and observe automatic, rule-based connections forming between neurons. 
This project explores interactive computational art through principles of biological neural networks, movement, and connectivity.

## Features ##

> Floating Neurons: Neurons move randomly within the canvas, simulating biological activity.

> Connection Formation: Neurons form connections when they are within 100 pixels of each other.

> Dynamic Size Changes: Neurons grow or shrink based on how many active connections they have.

> User Interaction: Clicking the canvas creates new neurons, and dragging allows user-directed movement.

> Firing & Deactivation: Neurons that exceed 3 connections "fire" (turn pink) and enter a temporary deactivated state.

> Real-time Visual Updates: Connections are animated with thickness and color adjustments to reflect their strength.

## How It Works ##

### Neuron Creation & Movement ###

``` javascript
function mousePressed() {
  let newNeuron = new Neuron(mouseX, mouseY);
  neurons.push(newNeuron);
  draggingNeuron = newNeuron;
}

When the user clicks on the canvas, a new neuron is added at the cursor position. The neuron is immediately set as draggingNeuron, allowing for direct movement.

function mouseDragged() {
  if (draggingNeuron) {
    draggingNeuron.x = mouseX;
    draggingNeuron.y = mouseY;
  }
}
```

If the mouse is dragged while holding a neuron, it will follow the cursor, allowing users to position neurons dynamically.

### Connectivity ###

``` javacsript
for (let i = 0; i < neurons.length; i++) {
  for (let j = i + 1; j < neurons.length; j++) {
    let d = dist(neurons[i].x, neurons[i].y, neurons[j].x, neurons[j].y);
    if (d < 100) {
      line(neurons[i].x, neurons[i].y, neurons[j].x, neurons[j].y);
    }
  }
}
```

Neurons automatically form connections with other neurons if they are less than 100 pixels apart.

### Dynamic Size Scaling ###

``` javacscript
if (index in neuronConnections) {
  let numConnections = neuronConnections[index];
  this.size = constrain(map(numConnections, 0, 5, this.minSize, this.maxSize), this.minSize, this.maxSize);
}
```

Each neuron dynamically grows and shrinks based on how many connections it has at any moment. A neuron with 0 connections is the smallest, while one with 5 or more connections reaches max size.

### Firing and Deactivation ###

``` javacsript
if (!neurons[i].isDeactivated && neuronConnections[i] > 3) {
  neurons[i].firePulse();
}
```

If a neuron has more than 3 connections, it fires, changing color temporarily before entering a deactivated period.

## Setup Instructions ##

- Click anywhere on the canvas to generate new neurons.

- Drag neurons to reposition them and watch the network evolve.

Screenshot: 
![image](https://github.com/user-attachments/assets/3d5d64c3-ed73-44b6-9368-23d00a8a8831)
This image shows how neurons with no connections are the smallest size and how the ones with more connections become larger.
It also aims to depict the refractory period which is set at 1 second, showing that after connection there is a 1 second period in which neurons are 'desensitised' to connection. 

## Learning Process & References ## 

This project was developed with inspiration from:

  - The Coding Train: Introduction to p5.js - https://www.youtube.com/watch?v=8j0UDiN7my4 
      Helped with setting up the basic canvas, draw loops, and rendering logic in p5.js.

  - Coding Train: Forces and Steering Behaviors - https://www.youtube.com/watch?v=4hA7G3gup-4
      Guided the design of random movement for neurons, making them feel more organic and dynamic.
      
  - Daniel Shiffman: Interactive Particle Systems - https://www.youtube.com/watch?v=YcdldZ1E9gU
      Helped conceptualize neurons as particles that interact based on spatial proximity.

  - p5.js Official Documentation - https://p5js.org/reference/
      Frequently used to understand how specific functions (e.g., dist(), map(), constrain()) work.
  - 
      
### Future Improvements ###

> Synaptic Weighting: Adjusting connection strengths based on activity levels.

> More Interactivity: Allow users to "activate" neurons to create chain reactions.

> Sound or Data Integration: Experimenting with audio-reactive neurons or using real-world datasets.

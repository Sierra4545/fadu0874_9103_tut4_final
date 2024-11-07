# fadu0874_9103_tut4_final

# Circle Animation Visualization

## How to Interact with the Animation

Click on the screen to play or pause the animation. The animation will respond to the audio frequency and adjust accordingly.

## My Personal Approach to the Animation Group Code

My animation responds to audio input by transforming circular elements with concentric circles, rays, and particles based on the audio spectrum.

## Driving Factor: Audio

I used **audio** as the driving factor, and the animation changes based on real-time analysis of the audio frequencies using the p5.js `FFT` analyzer.

## Animated Properties and Differences

- The **frequency spectrum** drives the animation, affecting the following properties:
  - **Size**: Circles change size based on audio amplitude.
  - **Concentric Circles**: Layers with unique colors and radii react to the audio.
  - **Particles and Rays**: Some circles feature particles and rays, creating diversity compared to others in the group.

## Animation Inspiration

Inspired by **sound wave visualizations** and **kaleidoscope effects**. The animation aims to reflect the rhythmic beauty of sound as ripples in water.

## Technical Description of My Animation

The animation uses **p5.js** and **p5.FFT()** to extract frequency data. Circles are animated with concentric circles, rays, and particles that react to the audio energy levels.

## Changes to Group Code

- **Refactored Circle Class** to include rays and concentric circles.
- **Added Audio Interactivity** to make the animation respond to audio in real-time.

## Additional Tools and Techniques

Used **FFT analysis** from p5.js to create a dynamic response to audio. Consulted the [p5.js Sound Library Reference](https://p5js.org/reference/#/p5.FFT) to understand and use FFT effectively.

## Conclusion

My animation combines concentric circles, rays, and particles to create a dynamic sound visualization, providing a unique and immersive experience.


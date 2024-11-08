# Circle Animation

## How to Interact with the Animation
**Mouse Interaction**: Click anywhere on the page to play the music and see the animation. Clicking again will pause both the music and the animation.

## Personal Animation Implementation
### Animation Driving Method：**audio** 
I used FFT analysis from p5.js to analyze the audio spectrum in real time, driving the size of particles and the colors of the vines accordingly.

### Animation Properties and Changes
**Size Variation**: The size of the particles scales changes because of audio frequency.
**Rotation**: The particles rotate around concentric circles.
**Uniqueness**: Compared to the works of my team members, the particles rotating around the center and the particles' size changing with the music are unique.

### Inspiration and References
**Source of Inspiration**: I drew inspiration from the works of Robert Delaunay and Wassily Kandinsky. Wassily Kandinsky was a Russian painter. He is a pioneers of abstraction in western art. Robert Delaunay was a French artist. They draw abstract circles. And the nested circles in their art evoke a sense of movement and floating rotation. And I thought about a kaleidoscope. I aimed to create a kaleidoscopic wheels with elements rotating. In the circle the particles is growing.As for music I chose a wind chime music.
  
  ![Rythme n°2, 1938 by Robert Delaunay](/assets/Rythme%20n°2.png)
  ![Several Circles,1926 by Wassily Kandinsky](/assets/1926.png)
  ![Farbstudie Quadrate, 1913 by Wassily Kandinsky](/assets/Color%20study.png)

## Technical Details and Explanations
**p5.js Animation Generation**: Using p5.FFT to analyze audio signals, I converted the spectrum data into visual attributes for the animation. The `fft.analyze()` function is used to retrieve real-time spectrum information.
**Spectrum-Driven Animation**: With the spectrum data provided by p5.FFT, I mapped the frequency energy values to various visual attributes, such as particle size and vine color. Using the `map()` function, the spectrum energy (0-255) was mapped to a suitable range for the animation effects. The spectrum data was used to adjust the size of each Particle. The `show(sizeFactor)` method takes in a size factor that determines the size of each Particle. The value of `sizeFactor` depends on the audio energy of each frequency band, making the Particles react to the rhythm of the audio.
**Other**: In the `mousePressed()` function, I implemented a mouse click to control the playback and pause state of the audio. I also modified the particle rotation.
**External Tools and References**: 
Shiffman, D. [The Coding Train]. (2016). 17.11: Sound visualization: Frequency analysis with FFT - p5.js sound tutorial [Video]. YouTube. https://www.youtube.com/watch?v=2O3nm0Nvbi4
Kandinsky, W. (1913). Color study: Squares with concentric circles.https://www.wassily-kandinsky.org/Farbstudie-Quadrate.jsp
Delaunay, R. (1938). Rythme n°2, décoration pour le salon des Tuileries [Oil on canvas]. https://commons.wikimedia.org/wiki/File:Robert_Delaunay_-_Rythme_n%C2%B02,_d%C3%A9coration_pour_le_salon_des_Tuileries_-_1938_-_Mus%C3%A9e_d%27art_moderne_de_la_Ville_de_Paris.jpg
Kandinsky, W. (1926)Several Circles,https://www.wikidata.org/wiki/Q3609042
# Patch Library

This repo contains (most of) the front-end code for the [patch-library.net](https://patch-library.net) website. *(where you can find, create and share the coolest patches for your semi-modular synthesizer :)*

This is the place to be if you want to add a new instrument to the patch-library.net website. You are welcome to contribute and I will gladly accept new submissions and help you along the way. Anyone with a little JavaScript and image editing experience should be able to participate.

## Setup

Download this repo and install the necessary JS packages:

`npm install`

Start the application:

`npm run start:dev`

Visit [localhost:8080](http://localhost:8080/) in your browser and you should see the Behringer Neutron.

## How to add a new instrument

Adding a new instrument all boils down to:

  * Finding a good front-panel image (render > photo).
  * Cut out knobs, switches etc.
  * Determine all the *exact* positions of those knobs, switches and connectors (and give them a proper name).

More detailed:

  1. Download this repo and create a new branch for your instrument.
  2. Find a good frontpanel image on the web. For the Neutron I used a rendered image from a brochure pdf, worked out better than the Moog images/photos that were picked from a google image search. Most front panel images on the website have a width of about 1600px, sometimes less. Save it as a PNG file, but try to keep the filesize at about 500Kb, you may have to reduce quality here.
  3. Cut out images of all the (distinct) knobs, buttons and switches. I use paint.net on windows for this (rest of development is on linux) but anything goes. Sometimes the angle of a knob must be corrected to point to the 0 position. Some switches need separate image for all positions. These images tend to look better if they are cut from the high-quality front-panel image and are saved at the highest quality. Also, if the image is a photo, the knobs in the middle of the image work best, less slant.
  4. Create a new JS file for your instrument, it must be a subclass of front-panel.js. This FrontPanel base class knows how to render buttons, knobs, connectors, etc, but you have to define all the settings for your instrument in your subclass. It can help to copy the code of an existing instrument (like the DFAM, but anything goes) and wipe all connector and knob positions to get a good, clean starting point.
  5. Add your device to `js/front-panels.js` and alter the canvas properties in `index.html`. Set the width and height to the dimensions of your front-panel image.
  6. In this new class, you have to define types, positions and names (and sometimes a bit more) for all the buttons, knobs, connectors, perhaps lights. THIS IS THE MOST LABORIOUS STEP! It involves estimating the position for the next knob, correcting that (and again), give it a proper name (a manual can help), make sure it looks good. Rinse and repeat.
  7. Sometimes a device has a type of switch/button that needs more work, like on the Neutron where the osc shape lights are controlled by a knob. The FrontPanel base class can handle most things and provides some callbacks for your device to do new things.
  8. Sometimes your device does something that the FrontPanel class can not do yet. Contact me if you're stuck or want to implement new features.
  9. Create a pull request and I will review it. If you are insure or just stuck: just push it and we'll figure it out.
  10. Your new instrument will be added to the patch-library website.

## Help!

If you have questions or got stuck at any point, please do not hesitate to contact me (zwippie at gmail dot com).

## License

MIT License

Copyright (c) 2019 Arnold van der Meulen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

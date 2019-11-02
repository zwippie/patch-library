import { FrontPanel } from "./front-panel"

const CANVAS_WIDTH = 1786;
const CANVAS_HEIGHT = 966;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
  {idx: 0, col: 0, row: 6, x: 206, y: 682, name: "CLK IN", input: true},
  {idx: 1, col: 0, row: 7, x: 513, y: 802, name: "SEQ CV OUT", input: false}
];
const KNOBS = [
  {idx: 1, x: 206, y: 82, type: "small", name: "SEQ 1"},
  {idx: 2, x: 206, y: 202, type: "small", name: "SEQ 2"},
  {idx: 3, x: 206, y: 322, type: "small", name: "SEQ 3"},
  {idx: 4, x: 206, y: 442, type: "small", name: "LFO RATE"},
]
const KNOB_TYPES = {
  small: {radius: 55, limit: 304}
}
const TOGGLES = [
  {idx: 0, x: 206, y: 562, type: "horizthree", name: "SEQ STEPS"}
]
const TOGGLE_TYPES = {
  horiztwo: {values: ["left", "right"]},
  horizthree: {values: ["left", "centerhor", "right"]},
  verttwo: {values: ["up", "down"]},
  vertthree: {values: ["up", "center", "down"]}
}
// Dimensions are way off because some of these switches are rotated
// and the hitdetection is wrongly based an a circle instead of square.
const TOGGLE_WIDTH = 63
const TOGGLE_HEIGHT = 73

const initialKnobValues = function() {
  let knobValues = Array(29).fill(150)
  // These range and waveform knobs are actually limited to certain values. Ignore that now...
  knobValues[5] = 160
  knobValues[6] = 160
  knobValues[7] = 160

  knobValues[10] = 160
  knobValues[11] = 160
  knobValues[12] = 160

  return knobValues
}

export class EricaPicoIII extends FrontPanel {
  constructor() {
    super({
      deviceName: "erica-pico-iii",
      canvasWidth: CANVAS_WIDTH,
      canvasHeight: CANVAS_HEIGHT,
      connectors: CONNECTORS,
      connectorOptions: {
        cellRadius: CELL_RADIUS,
        cableWidth: CABLE_WIDTH
      },
      knobs: KNOBS,
      knobTypes: KNOB_TYPES,
      toggles: TOGGLES,
      toggleOptions: {
        types: TOGGLE_TYPES,
        width: TOGGLE_WIDTH,
        height: TOGGLE_HEIGHT
      },
      initialValues: {
        knobValues: initialKnobValues(),
        toggleValues: Array(19).fill(0)
      },
      images: {
        panel: "/images/pico-iii/pico-iii-front.png",
        knobs: {
          small: "/images/pico-iii/pico-iii-knob-small.png"
        },
        toggles: {
          up: "/images/pico-iii/pico-iii-switch-up.png",
          down: "/images/pico-iii/pico-iii-switch-down.png",
          right: "/images/pico-iii/pico-iii-switch-right.png",
          left: "/images/pico-iii/pico-iii-switch-left.png",
          center: "/images/pico-iii/pico-iii-switch-center.png",
          centerhor: "/images/pico-iii/pico-iii-switch-center-hor.png"
        }
      }
    })
  }

}

import { FrontPanel } from "./front-panel"

//
// Some constants for locations of knobs and connectors, etc.
//
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 710;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
  //inputs
  //row 1
  {idx: 0, col: 0, row: 0, x: 1466, y: 86, name: "VCO1 CV", input: true},
  {idx: 1, col: 1, row: 0, x: 1539, y: 86, name: "GATE", input: true},
  //row 2
  {idx: 2, col: 0, row: 1, x: 1466, y: 160, name: "VCO2 CV", input: true},
  {idx: 3, col: 1, row: 1, x: 1539, y: 160, name: "VCO2 Fc", input: true},
  {idx: 4, col: 2, row: 1, x: 1609, y: 160, name: "VCF Q", input: true},
  {idx: 5, col: 3, row: 1, x: 1681, y: 160, name: "EXT AUDIO", input: true},
  {idx: 6, col: 4, row: 1, x: 1752, y: 160, name: "VCA CV", input: true},

  //outputs
  //row 1
  {idx: 7, col: 2, row: 0, x: 1609, y: 86, name: "KB CV", input: false},
  {idx: 8, col: 3, row: 0, x: 1681, y: 86, name: "GATE", input: false},
  {idx: 9, col: 4, row: 0, x: 1752, y: 86, name: "ADSR", input: false},
  {idx: 10, col: 5, row: 0, x: 1824, y: 86, name: "AR", input: false},
  //row 2
  {idx: 11, col: 5, row: 1, x: 1824, y: 160, name: "PHONES", input: false},
  {idx: 12, col: 6, row: 1, x: 1895, y: 160, name: "MAIN OUT", input: false}

]
const KNOBS = [
  {idx: 0, x: 523, y: 127, type: "large", name: "VCO1 FREQUENCY FINE"},
  {idx: 1, x: 646, y: 127, type: "large", name: "VCO1 FREQUENCY COARSE"},
  {idx: 2, x: 523, y: 379, type: "large", name: "VCO1 OSC MOD DEPTH1"},
  {idx: 3, x: 646, y: 379, type: "large", name: "VCO1 OSC MOD DEPTH2"},
  {idx: 4, x: 768, y: 379, type: "large", name: "VCO1 PULSE WIDTH"},
  {idx: 5, x: 939, y: 127, type: "large", name: "VCO2 FINE"},
  {idx: 6, x: 939, y: 379, type: "large", name: "VCO2 OSC MOD DEPTH1"},
  {idx: 7, x: 1062, y: 379, type: "large", name: "VCO2 OSC MOD DEPTH2"},
  {idx: 8, x: 1355, y: 127, type: "large", name: "KEYBOARD CONTROL"},
  {idx: 9, x: 1231, y: 379, type: "large", name: "VCF MOD DEPTH1"},
  {idx: 10, x: 1354, y: 379, type: "large", name: "VCF MOD DEPTH1"},
  {idx: 11, x: 1885, y: 379, type: "large", name: "VCA"}
]
const KNOB_TYPES = {
  large: {radius: 38, limit: 303}
}
const TOGGLES = [
  {idx: 0, x: 171, y: 521, type: "threeway", name: "OCTAVE SHIFT"},
  {idx: 1, x: 755, y: 102, type: "threeway", name: "KEYBOARD CONTROL"},
  {idx: 2, x: 511, y: 229, type: "threeway", name: "VCO1 WAVEFORM1"},
  {idx: 3, x: 633, y: 229, type: "threeway", name: "VCO1 WAVEFORM2"},
  {idx: 4, x: 757, y: 229, type: "threeway", name: "VCO1 WAVEFORM3"},
  {idx: 5, x: 1049, y: 102, type: "threeway", name: "VCO SYNC"},
  {idx: 6, x: 926, y: 229, type: "threeway", name: "VCO2 WAVEFORM1"},
  {idx: 7, x: 1049, y: 229, type: "threeway", name: "VCO2 WAVEFORM2"},
  {idx: 8, x: 1219, y: 102, type: "twoway", name: "VCO1 AUDIO"},
  {idx: 9, x: 1219, y: 229, type: "threeway", name: "VCF MODSOURCE1"},
  {idx: 10, x: 1342, y: 229, type: "threeway", name: "VCF MODSOURCE2"},
  {idx: 11, x: 1656, y: 430, type: "threeway", name: "ADSR REPEAT"},
  {idx: 12, x: 1656, y: 556, type: "twoway", name: "SAMPLE HOLD"},
  {idx: 13, x: 1874, y: 231, type: "threeway", name: "VCA OUTPUT"}
]
const TOGGLE_TYPES = {
  twoway: {values: ["up", "down"]},
  threeway: {values: ["up", "middle", "down"]}
}
const SLIDERS = [
  {idx: 0, x: 101, y: 605, type: "red", name: "PITCH BEND"},
  {idx: 1, x: 265, y: 605, type: "red", name: "GLIDE"},
  {idx: 2, x: 346, y: 605, type: "red", name: "LFO FREQ"},
  {idx: 3, x: 523, y: 605, type: "white", name: "VCO1 SUB"},
  {idx: 4, x: 605, y: 605, type: "white", name: "VCO1 SAW"},
  {idx: 5, x: 687, y: 605, type: "white", name: "VCO1 TRI"},
  {idx: 6, x: 769, y: 605, type: "white", name: "VCO1 PULSE"},
  {idx: 7, x: 919, y: 605, type: "white", name: "VCO2 SUB"},
  {idx: 8, x: 1000, y: 605, type: "white", name: "VCO2 SQUARE"},
  {idx: 9, x: 1081, y: 605, type: "white", name: "VCO2 SAW"},
  {idx: 10, x: 1252, y: 605, type: "red", name: "VCF FC"},
  {idx: 11, x: 1334, y: 605, type: "red", name: "VCF Q"},
  {idx: 12, x: 1504, y: 359, type: "grey", name: "ADSR A"},
  {idx: 13, x: 1586, y: 359, type: "grey", name: "ADSR D"},
  {idx: 14, x: 1668, y: 359, type: "grey", name: "ADSR S"},
  {idx: 15, x: 1749, y: 359, type: "grey", name: "ADSR R"},
  {idx: 16, x: 1504, y: 605, type: "grey", name: "AR A"},
  {idx: 17, x: 1586, y: 605, type: "grey", name: "AR R"},
  {idx: 18, x: 1749, y: 605, type: "grey", name: "LFO DELAY"},
  {idx: 19, x: 1885, y: 605, type: "white", name: "NOISE"}
]
const SLIDER_TYPES = {
  red: {radius: 18, limit: 110},
  white: {radius: 18, limit: 110},
  grey: {radius: 18, limit: 110}
}
const TOGGLE_WIDTH = 35
const TOGGLE_HEIGHT = 50

export class BehringerCat extends FrontPanel {
  constructor() {
    super({
      deviceName: "behringer-cat",
      canvasWidth: CANVAS_WIDTH,
      canvasHeight: CANVAS_HEIGHT,
      connectors: CONNECTORS,
      connectorOptions: {
        cellRadius: CELL_RADIUS,
        cableWidth: CABLE_WIDTH
      },
      knobs: KNOBS,
      knobTypes: KNOB_TYPES,
      sliders: SLIDERS,
      sliderTypes: SLIDER_TYPES,
      toggles: TOGGLES,
      toggleOptions: {
        types: TOGGLE_TYPES,
        width: TOGGLE_WIDTH,
        height: TOGGLE_HEIGHT
      },
      initialValues: {
        knobValues: Array(15).fill(0),
        sliderValues: [55].concat(Array(19).fill(0)),
        toggleValues: [1].concat(Array(14).fill(0))
      },
      images: {
        panel: "/images/cat/cat-front.png",
        knobs: {
          large: "/images/cat/cat-knob.png"
        },
        toggles: {
          down: "/images/cat/cat-switch-down.png",
          middle: "/images/cat/cat-switch-middle.png",
          up: "/images/cat/cat-switch-up.png"
        },
        sliders: {
          grey: "/images/cat/cat-slider-grey.png",
          red: "/images/cat/cat-slider-red.png",
          white: "/images/cat/cat-slider-white.png"
        }
      }
    })
  }

}

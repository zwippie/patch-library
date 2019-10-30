import { FrontPanel } from "./front-panel"

//
// Some constants for locations of knobs and connectors, etc.
//
const CANVAS_WIDTH = 1697;
const CANVAS_HEIGHT = 730;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
  {idx: 0, col: 0, row: 0, x: 1457, y: 97, name: "TRIGGER", input: true},
  {idx: 1, col: 0, row: 1, x: 1457, y: 170, name: "VELOCITY", input: true},
  {idx: 2, col: 0, row: 2, x: 1457, y: 243, name: "EXT AUDIO", input: true},
  {idx: 3, col: 0, row: 3, x: 1457, y: 315, name: "NOISE LEVEL", input: true},
  {idx: 4, col: 0, row: 4, x: 1457, y: 387, name: "VCF MOD", input: true},
  {idx: 5, col: 0, row: 5, x: 1457, y: 458, name: "1>2 FM AMOUNT", input: true},
  {idx: 6, col: 0, row: 6, x: 1457, y: 529, name: "TEMPO", input: true},
  {idx: 7, col: 0, row: 7, x: 1457, y: 601, name: "TRIGGER", input: false},

  {idx: 8, col: 1, row: 0, x: 1530, y: 97, name: "VCA CV", input: true},
  {idx: 9, col: 1, row: 1, x: 1530, y: 170, name: "VCA DECAY", input: true},
  {idx: 10, col: 1, row: 2, x: 1530, y: 243, name: "VCF DECAY", input: true},
  {idx: 11, col: 1, row: 3, x: 1530, y: 315, name: "VCO DECAY", input: true},
  {idx: 12, col: 1, row: 4, x: 1530, y: 387, name: "VCO 1 CV", input: true},
  {idx: 13, col: 1, row: 5, x: 1530, y: 458, name: "VCO 2 CV", input: true},
  {idx: 14, col: 1, row: 6, x: 1530, y: 529, name: "RUN/STOP", input: true},
  {idx: 15, col: 1, row: 7, x: 1530, y: 601, name: "VELOCITY", input: false},

  {idx: 16, col: 2, row: 0, x: 1603, y: 97, name: "VCA", input: false},
  {idx: 17, col: 2, row: 1, x: 1603, y: 170, name: "VCA EG", input: false},
  {idx: 18, col: 2, row: 2, x: 1603, y: 243, name: "VCF EG", input: false},
  {idx: 19, col: 2, row: 3, x: 1603, y: 315, name: "VCO EG", input: false},
  {idx: 20, col: 2, row: 4, x: 1603, y: 387, name: "VCO 1", input: false},
  {idx: 21, col: 2, row: 5, x: 1603, y: 458, name: "VCO 2", input: false},
  {idx: 22, col: 2, row: 6, x: 1603, y: 529, name: "ADV/CLOCK", input: true},
  {idx: 23, col: 2, row: 7, x: 1603, y: 601, name: "PITCH", input: false}
]
const KNOBS = [
  {idx: 0, x: 135.5, y: 133, type: "large", name: "VCO DECAY"},
  {idx: 1, x: 135.5, y: 305, type: "large", name: "1>2 FM AMOUNT"},
  {idx: 2, x: 281, y: 472, type: "large", name: "TEMPO"},
  {idx: 3, x: 362, y: 133, type: "large", name: "VCO 1 EG AMOUNT"},
  {idx: 4, x: 362, y: 305, type: "large", name: "VCO 2 EG AMOUNT"},
  {idx: 5, x: 516, y: 133, type: "large", name: "VCO 1 EG FREQUENCY"},
  {idx: 6, x: 516, y: 305, type: "large", name: "VCO 2 EG FREQUENCY"},
  {idx: 7, x: 874, y: 307, type: "large", name: "VCF DECAY"},
  {idx: 8, x: 958, y: 133, type: "large", name: "CUTOFF"},
  {idx: 9, x: 1028, y: 307, type: "large", name: "VCF EG AMOUNT"},
  {idx: 10, x: 1112.5, y: 133, type: "large", name: "RESONANCE"},
  {idx: 11, x: 1183, y: 307, type: "large", name: "NOISE / VCF MOD"},
  {idx: 12, x: 1350, y: 135, type: "large", name: "VOLUME"},
  {idx: 13, x: 1350, y: 309, type: "large", name: "VCA DECAY"},
  {idx: 14, x: 732, y: 106, type: "small", name: "VCO 1 LEVEL"},
  {idx: 15, x: 732, y: 221, type: "small", name: "NOISE/EXT LEVEL"},
  {idx: 16, x: 732, y: 337, type: "small", name: "VCO 2 LEVEL"},

  {idx: 17, x: 459, y: 458, type: "small", name: "PITCH 1"},
  {idx: 18, x: 586, y: 458, type: "small", name: "PITCH 2"},
  {idx: 19, x: 713, y: 458, type: "small", name: "PITCH 3"},
  {idx: 20, x: 840, y: 458, type: "small", name: "PITCH 4"},
  {idx: 21, x: 967, y: 458, type: "small", name: "PITCH 5"},
  {idx: 22, x: 1094, y: 458, type: "small", name: "PITCH 6"},
  {idx: 23, x: 1221, y: 458, type: "small", name: "PITCH 7"},
  {idx: 24, x: 1348, y: 458, type: "small", name: "PITCH 8"},

  {idx: 25, x: 459, y: 584, type: "small", name: "VELOCITY 1"},
  {idx: 26, x: 586, y: 584, type: "small", name: "VELOCITY 2"},
  {idx: 27, x: 713, y: 584, type: "small", name: "VELOCITY 3"},
  {idx: 28, x: 840, y: 584, type: "small", name: "VELOCITY 4"},
  {idx: 29, x: 967, y: 584, type: "small", name: "VELOCITY 5"},
  {idx: 30, x: 1094, y: 584, type: "small", name: "VELOCITY 6"},
  {idx: 31, x: 1221, y: 584, type: "small", name: "VELOCITY 7"},
  {idx: 32, x: 1348, y: 584, type: "small", name: "VELOCITY 8"},
]
const KNOB_TYPES = {
  large: {radius: 55, limit: 304},
  small: {radius: 30, limit: 300},
}
const TOGGLES = [
  {idx: 0, x: 225, y: 114, type: "threeway", name: "SEQ PITCH MOD"},
  {idx: 1, x: 227, y: 286, type: "twoway", name: "HARD SYNC"},
  {idx: 2, x: 608, y: 114, type: "twoway", name: "VCO 1 WAVE"},
  {idx: 3, x: 608, y: 286, type: "twoway", name: "VCO 2 WAVE"},
  {idx: 4, x: 816, y: 114, type: "twoway", name: "VCF TYPE"},
  {idx: 5, x: 1210, y: 114, type: "twoway", name: "VCA EG SPEED"},
]
const TOGGLE_TYPES = {
  threeway: {values: ["mid", "down", "up"]},
  twoway: {values: ["down", "up"]}
}
const TOGGLE_WIDTH = 42
const TOGGLE_HEIGHT = 42

export class MoogDfam extends FrontPanel {
  constructor() {
    super({
      deviceName: "moog-dfam",
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
        knobValues: Array(33).fill(151),
        toggleValues: Array(6).fill(0)
      },
      images: {
        panel: "/images/dfam/moog-dfam-front.png",
        knobs: {
          large: "/images/dfam/moog-dfam-knob-large.png",
          small: "/images/dfam/moog-dfam-knob-small.png"
        },
        toggles: {
          mid: "/images/dfam/moog-dfam-switch-mid.png",
          down: "/images/dfam/moog-dfam-switch-down.png",
          up: "/images/dfam/moog-dfam-switch-up.png"
        }
      }
    })
  }

}

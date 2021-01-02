import { FrontPanel } from "./front-panel"

const CANVAS_WIDTH = 1300;
const CANVAS_HEIGHT = 580;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 20;
const CONNECTORS = [
  {idx: 0, x: 1152, y: 72, name: "Balance Channel External", input: true},
  {idx: 1, x: 1256, y: 72, name: "Balance CV", input: true},
  {idx: 2, x: 511, y: 137, name: "TEMPO", input: true},
  {idx: 3, x: 455, y: 323, name: "Voltage MATH Channel 1", input: true},
  {idx: 4, x: 511, y: 323, name: "Voltage MATH Channel 2", input: true},
  {idx: 5, x: 883, y: 442, name: "Slope Rise/Fall Time CV", input: true},
  {idx: 6, x: 1011, y: 442, name: "Contour Decay Time CV", input: true},
  {idx: 7, x: 613, y: 500, name: "Oscillator 1/V OCTave", input: true},
  {idx: 8, x: 670, y: 500, name: "Oscillator Linear FM", input: true},
  {idx: 9, x: 739, y: 500, name: "Overtone CV", input: true},
  {idx: 10, x: 807, y: 500, name: "Multiply CV", input: true},
  {idx: 11, x: 884, y: 498, name: "Slope Trigger", input: true},
  {idx: 12, x: 1011, y: 498, name: "Contour Gate", input: true},
  {idx: 13, x: 1192, y: 498, name: "Dynamics CV", input: true},

  {idx: 14, x: 620, y: 72, name: "Oscillator Triangle Wave", input: false},
  {idx: 15, x: 682, y: 72, name: "Oscillator Square Wave", input: false},
  {idx: 16, x: 511, y: 198, name: "CLocK", input: false},
  {idx: 17, x: 511, y: 259, name: "Stepped Random", input: false},
  {idx: 18, x: 939, y: 442, name: "Slope End of Cycle (EOC) Gate", input: false},
  {idx: 19, x: 1253, y: 442, name: "Headphone/Line", input: false},
  {idx: 20, x: 345, y: 501, name: "Ext. CV", input: false},
  {idx: 21, x: 405, y: 501, name: "Ext. Gate", input: false},
  {idx: 22, x: 481, y: 501, name: "Voltage MATH Channel 1", input: false},
  {idx: 23, x: 540, y: 500, name: "Voltage MATH Channel 2", input: false},
  {idx: 24, x: 940, y: 498, name: "Slope CV", input: false},
  {idx: 25, x: 1067, y: 498, name: "Contour End of Onset (EON)", input: false},
  {idx: 26, x: 1124, y: 498, name: "Contour CV", input: false},
  {idx: 27, x: 1248, y: 498, name: "Dynamics", input: false},
];
const KNOBS = [
  {idx: 0, x: 651, y: 176, type: "large", name: "Oscillator: Pitch Panel Control"},
  {idx: 1, x: 512, y: 407, type: "medium", name: "Voltage MATH: Channel Attenuverter"},
  {idx: 2, x: 651, y: 407, type: "medium", name: "Oscillator: Linear FM Attenuator"},

  {idx: 3, x: 807, y: 127, type: "medium", name: "Overtone: Panel Control"},
  {idx: 4, x: 807, y: 211, type: "medium", name: "Overtone: CV Attenuator"},
  {idx: 5, x: 807, y: 309, type: "medium", name: "Multiply Panel Control"},
  {idx: 6, x: 807, y: 402, type: "medium", name: "Multiply: CV Attenuverter"},

  {idx: 7, x: 936, y: 158, type: "medium", name: "Slope: Rise Panel Control"},
  {idx: 8, x: 936, y: 261, type: "medium", name: "Slope: Fall Panel Control"},
  {idx: 9, x: 936, y: 361, type: "medium", name: "Slope: Vari-Response"},

  {idx: 10, x: 1066, y: 98, type: "medium", name: "Contour: Onset Panel Control"},
  {idx: 11, x: 1066, y: 198, type: "medium", name: "Contour: Sustain Panel Control"},
  {idx: 12, x: 1066, y: 301, type: "medium", name: "Contour: Decay Panel Control"},
  {idx: 13, x: 1066, y: 404, type: "medium", name: "Contour: Vari-Response"},

  {idx: 14, x: 1198, y: 153, type: "medium", name: "Balance: Attenuator"},
  {idx: 15, x: 1198, y: 302, type: "medium", name: "Dynamics: Attenuator"},

  {idx: 16, x: 651, y: 312, type: "small", name: "Oscillator: Pitch Fine Tune"},
  {idx: 17, x: 1198, y: 404, type: "small", name: "Headphone/Line Output: Level Control"},
]
const KNOB_TYPES = {
  large: {radius: 55, limit: 304},
  medium: {radius: 32, limit: 300},
  small: {radius: 30, limit: 300},
}
const TOGGLES = [
  {idx: 0, x: 924, y: 60, type: "twoway", name: "Slope Cycle"}
]
const TOGGLE_TYPES = {
  twoway: {values: ["off", "on"]}
}
const TOGGLE_WIDTH = 27
const TOGGLE_HEIGHT = 27

const initialKnobValues = function() {
  let knobValues = Array(18).fill(0)
  knobValues[1] = 152
  knobValues[6] = 152

  return knobValues
}

export class MakeNoise0Coast extends FrontPanel {
  constructor() {
    super({
      deviceName: "make-noise-0-coast",
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
        toggleValues: [0]
      },
      images: {
        panel: "/images/0-coast/0-coast-front3.png",
        knobs: {
          large: "/images/0-coast/0-coast-knob-large.png",
          medium: "/images/0-coast/0-coast-knob-medium.png",
          small: "/images/0-coast/0-coast-knob-small.png"
        },
        toggles: {
          on: "/images/0-coast/0-coast-button-on.png",
          off: "/images/0-coast/0-coast-button-off.png"
        }
      }
    })
  }
}

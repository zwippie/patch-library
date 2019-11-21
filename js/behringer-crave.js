import { FrontPanel } from "./front-panel"

//
// Some constants for locations of knobs and connectors, etc.
//
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 1035;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
  {idx: 0, col: 0, row: 0, x: 1250, y: 88, name: "EXT. AUDIO", input: true},
  {idx: 1, col: 0, row: 1, x: 1250, y: 154, name: "NOISE", input: false},
  {idx: 2, col: 0, row: 2, x: 1250, y: 220, name: "VCO 1V/OCT", input: true},
  {idx: 3, col: 0, row: 3, x: 1250, y: 285, name: "VCO MOD", input: true},
  {idx: 4, col: 0, row: 4, x: 1249, y: 350, name: "MIX 1", input: true},
  {idx: 5, col: 0, row: 5, x: 1249, y: 415, name: "MULT", input: true},
  {idx: 6, col: 0, row: 6, x: 1249, y: 480, name: "GATE", input: true},
  {idx: 7, col: 0, row: 7, x: 1249, y: 545, name: "TEMPO", input: true},

  {idx: 8, col: 1, row: 0, x: 1315, y: 88, name: "MIX CV", input: true},
  {idx: 9, col: 1, row: 1, x: 1315, y: 154, name: "VCF CUTOFF", input: true},
  {idx: 10, col: 1, row: 2, x: 1315, y: 220, name: "VCO LIN FM", input: true},
  {idx: 11, col: 1, row: 3, x: 1315, y: 285, name: "LFO RATE", input: true},
  {idx: 12, col: 1, row: 4, x: 1313, y: 350, name: "MIX 2", input: true},
  {idx: 13, col: 1, row: 5, x: 1313, y: 415, name: "MULT 1", input: false},
  {idx: 14, col: 1, row: 6, x: 1313, y: 480, name: "EG", input: false},
  {idx: 15, col: 1, row: 7, x: 1313, y: 545, name: "RUN/STOP", input: true},

  {idx: 16, col: 2, row: 0, x: 1380, y: 88, name: "VCA CV", input: true},
  {idx: 17, col: 2, row: 1, x: 1380, y: 154, name: "VCF RES.", input: true},
  {idx: 18, col: 2, row: 2, x: 1380, y: 220, name: "VCO SAW", input: false},
  {idx: 19, col: 2, row: 3, x: 1380, y: 285, name: "LFO TRI", input: false},
  {idx: 20, col: 2, row: 4, x: 1377, y: 350, name: "VC MIX CTRL", input: true},
  {idx: 21, col: 2, row: 5, x: 1377, y: 415, name: "MULT 2", input: false},
  {idx: 22, col: 2, row: 6, x: 1377, y: 480, name: "KB", input: false},
  {idx: 23, col: 2, row: 7, x: 1377, y: 545, name: "RESET", input: true},

  {idx: 24, col: 3, row: 0, x: 1445, y: 88, name: "VCA", input: false},
  {idx: 25, col: 3, row: 1, x: 1445, y: 154, name: "VCF", input: false},
  {idx: 26, col: 3, row: 2, x: 1445, y: 220, name: "VCO PULSE", input: false},
  {idx: 27, col: 3, row: 3, x: 1445, y: 285, name: "LFO SQ", input: false},
  {idx: 28, col: 3, row: 4, x: 1443, y: 350, name: "VC MIX", input: false},
  {idx: 29, col: 3, row: 5, x: 1443, y: 415, name: "ASSIGN", input: false},
  {idx: 30, col: 3, row: 6, x: 1443, y: 480, name: "GATE", input: false},
  {idx: 31, col: 3, row: 7, x: 1443, y: 545, name: "HOLD", input: true}
]
const KNOBS = [
  {idx: 0, x: 140, y: 293, type: "large", name: "FREQUENCY"},
  {idx: 1, x: 315, y: 293, type: "large", name: "PULSE WIDTH"},
  {idx: 2, x: 486, y: 293, type: "large", name: "VCO MOD AMOUNT"},
  {idx: 3, x: 660, y: 293, type: "large", name: "MIX"},
  {idx: 4, x: 840, y: 293, type: "large", name: "CUTOFF"},
  {idx: 5, x: 1012, y: 293, type: "large", name: "RESONANCE"},
  {idx: 6, x: 1185, y: 293, type: "large", name: "VCF MOD AMOUNT"},
  {idx: 7, x: 1360, y: 293, type: "large", name: "VOLUME"},
  {idx: 8, x: 140, y: 487, type: "large", name: "ATTACK"},
  {idx: 9, x: 315, y: 487, type: "large", name: "DECAY"},
  {idx: 10, x: 486, y: 487, type: "large", name: "SUSTAIN"},
  {idx: 11, x: 840, y: 487, type: "large", name: "LFO RATE"},
  {idx: 12, x: 1185, y: 487, type: "large", name: "GLIDE"},
  {idx: 13, x: 1360, y: 487, type: "large", name: "VC MIX"},
  {idx: 14, x: 140, y: 645, type: "large", name: "TEMPO/GATE LENGTH"}
]
const KNOB_TYPES = {
  large: {radius: 30, limit: 360}
}
const TOGGLES = [
  {idx: 0, x: 268, y: 79, type: "twoway", name: "VCO WAVE"},
  {idx: 1, x: 266, y: 218, type: "twoway", name: "VCO MOD SOURCE"},
  {idx: 2, x: 541, y: 218, type: "twoway", name: "VCO MOD DEST"},
  {idx: 3, x: 541, y: 352, type: "twoway", name: "LFO WAVE"},
  {idx: 4, x: 681, y: 218, type: "twoway", name: "VCF MODE"},
  {idx: 5, x: 821, y: 218, type: "twoway", name: "VCF MOD SOURCE"},
  {idx: 6, x: 821, y: 352, type: "twoway", name: "SUSTAIN"},
  {idx: 7, x: 986, y: 79, type: "twoway", name: "VCA MODE"},
  {idx: 8, x: 1098, y: 218, type: "twoway", name: "VCF MOD POLARITY"},

]
const TOGGLE_TYPES = {
  twoway: {values: ["left", "right"]}
}
const TOGGLE_WIDTH = 43
const TOGGLE_HEIGHT = 41

export class BehringerCrave extends FrontPanel {
  constructor() {
    super({
      deviceName: "behringer-crave",
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
        knobValues: Array(14).fill(150),
        toggleValues: Array(9).fill(0)
      },
      images: {
        panel: "/images/crave/crave-front.png",
        knobs: {
          large: "/images/crave/crave-knob.png"
        },
        toggles: {
          left: "/images/crave/crave-switch-left.png",
          right: "/images/crave/crave-switch-right.png"
        }
      }
    })
  }

}

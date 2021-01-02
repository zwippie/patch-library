import { FrontPanel } from "./front-panel"

const CANVAS_WIDTH = 1650;
const CANVAS_HEIGHT = 892;
const CABLE_WIDTH = 8;
const CELL_RADIUS = 18;
const CONNECTORS = [
  {idx: 0, x: 438, y: 390, name: "CLK IN", input: true},
  {idx: 1, x: 438, y: 455, name: "SEQ CV OUT", input: false},
  {idx: 2, x: 503, y: 260, name: "VCO1 1V/OCT", input: true},
  {idx: 3, x: 503, y: 325, name: "PWM CV", input: true},
  {idx: 4, x: 503, y: 390, name: "VCO1 PULSE", input: false},
  {idx: 5, x: 503, y: 455, name: "VCO1 TRI", input: false},
  {idx: 6, x: 568, y: 260, name: "EXP FM", input: true},
  {idx: 7, x: 568, y: 325, name: "VCA CV", input: true},
  {idx: 8, x: 568, y: 390, name: "IN/LIN FM", input: true},
  {idx: 9, x: 568, y: 455, name: "VCA OUT", input: false},
  {idx: 10, x: 634, y: 260, name: "VCO2 1V/OCT", input: true},
  {idx: 11, x: 634, y: 325, name: "SHAPE CV", input: true},
  {idx: 12, x: 634, y: 390, name: "VCO2 SHAPE", input: false},
  {idx: 13, x: 634, y: 455, name: "VCO2 TRI", input: false},
  {idx: 14, x: 700, y: 260, name: "MIX1 IN 1", input: true},
  {idx: 15, x: 700, y: 325, name: "MIX1 IN 2", input: true},
  {idx: 16, x: 700, y: 390, name: "MIX1 IN 3", input: true},
  {idx: 17, x: 700, y: 455, name: "MIX1 OUT", input: false},
  {idx: 18, x: 765, y: 130, name: "CLK IN", input: true},
  {idx: 19, x: 765, y: 195, name: "MOD SINE", input: false},
  {idx: 20, x: 765, y: 260, name: "MOD PULSE", input: false},
  {idx: 21, x: 765, y: 325, name: "RND PULSE", input: false},
  {idx: 22, x: 765, y: 390, name: "S&H", input: false},
  {idx: 23, x: 765, y: 455, name: "NOISE", input: false},
  {idx: 24, x: 831, y: 260, name: "EG1 ATTACK CV", input: true},
  {idx: 25, x: 831, y: 325, name: "EG1 DECAY CV", input: true},
  {idx: 26, x: 831, y: 390, name: "EG1 TRIGG", input: true},
  {idx: 27, x: 831, y: 455, name: "EG1 OUT", input: false},
  {idx: 28, x: 897, y: 260, name: "EG2 ATTACK CV", input: true},
  {idx: 29, x: 897, y: 325, name: "EG2 DECAY CV", input: true},
  {idx: 30, x: 897, y: 390, name: "EG2 TRIGG", input: true},
  {idx: 31, x: 897, y: 455, name: "EG2 OUT", input: false},
  {idx: 32, x: 962, y: 260, name: "LPG1 CV1", input: true},
  {idx: 33, x: 962, y: 325, name: "LPG1 CV2", input: true},
  {idx: 34, x: 962, y: 390, name: "LPG1 IN", input: true},
  {idx: 35, x: 962, y: 455, name: "LPG1 OUT", input: false},
  {idx: 36, x: 1028, y: 260, name: "LPG2 CV1", input: true},
  {idx: 37, x: 1028, y: 325, name: "LPG2 CV2", input: true},
  {idx: 38, x: 1028, y: 390, name: "LPG2 IN", input: true},
  {idx: 39, x: 1028, y: 455, name: "LPG2 OUT", input: false},
  {idx: 40, x: 1094, y: 325, name: "BBD TIME CV", input: true},
  {idx: 41, x: 1094, y: 390, name: "BBD IN", input: true},
  {idx: 42, x: 1094, y: 455, name: "BBD OUT", input: false},
  {idx: 43, x: 1160, y: 260, name: "MIX2 IN 1", input: true},
  {idx: 44, x: 1160, y: 325, name: "MIX2 IN 2", input: true},
  {idx: 45, x: 1160, y: 390, name: "MIX2 IN 3", input: true},
  {idx: 46, x: 1160, y: 455, name: "MIX2 OUT", input: false},
  {idx: 47, x: 1226, y: 260, name: "MIX3 IN 1", input: true},
  {idx: 48, x: 1226, y: 325, name: "MIX3 IN 2", input: true},
  {idx: 49, x: 1226, y: 390, name: "MIX3 OUT", input: false},
  {idx: 50, x: 1226, y: 455, name: "MIX3 SUM OUT", input: false},
  {idx: 51, x: 1226, y: 65, name: "MASTER OUT (STEREO)", input: false},
];
const KNOBS = [
  {idx: 0, x: 438, y: 67, type: "small", name: "SEQ 1"},
  {idx: 1, x: 438, y: 135, type: "small", name: "SEQ 2"},
  {idx: 2, x: 438, y: 207, type: "small", name: "SEQ 3"},
  {idx: 3, x: 438, y: 275, type: "small", name: "SEQ 4"},
  {idx: 4, x: 505, y: 67, type: "small", name: "TUNE 1"},
  {idx: 5, x: 505, y: 130, type: "small", name: "PWM"},
  {idx: 6, x: 569, y: 67, type: "small", name: "EXP FM"},
  {idx: 7, x: 569, y: 128, type: "small", name: "LIN FM"},
  {idx: 8, x: 569, y: 195, type: "small", name: "VCA OFFS"},
  {idx: 9, x: 635, y: 67, type: "small", name: "TUNE 2"},
  {idx: 10, x: 635, y: 130, type: "small", name: "SHAPE"},
  {idx: 11, x: 701, y: 67, type: "small", name: "MIX1 LVL 1"},
  {idx: 12, x: 701, y: 130, type: "small", name: "MIX1 LVL 2"},
  {idx: 13, x: 701, y: 195, type: "small", name: "MIX1 LVL 3"},
  {idx: 14, x: 766, y: 67, type: "small", name: "RATE"},
  {idx: 15, x: 832, y: 65, type: "small", name: "EG1 ATTACK"},
  {idx: 16, x: 832, y: 130, type: "small", name: "EG1 DECAY"},
  {idx: 17, x: 898, y: 65, type: "small", name: "EG2 ATTACK"},
  {idx: 18, x: 898, y: 130, type: "small", name: "EG2 DECAY"},
  {idx: 19, x: 963, y: 65, type: "small", name: "LPG1 OFFSET"},
  {idx: 20, x: 963, y: 129, type: "small", name: "LPG1 RESO"},
  {idx: 21, x: 1030, y: 65, type: "small", name: "LPG2 OFFSET"},
  {idx: 22, x: 1030, y: 129, type: "small", name: "LPG2 RESO"},
  {idx: 23, x: 1095, y: 65, type: "small", name: "BBD TIME"},
  {idx: 24, x: 1095, y: 129, type: "small", name: "BBD FDK"},
  {idx: 25, x: 1095, y: 195, type: "small", name: "BBD DRY/WET"},
  {idx: 26, x: 1162, y: 65, type: "small", name: "MIX2 LVL 1"},
  {idx: 27, x: 1162, y: 129, type: "small", name: "MIX2 LVL 2"},
  {idx: 28, x: 1162, y: 195, type: "small", name: "MIX2 LVL 3"},
  {idx: 29, x: 1228, y: 129, type: "small", name: "MIX3 LVL 1"},
  {idx: 30, x: 1228, y: 195, type: "small", name: "MIX3 LVL 2"},
]

const KNOB_TYPES = {
  small: {radius: 25, limit: 280} 
}
const TOGGLES = [
  {idx: 0, x: 416, y: 322, type: "horizthree", name: "SEQ STEPS"},
  {idx: 1, x: 475, y: 173, type: "vertthree", name: "VCO1 OCT"},
  {idx: 2, x: 604, y: 173, type: "vertthree", name: "VCO2 OCT"},
  {idx: 3, x: 797, y: 173, type: "verttwo", name: "EG1 LOOP/FREE"},
  {idx: 4, x: 862, y: 173, type: "verttwo", name: "EG2 LOOP/FREE"},
  {idx: 5, x: 945, y: 173, type: "verttwo", name: "LPG1 VCA/VCF"},
  {idx: 6, x: 1010, y: 173, type: "verttwo", name: "LPG2 VCA/VCF"},
  {idx: 7, x: 1072, y: 240, type: "horizthree", name: "SEQ STEPS"},
]
const TOGGLE_TYPES = {
  horiztwo: {values: ["left", "right"]},
  horizthree: {values: ["left", "centerhor", "right"]},
  verttwo: {values: ["up", "down"]},
  vertthree: {values: ["up", "center", "down"]}
}

const TOGGLE_WIDTH = 44
const TOGGLE_HEIGHT = 38

const initialKnobValues = function() {
  let knobValues = Array(31).fill(140)
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
        toggleValues: Array(8).fill(0)
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

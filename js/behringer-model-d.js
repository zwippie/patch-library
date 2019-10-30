import { FrontPanel } from "./front-panel"

const CANVAS_WIDTH = 1585;
const CANVAS_HEIGHT = 584;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
  {idx: 0, col: 0, row: 0, x: 406, y: 66, name: "MOD SOURCE", input: true},
  {idx: 1, col: 1, row: 0, x: 513, y: 66, name: "OSC 1V/OCT", input: true},
  {idx: 2, col: 2, row: 0, x: 621, y: 66, name: "LFO CV", input: true},
  {idx: 3, col: 5, row: 0, x: 909, y: 66, name: "EXT", input: true},
  {idx: 4, col: 7, row: 0, x: 1112, y: 66, name: "CUT CV", input: true},
  {idx: 5, col: 8, row: 0, x: 1170, y: 66, name: "FC GATE", input: true},
  {idx: 6, col: 10, row: 0, x: 1284, y: 66, name: "LC GATE", input: true},
  {idx: 7, col: 12, row: 0, x: 1423, y: 66, name: "LOUD CV", input: true},
  {idx: 8, col: 3, row: 0, x: 713, y: 66, name: "LFO TRIANGULAR", input: false},
  {idx: 9, col: 4, row: 0, x: 770, y: 66, name: "LFO SQUARE", input: false},
  {idx: 10, col: 6, row: 0, x: 966, y: 66, name: "MIX", input: false},
  {idx: 11, col: 9, row: 0, x: 1227, y: 66, name: "FILT CONT", input: false},
  {idx: 12, col: 11, row: 0, x: 1341, y: 66, name: "LOUD CONT", input: false},
  {idx: 13, col: 13, row: 0, x: 1510, y: 66, name: "MAIN", input: false},
];
const KNOBS = [
  {idx: 0, x: 167, y: 195, type: "large", name: "TUNE"},
  {idx: 1, x: 99, y: 301, type: "small", name: "GLIDE"},
  {idx: 2, x: 234, y: 301, type: "small", name: "MOD MIX"},
  {idx: 3, x: 98, y: 468, type: "small", name: "MOD DEPTH"},
  {idx: 4, x: 234, y: 468, type: "small", name: "LFO RATE"},

  {idx: 5, x: 405, y: 166, type: "medium", name: "OSC1 RANGE"},
  {idx: 6, x: 403, y: 299, type: "medium", name: "OSC2 RANGE"},
  {idx: 7, x: 405, y: 432, type: "medium", name: "OSC3 RANGE"},

  {idx: 8, x: 514, y: 299, type: "large", name: "OSC2 FREQ"},
  {idx: 9, x: 514, y: 432, type: "large", name: "OSC3 FREQ"},

  {idx: 10, x: 622, y: 166, type: "medium", name: "OSC1 WAVEFORM"},
  {idx: 11, x: 622, y: 299, type: "medium", name: "OSC2 WAVEFORM"},
  {idx: 12, x: 622, y: 432, type: "medium", name: "OSC3 WAVEFORM"},

  {idx: 13, x: 732, y: 166, type: "small", name: "OSC1 VOLUME"},
  {idx: 14, x: 732, y: 299, type: "small", name: "OSC2 VOLUME"},
  {idx: 15, x: 732, y: 432, type: "small", name: "OSC3 VOLUME"},

  {idx: 16, x: 907, y: 233, type: "small", name: "EXT IN VOLUME"},
  {idx: 17, x: 907, y: 366, type: "small", name: "NOISE VOLUME"},

  {idx: 18, x: 1130, y: 167, type: "small", name: "CUTOFF FREQUENCY"},
  {idx: 19, x: 1130, y: 299, type: "small", name: "FILTER ATTACK"},
  {idx: 20, x: 1130, y: 431, type: "small", name: "LC ATTACK"},

  {idx: 21, x: 1228, y: 167, type: "small", name: "FILTER EMPHASIS"},
  {idx: 22, x: 1229, y: 299, type: "small", name: "FILTER DECAY"},
  {idx: 23, x: 1229, y: 431, type: "small", name: "LOUDNESS DECAY"},

  {idx: 24, x: 1326, y: 167, type: "small", name: "AMOUNT OF COUNTOUR"},
  {idx: 25, x: 1327, y: 299, type: "small", name: "FILTER SUSTAIN"},
  {idx: 26, x: 1327, y: 431, type: "small", name: "LC SUSTAIN"},

  {idx: 27, x: 1425, y: 167, type: "small", name: "VOLUME"},
  {idx: 28, x: 1425, y: 430, type: "small", name: "VOLUME (HEADPHONE)"},
]
const KNOB_TYPES = {
  large: {radius: 55, limit: 304},
  medium: {radius: 45, limit: 160},
  small: {radius: 30, limit: 300},
}
const TOGGLES = [
  {idx: 0, x: 61, y: 356, type: "black", name: "OSC3/FILTER EG"},
  {idx: 1, x: 195, y: 356, type: "black", name: "MOD SOURCE"},
  {idx: 2, x: 147, y: 435, type: "black_rot", name: "WAVE SHAPE"},

  {idx: 3, x: 267, y: 183, type: "blue", name: "OSCILLATOR MODULATION"},
  {idx: 4, x: 311, y: 398, type: "blue_rot", name: "NOISE (MOD SRC)/ LFO"},

  {idx: 5, x: 783, y: 150, type: "red", name: "OSC1 ON/OFF"},
  {idx: 6, x: 783, y: 215, type: "red", name: "OSC2 ON/OFF"},
  {idx: 7, x: 783, y: 280, type: "red", name: "OSC3 ON/OFF"},
  {idx: 8, x: 783, y: 347, type: "red", name: "NOISE ON/OFF"},
  {idx: 9, x: 783, y: 413, type: "red", name: "EXT IN ON/OFF"},

  {idx: 10, x: 954, y: 332, type: "red_rot", name: "WHITE/PINK"},

  {idx: 11, x: 1005, y: 85, type: "blue", name: "FILTER MODE"},
  {idx: 12, x: 1005, y: 150, type: "blue", name: "FILTER MODULATION"},
  {idx: 13, x: 1005, y: 215, type: "blue", name: "KEYBOARD CONTROL 1"},
  {idx: 14, x: 1005, y: 282, type: "blue", name: "KEYBOARD CONTROL 2"},
  {idx: 15, x: 1005, y: 347, type: "white", name: "FILTER DECAY"},
  {idx: 16, x: 1005, y: 413, type: "white", name: "LOUDNESS DECAY"},

  {idx: 17, x: 1387, y: 281, type: "red", name: "A-440"},
  {idx: 18, x: 1476, y: 149, type: "red", name: "ON"},

]
const TOGGLE_TYPES = {
  white: {values: ["white_left", "white_right"]},
  red: {values: ["red_left", "red_right"]},
  blue: {values: ["blue_left", "blue_right"]},
  black: {values: ["black_left", "black_right"], width: 65, height: 35},
  red_rot: {values: ["red_up", "red_down"]},
  blue_rot: {values: ["blue_up", "blue_down"]},
  black_rot: {values: ["black_up", "black_down"]}
}
// Dimensions are way off because some of these switches are rotated
// and the hitdetection is wrongly based an a circle instead of square.
const TOGGLE_WIDTH = 40
const TOGGLE_HEIGHT = 40

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

export class BehringerModelD extends FrontPanel {
  constructor() {
    super({
      deviceName: "behringer-model-d",
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
        panel: "/images/model-d/model-d-front.png",
        knobs: {
          large: "/images/model-d/model-d-knob-large.png",
          medium: "/images/model-d/model-d-knob-medium.png",
          small: "/images/model-d/model-d-knob-small.png"
        },
        toggles: {
          white_left: "/images/model-d/model-d-switch-white.png",
          white_right: "/images/model-d/model-d-switch-white-right.png",
          red_left: "/images/model-d/model-d-switch-red.png",
          red_right: "/images/model-d/model-d-switch-red-right.png",
          red_up: "/images/model-d/model-d-switch-red-up.png",
          red_down: "/images/model-d/model-d-switch-red-down.png",
          blue_left: "/images/model-d/model-d-switch-blue.png",
          blue_right: "/images/model-d/model-d-switch-blue-right.png",
          blue_up: "/images/model-d/model-d-switch-blue-up.png",
          blue_down: "/images/model-d/model-d-switch-blue-down.png",
          black_left: "/images/model-d/model-d-switch-black.png",
          black_right: "/images/model-d/model-d-switch-black-right.png",
          black_up: "/images/model-d/model-d-switch-black-up.png",
          black_down: "/images/model-d/model-d-switch-black-down.png",
          red_ud: "/images/model-d/model-d-switch-black.png",
          blue_ud: "/images/model-d/model-d-switch-black.png",
        }
      }
    })
  }

}

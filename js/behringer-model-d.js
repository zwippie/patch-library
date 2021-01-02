import { FrontPanel } from "./front-panel"

const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 536;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
  {idx: 0, col: 0, row: 0, x: 386, y: 65, name: "MOD SOURCE", input: true},
  {idx: 1, col: 1, row: 0, x: 486, y: 65, name: "OSC 1V/OCT", input: true},
  {idx: 2, col: 2, row: 0, x: 585, y: 65, name: "LFO CV", input: true},
  {idx: 3, col: 5, row: 0, x: 854, y: 65, name: "EXT", input: true},
  {idx: 4, col: 7, row: 0, x: 1043, y: 65, name: "CUT CV", input: true},
  {idx: 5, col: 8, row: 0, x: 1096, y: 65, name: "FC GATE", input: true},
  {idx: 6, col: 10, row: 0, x: 1204, y: 65, name: "LC GATE", input: true},
  {idx: 7, col: 12, row: 0, x: 1334, y: 65, name: "LOUD CV", input: true},
  {idx: 8, col: 3, row: 0, x: 671, y: 65, name: "LFO TRIANGULAR", input: false},
  {idx: 9, col: 4, row: 0, x: 724, y: 65, name: "LFO SQUARE", input: false},
  {idx: 10, col: 6, row: 0, x: 907, y: 65, name: "MIX", input: false},
  {idx: 11, col: 9, row: 0, x: 1150, y: 65, name: "FILT CONT", input: false},
  {idx: 12, col: 11, row: 0, x: 1257, y: 65, name: "LOUD CONT", input: false},
  {idx: 13, col: 13, row: 0, x: 1416, y: 65, name: "MAIN", input: false},
];
const KNOBS = [
  {idx: 0, x: 162, y: 190, type: "large", name: "TUNE"},
  {idx: 1, x: 100, y: 285, type: "small", name: "GLIDE"},
  {idx: 2, x: 225, y: 285, type: "small", name: "MOD MIX"},
  {idx: 3, x: 100, y: 443, type: "small", name: "MOD DEPTH"},
  {idx: 4, x: 225, y: 443, type: "small", name: "LFO RATE"},

  {idx: 5, x: 386, y: 162, type: "medium", name: "OSC1 RANGE"},
  {idx: 6, x: 386, y: 285, type: "medium", name: "OSC2 RANGE"},
  {idx: 7, x: 386, y: 408, type: "medium", name: "OSC3 RANGE"},

  {idx: 8, x: 485, y: 285, type: "large", name: "OSC2 FREQ"},
  {idx: 9, x: 485, y: 408, type: "large", name: "OSC3 FREQ"},

  {idx: 10, x: 585, y: 162, type: "medium", name: "OSC1 WAVEFORM"},
  {idx: 11, x: 585, y: 285, type: "medium", name: "OSC2 WAVEFORM"},
  {idx: 12, x: 585, y: 408, type: "medium", name: "OSC3 WAVEFORM"},

  {idx: 13, x: 686.5, y: 162, type: "small", name: "OSC1 VOLUME"},
  {idx: 14, x: 686.5, y: 285, type: "small", name: "OSC2 VOLUME"},
  {idx: 15, x: 686.5, y: 408, type: "small", name: "OSC3 VOLUME"},

  {idx: 16, x: 850, y: 224, type: "small", name: "EXT IN VOLUME"},
  {idx: 17, x: 850, y: 346, type: "small", name: "NOISE VOLUME"},

  {idx: 18, x: 1058.5, y: 162, type: "small", name: "CUTOFF FREQUENCY"},
  {idx: 19, x: 1058.5, y: 285, type: "small", name: "FILTER ATTACK"},
  {idx: 20, x: 1058.5, y: 408, type: "small", name: "LC ATTACK"},

  {idx: 21, x: 1150.5, y: 162, type: "small", name: "FILTER EMPHASIS"},
  {idx: 22, x: 1150.5, y: 285, type: "small", name: "FILTER DECAY"},
  {idx: 23, x: 1150.5, y: 408, type: "small", name: "LOUDNESS DECAY"},

  {idx: 24, x: 1242.5, y: 162, type: "small", name: "AMOUNT OF COUNTOUR"},
  {idx: 25, x: 1242.5, y: 285, type: "small", name: "FILTER SUSTAIN"},
  {idx: 26, x: 1242.5, y: 408, type: "small", name: "LC SUSTAIN"},

  {idx: 27, x: 1334, y: 162, type: "small", name: "VOLUME"},
  {idx: 28, x: 1334, y: 408, type: "small", name: "VOLUME (HEADPHONE)"},
]
const KNOB_TYPES = {
  large: {radius: 55, limit: 300},
  medium: {radius: 45, limit: 150},
  small: {radius: 30, limit: 300},
}
const TOGGLES = [
  {idx: 0, x: 69, y: 336, type: "black", name: "OSC3/FILTER EG"},
  {idx: 1, x: 194, y: 336, type: "black", name: "MOD SOURCE"},
  {idx: 2, x: 146, y: 411, type: "black_rot", name: "WAVE SHAPE"},

  {idx: 3, x: 258, y: 175, type: "blue", name: "OSCILLATOR MODULATION"},
  {idx: 4, x: 298, y: 377, type: "blue_rot", name: "NOISE (MOD SRC)/ LFO"},

  {idx: 5, x: 737, y: 145, type: "red", name: "OSC1 ON/OFF"},
  {idx: 6, x: 737, y: 206, type: "red", name: "OSC2 ON/OFF"},
  {idx: 7, x: 737, y: 268, type: "red", name: "OSC3 ON/OFF"},
  {idx: 8, x: 737, y: 329, type: "red", name: "NOISE ON/OFF"},
  {idx: 9, x: 737, y: 390, type: "red", name: "EXT IN ON/OFF"},

  {idx: 10, x: 895, y: 315, type: "red_rot", name: "WHITE/PINK"},

  {idx: 11, x: 944, y: 84, type: "blue", name: "FILTER MODE"},
  {idx: 12, x: 944, y: 146, type: "blue", name: "FILTER MODULATION"},
  {idx: 13, x: 944, y: 208, type: "blue", name: "KEYBOARD CONTROL 1"},
  {idx: 14, x: 944, y: 269, type: "blue", name: "KEYBOARD CONTROL 2"},
  {idx: 15, x: 944, y: 329, type: "white", name: "FILTER DECAY"},
  {idx: 16, x: 944, y: 390, type: "white", name: "LOUDNESS DECAY"},

  {idx: 17, x: 1303, y: 268, type: "red", name: "A-440"},
  {idx: 18, x: 1385, y: 145, type: "red", name: "ON"},

]
const TOGGLE_TYPES = {
  white: {values: ["white_left", "white_right"]},
  red: {values: ["red_left", "red_right"]},
  blue: {values: ["blue_left", "blue_right"]},
  black: {values: ["black_left", "black_right"]},
  red_rot: {values: ["red_up", "red_down"], width: 34, height: 62},
  blue_rot: {values: ["blue_up", "blue_down"], width: 34, height: 62},
  black_rot: {values: ["black_up", "black_down"],width: 34, height: 62}
}
// Dimensions are way off because some of these switches are rotated
// and the hitdetection is wrongly based an a circle instead of square.
const TOGGLE_WIDTH = 62
const TOGGLE_HEIGHT = 34

const initialKnobValues = function() {
  let knobValues = Array(29).fill(150)
  // These range and waveform knobs are actually limited to certain values. Ignore that now...
  knobValues[5] = 150
  knobValues[6] = 150
  knobValues[7] = 150

  knobValues[10] = 150
  knobValues[11] = 150
  knobValues[12] = 150

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

import { FrontPanel } from "./front-panel"

//
// Some constants for locations of knobs and connectors, etc.
//
const CANVAS_WIDTH = 1708;
const CANVAS_HEIGHT = 723;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
  {idx: 0, col: 0, row: 0, x: 1430, y: 90, name: "VCO 1 IN", input: true},
  {idx: 1, col: 0, row: 1, x: 1430, y: 170, name: "VCO 1 OUT", input: false},
  {idx: 2, col: 0, row: 2, x: 1430, y: 243, name: "VCO 2", input: true},
  {idx: 3, col: 0, row: 3, x: 1430, y: 320, name: "VCO 2 OUT", input: false},
  {idx: 4, col: 0, row: 4, x: 1430, y: 397, name: "PLAY", input: true},
  {idx: 5, col: 0, row: 5, x: 1430, y: 470, name: "RHYTHM 1", input: true},
  {idx: 6, col: 0, row: 6, x: 1430, y: 546, name: "SEQ 1", input: false},
  {idx: 7, col: 0, row: 7, x: 1430, y: 622, name: "MIDI IN", input: true},

  {idx: 8, col: 1, row: 0, x: 1505, y: 90, name: "VCO 1 SUB", input: true},
  {idx: 9, col: 1, row: 1, x: 1505, y: 170, name: "VCO 1 SUB 1", input: false},
  {idx: 10, col: 1, row: 2, x: 1505, y: 243, name: "VCO 2 SUB", input: true},
  {idx: 11, col: 1, row: 3, x: 1505, y: 320, name: "VCO 2 SUB 1", input: false},
  {idx: 12, col: 1, row: 4, x: 1505, y: 397, name: "RESET", input: true},
  {idx: 13, col: 1, row: 5, x: 1505, y: 470, name: "RHYTHM 2", input: true},
  {idx: 14, col: 1, row: 6, x: 1505, y: 546, name: "SEQ 1 CLK", input: false},
  {idx: 15, col: 1, row: 7, x: 1505, y: 622, name: "CLOCK", input: true},

  {idx: 16, col: 2, row: 0, x: 1583, y: 90, name: "VCO 1 PWM", input: true},
  {idx: 17, col: 2, row: 1, x: 1583, y: 170, name: "VCO 1 SUB 2", input: false},
  {idx: 18, col: 2, row: 2, x: 1583, y: 243, name: "VCO 2 PWM", input: true},
  {idx: 19, col: 2, row: 3, x: 1583, y: 320, name: "VCO 2 SUB 2", input: false},
  {idx: 20, col: 2, row: 4, x: 1583, y: 397, name: "TRIGGER", input: true},
  {idx: 21, col: 2, row: 5, x: 1581, y: 470, name: "RHYTHM 3", input: true},
  {idx: 22, col: 2, row: 6, x: 1581, y: 546, name: "SEQ 2", input: false},
  {idx: 23, col: 2, row: 7, x: 1580, y: 622, name: "CLOCK", input: false},

  {idx: 24, col: 3, row: 0, x: 1660, y: 90, name: "VCA", input: false},
  {idx: 25, col: 3, row: 1, x: 1659, y: 170, name: "VCA", input: true},
  {idx: 26, col: 3, row: 2, x: 1659, y: 243, name: "VCA EG", input: false},
  {idx: 27, col: 3, row: 3, x: 1659, y: 320, name: "CUTOFF", input: true},
  {idx: 28, col: 3, row: 4, x: 1659, y: 397, name: "VCF EG", input: false},
  {idx: 29, col: 3, row: 5, x: 1659, y: 470, name: "RHYTHM 4", input: true},
  {idx: 30, col: 3, row: 6, x: 1657, y: 546, name: "SEQ 2 CLK", input: false},
  {idx: 31, col: 3, row: 7, x: 1657, y: 622, name: "TRIGGER", input: false},
]
const KNOBS = [ 
  {idx: 0, x: 598, y: 140, type: "large", name: "VCO 1 FREQ"},
  {idx: 1, x: 516, y: 290, type: "medium", name: "VCO 1 SUB FREQ 1"},
  {idx: 2, x: 676, y: 290, type: "medium", name: "VCO 1 SUB FREQ 2"}, 
  {idx: 3, x: 598, y: 485, type: "medium", name: "VCO 1 LEVEL"},
  {idx: 4, x: 516, y: 620, type: "medium", name: "VCO 1 SUB 1 LEVEL"},
  {idx: 5, x: 676, y: 620, type: "medium", name: "VCO 1 SUB 2 LEVEL"},

  // VCO 2
  {idx: 6, x: 913, y: 140, type: "large", name: "VCO 2 FREQ"},
  {idx: 7, x: 832, y: 290, type: "medium", name: "VCO 2 SUB FREQ 1"},
  {idx: 8, x: 989, y: 290, type: "medium", name: "VCO 2 SUB FREQ 2"},
  {idx: 9, x: 910, y: 485, type: "medium", name: "VCO 2 LEVEL"},
  {idx: 10, x: 832, y: 620, type: "medium", name: "VCO 2 SUB 1 LEVEL"},
  {idx: 11, x: 989, y: 620, type: "medium", name: "VCO 2 SUB 2 LEVEL"},

  // OTHER
  {idx: 12, x: 1150, y: 90, type: "large", name: "CUTOFF"},
  {idx: 13, x: 1318, y: 90, type: "large", name: "VOLUME"},
  {idx: 14, x: 1150, y: 270, type: "large", name: "RESONANCE"},
  {idx: 15, x: 1318, y: 270, type: "large", name: "VCF EG AMT"},
  {idx: 16, x: 1148, y: 450, type: "large", name: "VCF ATTACK"},
  {idx: 17, x: 1318, y: 450, type: "large", name: "VCF DECAY"},
  {idx: 18, x: 1148, y: 610, type: "large", name: "VCA ATTACK"},
  {idx: 19, x: 1318, y: 610, type: "large", name: "VCA DECAY"},

  // TEMPO
   {idx: 20, x: 120, y: 610, type: "large", name: "TEMPO"},
  
  // SEQUENCER 1
  {idx: 21, x: 69, y: 95, type: "small", name: "SEQ 1 STEP 1"},
  {idx: 22, x: 174, y: 95, type: "small", name: "SEQ 1 STEP 2"},
  {idx: 23, x: 280, y: 95, type: "small", name: "SEQ 1 STEP 3"},
  {idx: 24, x: 387, y: 95, type: "small", name: "SEQ 1 STEP 4"},

  // SEQUENCER 2
  {idx: 25, x: 69, y: 235, type: "small", name: "SEQ 2 STEP 1"},
  {idx: 26, x: 174, y: 235, type: "small", name: "SEQ 2 STEP 2"},
  {idx: 27, x: 280, y: 235, type: "small", name: "SEQ 2 STEP 3"},
  {idx: 28, x: 387, y: 235, type: "small", name: "SEQ 2 STEP 4"},

  // POLYRHYTHM
  {idx: 29, x: 69, y: 375, type: "small", name: "RHYTHM 1"},
  {idx: 30, x: 175, y: 375, type: "small", name: "RHYTHM 2"},
  {idx: 31, x: 281, y: 375, type: "small", name: "RHYTHM 3"},
  {idx: 32, x: 388, y: 375, type: "small", name: "RHYTHM 4"},
]
const KNOB_TYPES = {
  large: {radius: 55, limit: 304},
  medium: {radius: 55, limit: 304},
  small: {radius: 30, limit: 300},
}
const TOGGLES = [
  {idx: 0, x: 467, y: 124, type: "threeway", name: "VCO 1 WAVE"},
  {idx: 1, x: 998, y: 124, type: "threeway", name: "VCO 2 WAVE"},
  
  {idx: 2, x: 39, y: 428, type: "seq1_button", name: "SEQ1 RHYTHM 1"},
  {idx: 3, x: 144.75, y: 428, type: "seq1_button", name: "SEQ1 RHYTHM 2"},
  {idx: 4, x: 250.5, y: 428, type: "seq1_button", name: "SEQ1 RHYTHM 3"},
  {idx: 5, x: 356.5, y: 428, type: "seq1_button", name: "SEQ1 RHYTHM 4"},
  
  {idx: 6, x: 39, y: 478, type: "seq2_button", name: "SEQ2 RHYTHM 1"},
  {idx: 7, x: 144.75, y: 478, type: "seq2_button", name: "SEQ2 RHYTHM 2"},
  {idx: 8, x: 250.5, y: 478, type: "seq2_button", name: "SEQ2 RHYTHM 3"},
  {idx: 9, x: 356.5, y: 478, type: "seq2_button", name: "SEQ2 RHYTHM 4"},
  
  {idx: 10, x: 500.5, y: 366.5, type: "osc1_button", name: "SEQ1 ASSIGN OSC1"},
  {idx: 11, x: 574.5, y: 366.5, type: "sub1_button", name: "SEQ1 ASSIGN SUB1"},
  {idx: 12, x: 645.5, y: 366.5, type: "sub2_button", name: "SEQ1 ASSIGN SUB2"},
  
  {idx: 13, x: 815.5, y: 366.5, type: "osc2_button", name: "SEQ2 ASSIGN OSC2"},
  {idx: 14, x: 890.5, y: 366.5, type: "sub1_button", name: "SEQ2 ASSIGN SUB1"},
  {idx: 15, x: 961.5, y: 366.5, type: "sub2_button", name: "SEQ2 ASSIGN SUB2"},

  {idx: 16, x: 299.5, y: 547, type: "eg_button", name: "EG"},

  {idx: 17, x: 720, y: 80, type: "seqoct", name: "SEQOCT"},
  {idx: 18, x: 723, y: 335, type: "quantize", name: "QUANTIZE"},

]
const TOGGLE_TYPES = {
  threeway: {values: ["mid", "down", "up"]},
  twoway: {values: ["down", "up"]},
  button: {values: ["on", "off"]},
  seqoct: {values: ["seqoct_five", "seqoct_two", "seqoct_one"]},
  quantize: {values: ["quantize_12et", "quantize_8et", "quantize_12ji", "quantize_8ji", "quanitze_off"]},
  seq1_button: {values: ["seq1_off","seq1_on"]},
  seq2_button: {values: ["seq2_off", "seq2_on"]},
  eg_button: {values: ["eg_off", "eg_on"]},
  osc1_button: {values: ["osc1_off", "osc1_on"]},
  osc2_button: {values: ["osc2_off", "osc2_on"]},
  sub1_button: {values: ["sub1_off", "sub1_on"]},
  sub2_button: {values: ["sub2_off", "sub2_on"]},
}
const TOGGLE_WIDTH = 42
const TOGGLE_HEIGHT = 42

export class MoogSubharmonicon extends FrontPanel {
  constructor() {
    super({
      deviceName: "moog-subharmonicon",
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
        toggleValues: Array(20).fill(0)
      },
      images: {
        panel: "/images/subharmonicon/moog-subharmonicon-front.jpg",
        knobs: {
          large: "/images/subharmonicon/moog-subharmonicon-knob-large.png",
          medium: "/images/subharmonicon/moog-subharmonicon-knob-large.png",
          small: "/images/subharmonicon/moog-subharmonicon-knob-small.png"
        },
        toggles: {
          mid: "/images/subharmonicon/moog-subharmonicon-switch-mid.png",
          down: "/images/subharmonicon/moog-subharmonicon-switch-down.png",
          up: "/images/subharmonicon/moog-subharmonicon-switch-up.png",
          seqoct_five: "/images/subharmonicon/moog-subharmonicon-switch-seqoct-five.png",
          seqoct_two: "/images/subharmonicon/moog-subharmonicon-switch-seqoct-two.png",
          seqoct_one: "/images/subharmonicon/moog-subharmonicon-switch-seqoct-one.png",
          quantize_12et:"/images/subharmonicon/moog-subharmonicon-switch-quantize-12et.png",
          quantize_8et:"/images/subharmonicon/moog-subharmonicon-switch-quantize-8et.png",
          quantize_12ji:"/images/subharmonicon/moog-subharmonicon-switch-quantize-12ji.png",
          quantize_8ji:"/images/subharmonicon/moog-subharmonicon-switch-quantize-8ji.png",
          quantize_off:"/images/subharmonicon/moog-subharmonicon-switch-quantize-off.png",
          seq1_on: "/images/subharmonicon/moog-subharmonicon-switch-seq1-on.png",
          seq1_off:"/images/subharmonicon/moog-subharmonicon-switch-seq1-off.png",
          seq2_on: "/images/subharmonicon/moog-subharmonicon-switch-seq2-on.png",
          seq2_off:"/images/subharmonicon/moog-subharmonicon-switch-seq2-off.png",
          sub1_on: "/images/subharmonicon/moog-subharmonicon-switch-sub1-on.png",
          sub1_off:"/images/subharmonicon/moog-subharmonicon-switch-sub1-off.png",
          sub2_on: "/images/subharmonicon/moog-subharmonicon-switch-sub2-on.png",
          sub2_off:"/images/subharmonicon/moog-subharmonicon-switch-sub2-off.png",
          osc1_on: "/images/subharmonicon/moog-subharmonicon-switch-osc1-on.png",
          osc1_off:"/images/subharmonicon/moog-subharmonicon-switch-osc1-off.png",
          osc2_on: "/images/subharmonicon/moog-subharmonicon-switch-osc2-on.png",
          osc2_off:"/images/subharmonicon/moog-subharmonicon-switch-osc2-off.png",
          eg_on: "/images/subharmonicon/moog-subharmonicon-switch-eg-on.png",
          eg_off:"/images/subharmonicon/moog-subharmonicon-switch-eg-off.png",
        }
      }
    })
  }
}

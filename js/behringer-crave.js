import { FrontPanel } from "./front-panel"

//
// Some constants for locations of knobs and connectors, etc.
//
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 1035;
const CABLE_WIDTH = 6;
const CELL_RADIUS = 12;
const CONNECTORS = [
    //inputs
    //row 1
        {idx: 0, col: 0, row: 0, x: 325, y: 110, name: "VCO 1V/OCT", input: true},
        {idx: 1, col: 1, row: 0, x: 390, y: 110, name: "VCO LIN FM", input: true},
        {idx: 2, col: 2, row: 0, x: 457, y: 110, name: "VCO MOD", input: true},
        {idx: 3, col: 3, row: 0, x: 525, y: 110, name: "VCF CUTOFF", input: true},
        {idx: 4, col: 4, row: 0, x: 590, y: 110, name: "VCF RES.", input: true},
        {idx: 5, col: 5, row: 0, x: 655, y: 110, name: "MIX 1", input: true},
        {idx: 6, col: 6, row: 0, x: 720, y: 110, name: "MIX 2", input: true},
        {idx: 7, col: 7, row: 0, x: 785, y: 110, name: "VC MIX CTRL", input: true},
        {idx: 8, col: 8, row: 0, x: 850, y: 110, name: "MULT", input: true},
//row 2
        {idx: 9, col: 0, row: 1, x: 325, y: 175, name: "MIX CV", input: true},
        {idx: 10, col: 1, row: 1, x: 390, y: 175, name: "EXT. AUDIO", input: true},
        {idx: 11, col: 2, row: 1, x: 457, y: 175, name: "TEMPO", input: true},
        {idx: 12, col: 3, row: 1, x: 525, y: 175, name: "RUN/STOP", input: true},
        {idx: 13, col: 4, row: 1, x: 590, y: 175, name: "RESET", input: true},
        {idx: 14, col: 5, row: 1, x: 655, y: 175, name: "HOLD", input: true},
        {idx: 15, col: 6, row: 1, x: 720, y: 175, name: "GATE", input: true},
        {idx: 16, col: 7, row: 1, x: 785, y: 175, name: "VCA CV", input: true},
        {idx: 17, col: 8, row: 1, x: 850, y: 175, name: "LFO RATE", input: true},

    //outputs
    //row 1
    {idx: 18, col: 9, row: 0, x: 915, y: 110, name: "MULT 1", input: false},
    {idx: 19, col: 10, row: 0, x: 980, y: 110, name: "MULT 2", input: false},
    {idx: 20, col: 11, row: 0, x: 1045, y: 110, name: "VCO PULSE", input: false},
    {idx: 21, col: 12, row: 0, x: 1110, y: 110, name: "VCO SAW", input: false},
    {idx: 22, col: 13, row: 0, x: 1177, y: 110, name: "EG", input: false},
    {idx: 23, col: 14, row: 0, x: 1245, y: 110, name: "NOISE", input: false},
    {idx: 24, col: 15, row: 0, x: 1310, y: 110, name: "VCA", input: false},

    //outputs
    //row 2
    {idx: 25, col: 9, row: 1, x: 915, y: 175, name: "LFO TRI", input: false},
    {idx: 26, col: 10, row: 1, x: 980, y: 175, name: "LFO SQ", input: false},
    {idx: 27, col: 11, row: 1, x: 1045, y: 175, name: "VC MIX", input: false},
    {idx: 28, col: 12, row: 1, x: 1110, y: 175, name: "ASSIGN", input: false},
    {idx: 29, col: 13, row: 1, x: 1177, y: 175, name: "KB", input: false},
    {idx: 30, col: 14, row: 1, x: 1247, y: 175, name: "GATE", input: false},
    {idx: 31, col: 15, row: 1, x: 1310, y: 175, name: "VCF", input: false},
    {idx: 32, col: 16, row: 0, x: 1373, y: 110, name: "PHONES", input: false},
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
  large: {radius: 30, limit: 310}
}
const TOGGLES = [
  {idx: 0, x: 300, y: 375, type: "twoway", name: "VCO WAVE"},
  {idx: 1, x: 473, y: 375, type: "twoway", name: "VCO MOD SOURCE"},
  {idx: 2, x: 645, y: 375, type: "twoway", name: "VCO MOD DEST"},
  {idx: 3, x: 998, y: 475, type: "twoway", name: "LFO WAVE"},
  {idx: 4, x: 825, y: 375, type: "twoway", name: "VCF MODE"},
  {idx: 5, x: 998, y: 375, type: "twoway", name: "VCF MOD SOURCE"},
  {idx: 6, x: 645, y: 475, type: "twoway", name: "SUSTAIN"},
  {idx: 7, x: 1344, y: 375, type: "twoway", name: "VCA MODE"},
  {idx: 8, x: 1170, y: 375, type: "twoway", name: "VCF MOD POLARITY"}
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
        knobValues: Array(15).fill(158),
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

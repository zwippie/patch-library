import { FrontPanel } from "./front-panel"

//
// Some constants for locations of knobs and connectors, etc.
//
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 359;
const CABLE_WIDTH = 5;
const CELL_RADIUS = 12;
const CONNECTORS = [ 
    // Connectors are grouped by row idx
    {idx: 0, col: 0, row: 0, x: 978, y: 40, name: "SIGNAL OUTPUT", input: false},

    {idx: 1, col: 0, row: 1, x: 617, y: 77, name: "TOTAL FM", input: true},
    {idx: 2, col: 1, row: 1, x: 672, y: 77, name: "FREQ", input: true},
    {idx: 3, col: 2, row: 1, x: 715, y: 77, name: "EXT SIGNAL", input: true},
    {idx: 4, col: 3, row: 1, x: 757, y: 77, name: "HP CUTOFF FREQ", input: true},
    {idx: 5, col: 4, row: 1, x: 804, y: 77, name: "LP CUTOFF FREQ", input: true},
    {idx: 6, col: 5, row: 1, x: 853, y: 77, name: "INITIAL GAIN", input: true},
    {idx: 7, col: 6, row: 1, x: 978, y: 77, name: "PHONES", input: false},

    {idx: 8, col: 0, row: 2, x: 617, y: 126, name: "LFO SAW/TRI", input: false},
    {idx: 9, col: 1, row: 2, x: 692, y: 126, name: "LFO PULSE/SQR", input: false},
    {idx: 10, col: 2, row: 2, x: 729, y: 126, name: "EG 1 POSITIVE", input: false},
    {idx: 11, col: 3, row: 2, x: 873, y: 126, name: "EG 2 NEGATIVE", input: false},
    {idx: 12, col: 4, row: 2, x: 941, y: 126, name: "VCO 1+2 FM", input: true},
    {idx: 13, col: 5, row: 2, x: 978, y: 126, name: "KBD CV", input: false},

    {idx: 14, col: 0, row: 3, x: 905, y: 145, name: "VCO 2 FM", input: true},

    {idx: 15, col: 0, row: 4, x: 655, y: 163, name: "S&H CLOCK", input: true},
    {idx: 16, col: 1, row: 4, x: 729, y: 163, name: "EG 1 NEGATIVE", input: false},
    {idx: 17, col: 2, row: 4, x: 767, y: 163, name: "VCA 2 CV", input: true},
    {idx: 18, col: 3, row: 4, x: 825, y: 163, name: "EG 2 TRIGGER", input: true},
    {idx: 19, col: 4, row: 4, x: 941, y: 163, name: "EG 1+2 TRIGGER", input: true},
    {idx: 20, col: 5, row: 4, x: 978, y: 163, name: "KBD TRIGGER", input: false},

    {idx: 21, col: 0, row: 5, x: 617, y: 201, name: "S&H INPUT", input: true},
    {idx: 22, col: 1, row: 5, x: 692, y: 201, name: "S&H OUTPUT", input: false},
    {idx: 23, col: 2, row: 5, x: 729, y: 201, name: "VCA 2 INPUT", input: true},
    {idx: 24, col: 3, row: 5, x: 787, y: 201, name: "VCA 2 OUTPUT", input: false},
    {idx: 25, col: 4, row: 5, x: 825, y: 201, name: "PINK NOISE", input: false},
    {idx: 26, col: 5, row: 5, x: 900, y: 201, name: "WHITE NOISE", input: false},
    {idx: 27, col: 6, row: 5, x: 941, y: 201, name: "MOD WHEEL", input: false},
    {idx: 28, col: 7, row: 5, x: 978, y: 201, name: "PUSH BUTTON", input: false},

    {idx: 29, col: 0, row: 6, x: 617, y: 253, name: "EXT SIGNAL INPUT", input: true},
    {idx: 30, col: 1, row: 6, x: 692, y: 253, name: "EXT AMP OUTPUT", input: false},
    {idx: 31, col: 2, row: 6, x: 767, y: 253, name: "EXT FILTER OUTPUT", input: false},
    {idx: 32, col: 3, row: 6, x: 842, y: 253, name: "EXT CONVERTER OUTPUT", input: false},
    {idx: 33, col: 4, row: 6, x: 941, y: 253, name: "EXT ENV OUTPUT", input: false},
    {idx: 34, col: 5, row: 6, x: 978, y: 253, name: "EXT TRIGGER OUTPUT", input: false},
]
const KNOBS = [
    // Knobs are grouped by column idx
    {idx: 0, x: 51, y: 75, type: "rotary", name: "VCO 1 WAVEFORM"},
    {idx: 1, x: 51.5, y: 147, type: "small", name: "VCO 1 PULSE WIDTH"},
    {idx: 2, x: 51, y: 222, type: "rotary", name: "VCO 1 SCALE"},
    {idx: 3, x: 51.5, y: 308, type: "small", name: "PORTAMENTO"},
    
    {idx: 4, x: 129, y: 75, type: "rotary", name: "VCO 2 WAVEFORM"},
    {idx: 5, x: 130.5, y: 147, type: "small", name: "VCO 2 PITCH"},
    {idx: 6, x: 129, y: 222, type: "rotary", name: "VCO 2 SCALE"},
    {idx: 7, x: 130.5, y: 308, type: "small", name: "MASTER TUNE"},
    
    {idx: 8, x: 205.5, y: 74, type: "small", name: "VCO 1 LEVEL"},
    {idx: 9, x: 205.5, y: 155, type: "small", name: "VCO 2 LEVEL"},
    {idx: 10, x: 205.5, y: 249, type: "small", name: "MG FM"},
    {idx: 11, x: 205.5, y: 308, type: "small", name: "EG 1 FM"},

    {idx: 12, x: 276.5, y: 74, type: "large", name: "HP CUTOFF"},
    {idx: 13, x: 276.5, y: 155, type: "small", name: "PEAK HP"},
    {idx: 14, x: 276.5, y: 249, type: "small", name: "MG CFM HP"},
    {idx: 15, x: 276.5, y: 308, type: "small", name: "EG 2 CFM HP"},
    
    {idx: 16, x: 347.5, y: 74, type: "large", name: "LP CUTOFF"},
    {idx: 17, x: 347.5, y: 155, type: "small", name: "PEAK LP"},
    {idx: 18, x: 347.5, y: 249, type: "small", name: "MG CFM LP"},
    {idx: 19, x: 347.5, y: 308, type: "small", name: "EG 2 CFM LP"},

    {idx: 20, x: 418.5, y: 249, type: "small", name: "MG WAVEFORM"},
    {idx: 21, x: 418.5, y: 308, type: "small", name: "MG FREQUENCY"},

    {idx: 22, x: 489.5, y: 190, type: "small", name: "EG 1 DELAY"},
    {idx: 23, x: 489.5, y: 249, type: "small", name: "EG 1 ATTACK"},
    {idx: 24, x: 489.5, y: 308, type: "small", name: "EG 1 RELEASE"},

    {idx: 25, x: 560.5, y: 73, type: "small", name: "EG 2 HOLD"},
    {idx: 26, x: 560.5, y: 131, type: "small", name: "EG 2 ATTACK"},
    {idx: 27, x: 560.5, y: 190, type: "small", name: "EG 2 DECAY"},
    {idx: 28, x: 560.5, y: 249, type: "small", name: "EG 2 SUSTAIN"},
    {idx: 29, x: 560.5, y: 308, type: "small", name: "EG 2 RELEASE"},

    {idx: 30, x: 627.5, y: 308, type: "small", name: "EXT SIGNAL LEVEL"},
    {idx: 31, x: 683.5, y: 308, type: "small", name: "EXT LOW CUT"},
    {idx: 32, x: 739.5, y: 308, type: "small", name: "EXT HIGH CUT"},
    {idx: 33, x: 795.5, y: 308, type: "small", name: "EXT CV ADJUST"},
    {idx: 34, x: 851.5, y: 308, type: "small", name: "EXT THRESHOLD"},

    {idx: 35, x: 918.5, y: 61, type: "volume", name: "VOLUME / POWER"},
]
const KNOB_TYPES = {
  rotary: {radius: 57, limit: 90},
  small: {radius: 41, limit: 300},
  large: {radius: 57, limit: 300},
  volume: {radius: 57, limit: 300},
}

// no toggles on the MS-20
const TOGGLES = [] 
const TOGGLE_TYPES = {}

const TOGGLE_WIDTH = 40
const TOGGLE_HEIGHT = 40

export class KorgMs20 extends FrontPanel {
  constructor() {
    super({
      deviceName: "korg-ms-20",
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
        knobValues: [
            ...Array(5).fill(0), 
            150, 
            0, 
            150, 
            ...Array(12).fill(0), 
            150, 
            ...Array(14).fill(0), 
            180
        ],
        toggleValues: []
      },
      images: {
        panel: "/images/ms-20/ms-20-front.png",
        knobs: {
          rotary: "/images/ms-20/ms-20-knob-rotary.png",
          small: "/images/ms-20/ms-20-knob-small.png",
          large: "/images/ms-20/ms-20-knob-large.png",
          volume: "/images/ms-20/ms-20-knob-volume.png"
        },
      }
    })
  }

}

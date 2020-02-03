import { FrontPanel } from "./front-panel"

const CANVAS_WIDTH = 1598;
const CANVAS_HEIGHT = 530;
const CELL_RADIUS = 12;
const CONNECTORS = [
  {idx: 0, col: 0, row: 0, x: 1215, y: 81, name: "OSC1", input: true},
  {idx: 1, col: 0, row: 1, x: 1215, y: 131, name: "SHAPE1", input: true},
  {idx: 2, col: 0, row: 2, x: 1215, y: 182, name: "VCF IN", input: true},
  {idx: 3, col: 0, row: 3, x: 1215, y: 232, name: "VCA IN", input: true},
  {idx: 4, col: 0, row: 4, x: 1215, y: 283, name: "E.GATE1", input: true},
  {idx: 5, col: 0, row: 5, x: 1215, y: 333, name: "LFO RATE", input: true},
  {idx: 6, col: 0, row: 6, x: 1215, y: 384, name: "ATT1 IN", input: true},
  {idx: 7, col: 0, row: 7, x: 1215, y: 434, name: "SUM 1[A]", input: true},
  {idx: 8, col: 1, row: 0, x: 1268, y: 81, name: "OSC2", input: true},
  {idx: 9, col: 1, row: 1, x: 1268, y: 131, name: "SHAPE2", input: true},
  {idx: 10, col: 1, row: 2, x: 1268, y: 182, name: "FREQ MOD", input: true},
  {idx: 11, col: 1, row: 3, x: 1268, y: 232, name: "VCA CV", input: true},
  {idx: 12, col: 1, row: 4, x: 1268, y: 283, name: "E.GATE2", input: true},
  {idx: 13, col: 1, row: 5, x: 1268, y: 333, name: "LFO SHAPE", input: true},
  {idx: 14, col: 1, row: 6, x: 1268, y: 384, name: "ATT1 CV", input: true},
  {idx: 15, col: 1, row: 7, x: 1268, y: 434, name: "SUM 1[B]", input: true},
  {idx: 16, col: 2, row: 0, x: 1321, y: 81, name: "OSC1+2", input: true},
  {idx: 17, col: 2, row: 1, x: 1321, y: 131, name: "PW1", input: true},
  {idx: 18, col: 2, row: 2, x: 1321, y: 182, name: "RES", input: true},
  {idx: 19, col: 2, row: 3, x: 1321, y: 232, name: "DELAY IN", input: true},
  {idx: 20, col: 2, row: 4, x: 1321, y: 283, name: "S&H IN", input: true},
  {idx: 21, col: 2, row: 5, x: 1321, y: 333, name: "LFO TRIG", input: true},
  {idx: 22, col: 2, row: 6, x: 1321, y: 384, name: "ATT2 IN", input: true},
  {idx: 23, col: 2, row: 7, x: 1321, y: 434, name: "SUM 2[A]", input: true},
  {idx: 24, col: 3, row: 0, x: 1374, y: 81, name: "INVERT IN", input: true},
  {idx: 25, col: 3, row: 1, x: 1374, y: 131, name: "PW2", input: true},
  {idx: 26, col: 3, row: 2, x: 1374, y: 182, name: "OD IN", input: true},
  {idx: 27, col: 3, row: 3, x: 1374, y: 232, name: "DELAY TIME", input: true},
  {idx: 28, col: 3, row: 4, x: 1374, y: 283, name: "S&H CLOCK", input: true},
  {idx: 29, col: 3, row: 5, x: 1374, y: 333, name: "MULT", input: true},
  {idx: 30, col: 3, row: 6, x: 1374, y: 384, name: "SLEW IN", input: true},
  {idx: 31, col: 3, row: 7, x: 1374, y: 434, name: "SUM 2[B]", input: true},
  {idx: 32, col: 4, row: 0, x: 1426, y: 81, name: "OSC1", input: false},
  {idx: 33, col: 4, row: 1, x: 1426, y: 131, name: "VCF1", input: false},
  {idx: 34, col: 4, row: 2, x: 1426, y: 182, name: "VCA", input: false},
  {idx: 35, col: 4, row: 3, x: 1426, y: 232, name: "ENV1", input: false},
  {idx: 36, col: 4, row: 4, x: 1426, y: 283, name: "LFO", input: false},
  {idx: 37, col: 4, row: 5, x: 1426, y: 333, name: "MULT1", input: false},
  {idx: 38, col: 4, row: 6, x: 1426, y: 384, name: "ATT1", input: false},
  {idx: 39, col: 4, row: 7, x: 1426, y: 434, name: "SUM1", input: false},
  {idx: 40, col: 5, row: 0, x: 1479, y: 81, name: "OSC2", input: false},
  {idx: 41, col: 5, row: 1, x: 1479, y: 131, name: "VCF2", input: false},
  {idx: 42, col: 5, row: 2, x: 1479, y: 182, name: "OUTPUT", input: false},
  {idx: 43, col: 5, row: 3, x: 1479, y: 232, name: "ENV2", input: false},
  {idx: 44, col: 5, row: 4, x: 1479, y: 283, name: "LFO UNI", input: false},
  {idx: 45, col: 5, row: 5, x: 1479, y: 333, name: "MULT2", input: false},
  {idx: 46, col: 5, row: 6, x: 1479, y: 384, name: "ATT2", input: false},
  {idx: 47, col: 5, row: 7, x: 1479, y: 434, name: "SUM2", input: false},
  {idx: 48, col: 6, row: 0, x: 1532, y: 81, name: "OSC MIX", input: false},
  {idx: 49, col: 6, row: 1, x: 1532, y: 131, name: "OVERDRIVE", input: false},
  {idx: 50, col: 6, row: 2, x: 1532, y: 182, name: "NOISE", input: false},
  {idx: 51, col: 6, row: 3, x: 1532, y: 232, name: "INVERT", input: false},
  {idx: 52, col: 6, row: 4, x: 1532, y: 283, name: "S&H", input: false},
  {idx: 53, col: 6, row: 5, x: 1532, y: 333, name: "MIDI GATE", input: false},
  {idx: 54, col: 6, row: 6, x: 1532, y: 384, name: "SLEW", input: false},
  {idx: 55, col: 6, row: 7, x: 1532, y: 434, name: "ASSIGN", input: false}
];
const KNOBS = [
  {idx: 0, x: 131, y: 178, type: "large", name: "OSC1 TUNE"},
  {idx: 1, x: 317, y: 179, type: "large", name: "OSC2 TUNE"},
  {idx: 2, x: 225, y: 126, type: "small", name: "OSC MIX"},
  {idx: 3, x: 131, y: 425, type: "small", name: "OSC1 WIDTH"},
  {idx: 4, x: 317, y: 425, type: "small", name: "OSC2 WIDTH"},
  {idx: 5, x: 463, y: 87, type: "small", name: "VCF FREQ"},
  {idx: 6, x: 463, y: 200, type: "small", name: "VCF RESONANCE"},
  {idx: 7, x: 463, y: 313, type: "small", name: "VCF MOD DEPTH"},
  {idx: 8, x: 463, y: 425, type: "small", name: "VCF ENV DEPTH"},
  {idx: 9, x: 655, y: 87, type: "small", name: "LFO RATE"},
  {idx: 10, x: 607, y: 185, type: "medium", name: "LFO SHAPE"},
  {idx: 11, x: 559, y: 313, type: "small", name: "NOISE"},
  {idx: 12, x: 559, y: 425, type: "small", name: "VCA BIAS"},
  {idx: 13, x: 750, y: 87, type: "small", name: "DELAY TIME"},
  {idx: 14, x: 847, y: 87, type: "small", name: "DELAY REPEATS"},
  {idx: 15, x: 943, y: 87, type: "small", name: "DELAY MIX"},
  {idx: 16, x: 750, y: 200, type: "small", name: "OVERDRIVE DRIVE"},
  {idx: 17, x: 847, y: 200, type: "small", name: "OVERDRIVE TONE"},
  {idx: 18, x: 943, y: 200, type: "small", name: "OVERDRIVE LEVEL"},
  {idx: 19, x: 655, y: 313, type: "small", name: "ENV1 ATTACK"},
  {idx: 20, x: 750, y: 313, type: "small", name: "ENV1 DECAY"},
  {idx: 21, x: 847, y: 313, type: "small", name: "ENV1 SUSTAIN"},
  {idx: 22, x: 943, y: 313, type: "small", name: "ENV1 RELEASE"},
  {idx: 23, x: 655, y: 425, type: "small", name: "ENV2 ATTACK"},
  {idx: 24, x: 750, y: 425, type: "small", name: "ENV2 DECAY"},
  {idx: 25, x: 847, y: 425, type: "small", name: "ENV2 SUSTAIN"},
  {idx: 26, x: 943, y: 425, type: "small", name: "ENV2 RELEASE"},
  {idx: 27, x: 1039, y: 87, type: "small", name: "OUTPUT VOLUME"},
  {idx: 28, x: 1039, y: 200, type: "small", name: "S&H RATE"},
  {idx: 29, x: 1135, y: 200, type: "small", name: "S&H GLIDE"},
  {idx: 30, x: 1039, y: 313, type: "small", name: "SLEW RATE"},
  {idx: 31, x: 1135, y: 313, type: "small", name: "PORTA TIME"},
  {idx: 32, x: 1039, y: 425, type: "small", name: "ATTENUATOR 1"},
  {idx: 33, x: 1135, y: 425, type: "small", name: "ATTENUATOR 2"},
  {idx: 34, x: 131, y: 313, type: "none", name: "OSC1 SHAPE"},
  {idx: 35, x: 317, y: 313, type: "none", name: "OSC2 SHAPE"}
];
const KNOB_TYPES = {
  large: {radius: 50, limit: 300},
  medium: {radius: 40, limit: 300},
  small: {radius: 30, limit: 300},
  none: {radius: 30, limit: 300}
}
const BUTTONS = [
  {idx: 0, x: 182.5, y: 313, name: "OSC1 RANGE"},
  {idx: 1, x: 238, y: 313, name: "OSC2 RANGE"},
  {idx: 2, x: 388, y: 74, name: "VCF MODE"},
  {idx: 3, x: 210, y: 371, name: "OSC SYNC"},
  {idx: 4, x: 210, y: 423.5, name: "PARAPHONIC"},
  {idx: 5, x: 449, y: 248, name: "VCF KEY TRK"},
  {idx: 6, x: 545, y: 74, name: "LFO KEY SYNC"},
]
const BUTTON_WIDTH = 27;
const BUTTON_HEIGHT = 26;

const LIGHTS = [
  {idx: 0, x: 81, y: 365}, // osc1 type bottom
  {idx: 1, x: 81, y: 337},
  {idx: 2, x: 81, y: 308},
  {idx: 3, x: 81, y: 278},
  {idx: 4, x: 81, y: 250}, // osc1 type top

  {idx: 5, x: 357, y: 250},
  {idx: 6, x: 357, y: 278},
  {idx: 7, x: 357, y: 308},
  {idx: 8, x: 357, y: 337},
  {idx: 9, x: 357, y: 365}, // osc2 type bottom

  {idx: 10, x: 573, y: 220}, // lfo shape left
  {idx: 11, x: 557, y: 166},
  {idx: 12, x: 602, y: 133},
  {idx: 13, x: 647, y: 166},
  {idx: 14, x: 631, y: 220},

  {idx: 15, x: 196, y: 280}, // osc1 range bottom
  {idx: 16, x: 196, y: 251},
  {idx: 17, x: 196, y: 221},

  {idx: 18, x: 242, y: 280}, // osc2 range bottom
  {idx: 19, x: 242, y: 251},
  {idx: 20, x: 242, y: 221},

  {idx: 21, x: 396, y: 172}, // vcf type bottom
  {idx: 22, x: 396, y: 147},
  {idx: 23, x: 396, y: 123},
]
const LIGHT_DIAMETER = 10;
// Map light type to LIGHTS idx offset
const LIGHT_VALUE_OFFSETS = {
  "OSC1 SHAPE": 0,
  "OSC2 SHAPE": 5,
  "LFO SHAPE": 10,
  "OSC1 RANGE": 15,
  "OSC2 RANGE": 18,
  "VCF MODE": 21,
}

const initialKnobValues = function() {
  let knobValues = Array(36).fill(150)
  // These knobs should be turned all the way down for a new blank patch
  knobValues[7] = 0
  knobValues[8] = 0
  knobValues[11] = 0
  knobValues[12] = 0
  knobValues[29] = 0
  knobValues[30] = 0
  knobValues[31] = 0
  knobValues[32] = 0
  knobValues[33] = 0
  knobValues[34] = 0
  knobValues[35] = 300
  return knobValues
}

export class BehringerNeutron extends FrontPanel {
  constructor() {
    super({
      deviceName: "behringer-neutron",
      canvasWidth: CANVAS_WIDTH,
      canvasHeight: CANVAS_HEIGHT,
      connectors: CONNECTORS,
      knobs: KNOBS,
      buttons: BUTTONS,
      lights: LIGHTS,
      connectorOptions: {
        cellRadius: CELL_RADIUS
      },
      buttonOptions: {
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT
      },
      knobTypes: KNOB_TYPES,
      initialValues: {
        knobValues: initialKnobValues(),
        buttonValues: Array(7).fill(false),
        lightValues: {
          "OSC1 RANGE": 0, // 0-3 3=all
          "OSC2 RANGE": 0, // 0-3 3=all
          "VCF MODE": 0, // 0-2
        }
      },
      images: {
        panel: "/images/neutron/neutron-front.png",
        knobs: {
          large: "/images/neutron/neutron-knob-large.png",
          medium: "/images/neutron/neutron-knob-medium.png",
          small: "/images/neutron/neutron-knob-small-2.png",
          none: "/images/neutron/neutron-knob-none.png"
        },
        buttons: {
          off: "/images/neutron/neutron-button-off.png",
          on: "/images/neutron/neutron-button-on.png"
        },
        lights: {
          bright: "/images/neutron/neutron-light-bright.png"
        }
      }
    })
  }

  onButtonClick(button) {
    if (button.idx <= 2) {
      // button for osc shape or vcf mode
      const noLights = button.name.endsWith("RANGE") ? 4 : 3
      this.lightValues[button.name] = ++this.lightValues[button.name] % noLights
    } else {
      // regular switch button
      this.buttonValues[button.idx] = !this.buttonValues[button.idx]
    }
  }

  drawLights() {
    this.ctx.save()
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = "yellow";

    this.drawOscShapeLights("OSC1 SHAPE", this.knobValues[34])
    this.drawOscShapeLights("OSC2 SHAPE", this.knobValues[35])
    this.drawOscShapeLights("LFO SHAPE", this.knobValues[10])

    const lightBrightImage = this.images.lights.bright

    for (const key of Object.keys(this.lightValues)) {
      const value = this.lightValues[key]
      if (key.endsWith("RANGE")) {
        // OSC1/2 RANGE, single light or all lights
        if (value == 3) {
          for (var idx = 0; idx < 3 ; idx++) {
            const light = this.lights[LIGHT_VALUE_OFFSETS[key] + idx]
            this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
            this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
          }
        } else {
          const light = this.lights[LIGHT_VALUE_OFFSETS[key] + this.lightValues[key]]
          this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
          this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
        }
      } else if (key == "VCF MODE") {
        const light = this.lights[LIGHT_VALUE_OFFSETS[key] + this.lightValues[key]]
        this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
        this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
      }
    }

    this.ctx.restore();
  }

  // OSC SHAPE with all its in-between values and lightning
  drawOscShapeLights(key, value) {
    const lightBrightImage = this.images.lights.bright
    const mainLightIdx = Math.round(value / 75);
    let light =  this.lights[LIGHT_VALUE_OFFSETS[key] + mainLightIdx]
    this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)

    // 0 - 75 -> 25 - 50
    if (value > 25 && value < 50) {
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 0]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 1]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
    }
    // 75 - 150 -> 100 - 125
    else if (value > 100 && value < 125) {
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 1]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 2]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
    }
    // 150 - 225 -> 175 - 200
    else if (value > 175 && value < 200) {
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 2]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 3]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
    }
    // 225 - 300 -> 250 - 275
    else if (value > 250 && value < 275) {
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 3]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
      light =  this.lights[LIGHT_VALUE_OFFSETS[key] + 4]
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
    }
    else {
      this.ctx.drawImage(lightBrightImage, light.x, light.y, LIGHT_DIAMETER, LIGHT_DIAMETER)
    }
  }
}

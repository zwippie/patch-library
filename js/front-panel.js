/*
  A generic front panel simulator with cables to patch and knobs to turn/press.
  Support for:
  - connectors (draw)
  - knobs (turn)
  - buttons (press, needs custom click handler)
  - toggles (switches)
  - lights (react to buttons/knobs, needs custom drawLight handler)
*/

const CABLE_COLORS = ["#ff3366", "#ff6633", "#FFCC33", "#33FF66", "#33FFCC", "#33CCFF", "#3366FF", "#6633FF", "#CC33FF", "#efefef"]
const DEFAULT_CABLE_WIDTH = 4

class FrontPanel {
  constructor(options) {
    const {deviceName, canvasWidth, canvasHeight, buttons, knobs, connectors, toggles,
      lights, initialValues, buttonOptions, connectorOptions, knobTypes, toggleOptions,
      lightOptions, images} = options

    // The canvas, input elements and images
    this.canvas = document.querySelector(`canvas[data-device='${deviceName}']`);
    this.ctx = this.canvas.getContext('2d');
    this.raf; // requestAnimationFrame
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.cableColors = CABLE_COLORS;
    this.lastCableColorIdx = 0;

    this.knobs = knobs || []
    this.connectors = connectors || []
    this.buttons = buttons || []
    this.toggles = toggles || []
    this.lights = lights || []

    this.knobTypes = knobTypes
    this.buttonOptions = buttonOptions
    this.connectorOptions = connectorOptions
    this.toggleOptions = toggleOptions
    this.lightOptions = lightOptions

    this.patchCableOutput = document.getElementById('patch-cable-output');
    this.patchCableData = document.getElementById('patch_data');
    this.savePatchButton = document.getElementById('save-patch');
    this.patchTitleInput = document.getElementById('patch_title');
    this.patchAuthorInput = document.getElementById('patch_author');
    this.patchNotesInput = document.getElementById('patch_notes');
    this.patchTagsInput = document.getElementById('patch_tags');

    this.patchScreenshotCanvas = document.getElementById('patch_screenshot_canvas');
    this.patchScreenshotCtx;
    if (this.patchScreenshotCanvas) {
      this.patchScreenshotCtx = this.patchScreenshotCanvas.getContext('2d');
    }
    this.patchScreenshotImage = document.getElementById('patch_screenshot_image');

    // Cable dragging
    this.dragging = false;
    this.dragFromIdx;
    this.dragFromInput = false;
    this.dragColor;
    this.dragToX;
    this.dragToY;
    this.dragToIdx;

    // Knob turning
    this.turning = false;
    this.turnKnobIdx;
    this.turnOldValue;
    this.turnNewValue;
    this.turnPreviousY;

    // Current patch data
    // this.connections = [
    //   {from: 0, to: 36, color: CABLE_COLORS[9]},
    //   {from: 15, to: 49, color: CABLE_COLORS[0]}
    // ]
    this.connections = initialValues.connections || []
    this.knobValues = initialValues.knobValues || []
    this.buttonValues = initialValues.buttonValues || []
    this.toggleValues = initialValues.toggleValues || []
    this.lightValues = initialValues.lightValues || {}


    // Init
    this.loadPatchData();
    this.updatePatchCableOutput();
    this.addAllEventListeners()
    this.images = this.loadImages(images)
    this.requestRedraw()
  }


  //
  // Draw functions
  //

  requestRedraw() {
    this.raf = window.requestAnimationFrame(() => this.draw())
  }

  // Main draw loop, only active when dragging or turning
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // clear canvas

    this.ctx.save();
    this.ctx.drawImage(this.images.panel, 0, 0);
    this.ctx.restore();

    this.knobs.forEach(knob => this.drawKnob(knob))
    this.buttons.forEach(button => this.drawButton(button))
    this.toggles.forEach(toggle => this.drawToggle(toggle))
    this.connections.forEach(connection => this.drawConnection(connection))
    this.drawLights()

    if (this.dragging) {
      const from = this.connectors[this.dragFromIdx];
      const to = {x: this.dragToX, y: this.dragToY}
      this.drawCable(from, to, this.dragColor);
    }

    if (this.dragging || this.turning) {
      this.requestRedraw()
    }
  }

  drawKnob(knob) {
    const value = this.knobValues[knob.idx]
    const knobImage = this.images.knobs[knob.type]
    if (!knobImage) { return }
    const knobType = this.knobTypes[knob.type]

    this.ctx.save();
    this.ctx.translate(knob.x, knob.y);
    this.ctx.rotate(value * Math.PI / 180);
    this.ctx.drawImage(knobImage, -knobImage.width / 2, -knobImage.height / 2);
    this.ctx.restore()
  }

  drawConnection(connection) {
    const from = this.connectors[connection.from];
    const to = this.connectors[connection.to];
    this.drawCable(from, to, connection.color);
  }

  drawCable(from, to, color) {
    this.ctx.save()
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = this.connectorOptions.cableWidth || DEFAULT_CABLE_WIDTH
    this.ctx.moveTo(from.x, from.y);
    const dx = Math.abs(from.x - to.x);
    const cx = Math.min(from.x, to.x) + (dx / 2);
    const cy = Math.max(from.y, to.y) + 160;

    this.ctx.quadraticCurveTo(cx, cy, to.x, to.y);
    this.ctx.stroke();
    this.ctx.restore()
  }

  drawButton(button) {
    const value = this.buttonValues[button.idx]
    const btnImage = this.images.buttons[value ? "on" : "off"]

    this.ctx.save()
    if (value) {
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = "blue";
    }
    this.ctx.drawImage(btnImage, button.x, button.y)
    this.ctx.restore();
  }

  drawToggle(toggle) {
    const value = this.toggleValues[toggle.idx]
    const toggleValue = this.toggleOptions.types[toggle.type].values[value]
    const toggleImage = this.images.toggles[toggleValue]

    this.ctx.save()
    this.ctx.drawImage(toggleImage, toggle.x, toggle.y)
    this.ctx.restore()
  }

  // To be overridden in subclass
  drawLights() {}


  //
  // Helper functions
  //

  // Object with src values, can be nested one level deep
  loadImages(imagesConfig) {
    let newImages = {}
    for (let name in imagesConfig) {
      if (imagesConfig.hasOwnProperty(name)) {
        if (typeof(imagesConfig[name]) === "string") {
          newImages[name] = new Image()
          newImages[name].addEventListener("load", () => this.requestRedraw())
          newImages[name].src = imagesConfig[name]
        } else {
          newImages[name] = newImages[name] || {}
          for (let subname in imagesConfig[name]) {
            if (imagesConfig[name].hasOwnProperty(subname)) {
              newImages[name][subname] = new Image()
              newImages[name][subname].addEventListener("load", () => this.requestRedraw())
              newImages[name][subname].src = imagesConfig[name][subname]
            }
          }
        }
      }
    }
    return newImages
  }

  nextCableColor() {
    this.lastCableColorIdx = ++this.lastCableColorIdx % this.cableColors.length;
    return this.cableColors[this.lastCableColorIdx];
  }

  isIntersect(point, circle, radius) {
    let dist = Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2)
    return dist < radius;
  }

  updatePatchCableOutput() {
    if (this.patchCableOutput) {
      this.patchCableOutput.innerHTML =
        this.connections.map(connection => {
          const [fromIdx, toIdx] = [connection.from, connection.to].sort((a, b) => b - a)
          const from = this.connectors[fromIdx];
          const to = this.connectors[toIdx];
          return from.name + " -> " + to.name;
        }).join("<br/>");
    }
    if (this.patchCableData) {
      const data = {
        connections: this.connections,
        knobValues: this.knobValues,
        buttonValues: this.buttonValues,
        toggleValues: this.toggleValues,
        lightValues: this.lightValues
      }
      this.patchCableData.value = JSON.stringify(data);
    }
    // update screenshot
    if (this.patchScreenshotCtx && false) {
      const offsetX = Math.round(Math.random() * (354 - 240)) + 1198
      const offsetY = Math.round(Math.random() * (409 - 240)) + 62
      this.patchScreenshotCtx.clearRect(0, 0, 120, 120); // clear canvas
      this.patchScreenshotCtx.drawImage(this.canvas, offsetX, offsetY, 240, 240, 0, 0, 120, 120);
      this.patchScreenshotImage.src = this.patchScreenshotCanvas.toDataURL() //('image/jpeg', 0.1)
    }
  }

  loadPatchData() {
    if (this.patchCableData && this.patchCableData.value != "" && this.patchCableData.value != "{}") {
      const data = JSON.parse(this.patchCableData.value)
      this.connections = data.connections
      this.knobValues = data.knobValues
      this.buttonValues = data.buttonValues
      this.toggleValues = data.toggleValues
      if (data.lightValues) {
        this.lightValues = data.lightValues
      }
    }
  }


  //
  // Event listeners
  //

  // To be overridden in subclass
  onButtonClick(button) { return false }
  onToggleClick(toggle) {
    const noValues = this.toggleOptions.types[toggle.type].values.length
    this.toggleValues[toggle.idx] = ++this.toggleValues[toggle.idx] % noValues
  }

  addAllEventListeners() {
    // Prevent text selection outside canvas when canvas is clicked
    this.canvas.onselectstart = function () { return false; }

    this.canvas.addEventListener("mousedown", (e) => {
      // const pos = {x: e.pageX, y: e.pageY};
      const pos = this.getMousePos(this.canvas, e)
      // console.log("mousedown", pos, e)
      this.connectors.forEach(circle => {
        if (this.isIntersect(pos, circle, this.connectorOptions.cellRadius)) {
          const inOut = circle.input ? "input" : "output";
          // console.log("mousedown " + circle.name + " (" + inOut + ") at " + circle.row + ", " + circle.col);
          this.dragging = true;
          this.dragFromIdx = circle.idx;
          this.dragFromInput = circle.input;
          this.dragToX = pos.x;
          this.dragToY = pos.y;
          this.dragColor = this.nextCableColor();
          this.requestRedraw()
        }
      });

      this.knobs.forEach(knob => {
        const knobType = this.knobTypes[knob.type];
        if (this.isIntersect(pos, knob, knobType.radius)) {
          // console.log("mousedown" + knob.name);
          this.turning = true;
          this.turnKnobIdx = knob.idx;
          this.turnPreviousY = pos.y;
          this.turnOldValue = knob.value;
          this.turnNewValue = knob.value;
          this.requestRedraw()
        }
      })

      this.buttons.forEach(button => {
        const circle = {x: button.x + this.buttonOptions.width / 2, y: button.y + this.buttonOptions.height / 2}
        if (this.isIntersect(pos, circle, this.buttonOptions.width)) {
          // Call handler in subclass
          this.onButtonClick(button)
          this.updatePatchCableOutput()
          this.requestRedraw()
        }
      })

      this.toggles.forEach(toggle => {
        const circle = {x: toggle.x + this.toggleOptions.width / 2, y: toggle.y + this.toggleOptions.height / 2}
        if (this.isIntersect(pos, circle, this.toggleOptions.width)) {
          this.onToggleClick(toggle)
          this.updatePatchCableOutput()
          this.requestRedraw()
        }
      })

      // e.preventDefault()
    }, false);

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.dragging && !this.turning) return;
      // const pos = {x: e.pageX, y: e.pageY};
      const pos = this.getMousePos(this.canvas, e)
      // console.log("mousemove", pos, e)
      if (this.dragging) {
        // update cable movement
        this.dragToX = pos.x;
        this.dragToY = pos.y;

        this.connectors.forEach(circle => {
          if (this.isIntersect(pos, circle, this.connectorOptions.cellRadius)) {
            const inOut = circle.input ? "input" : "output";
            // console.log("mousemove " + circle.name + " (" + inOut + ") at " + circle.row + ", " + circle.col);
          }
        });
      }

      if (this.turning) {
        const knob = this.knobs[this.turnKnobIdx]
        const knobType= this.knobTypes[knob.type]
        this.knobValues[this.turnKnobIdx] += (this.turnPreviousY - pos.y) * 2
        this.knobValues[this.turnKnobIdx] = Math.max(this.knobValues[this.turnKnobIdx], 0)
        this.knobValues[this.turnKnobIdx] = Math.min(this.knobValues[this.turnKnobIdx], knobType.limit)
        this.turnPreviousY = pos.y
        // console.log(this.knobValues[this.turnKnobIdx])
      }
      // e.preventDefault()
    }, false)

    this.canvas.addEventListener("mouseup", (e) => {
      if (!this.dragging && !this.turning) return;
      const pos = {x: this.dragToX, y: this.dragToY}
      if (this.dragging) {
        this.connectors.forEach(circle => {
          if (this.isIntersect(pos, circle, this.connectorOptions.cellRadius)) {
            const inOut = circle.input ? "input" : "output";
            if (this.dragFromInput != circle.input) {
              // if this connection already exists, remove it
              const foundIdx = this.connections.findIndex(connection => {
                return (connection.from === this.dragFromIdx && connection.to === circle.idx) ||
                       (connection.from === circle.idx && connection.to === this.dragFromIdx);
              });
              if (foundIdx > -1) {
                this.connections.splice(foundIdx, 1);
              } else {
                this.connections.push({from: this.dragFromIdx, to: circle.idx, color: this.dragColor});
              }
              this.updatePatchCableOutput();
            }
          }
        });
        this.dragging = false;
      }

      if (this.turning) {
        this.updatePatchCableOutput()
        this.turning = false;
      }
    }, false)

    this.canvas.addEventListener("mouseleave", (e) => {
      this.dragging = false;
      this.turning = false;
    }, false)

    // Touch event handlers

    this.canvas.addEventListener("touchstart", (e) => {
      const mousePos = this.getTouchPos(this.canvas, e);
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
    }, false)

    this.canvas.addEventListener("touchmove", (e) => {
      const mousePos = this.getTouchPos(this.canvas, e);
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
    }, false)

    this.canvas.addEventListener("touchend", (e) => {
      const mouseEvent = new MouseEvent("mouseup", {});
      this.canvas.dispatchEvent(mouseEvent);
    }, false)


    // Prevent scrolling when touching the canvas
    // {passive: false} is a fix for ios 11.3
    document.body.addEventListener("touchstart", (e) => {
      if (e.target == this.canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener("touchend", (e) => {
      if (e.target == this.canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener("touchmove", (e) => {
      if (e.target == this.canvas) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  // Get the position of a touch relative to the canvas
  getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

}

export {
  FrontPanel
}

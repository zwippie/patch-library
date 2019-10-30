// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

import frontPanels from "./front-panels"

// Start front panel for the device
document.querySelectorAll("canvas#front-panel").forEach(el => {
  const deviceName = el.dataset.device
  if (deviceName && frontPanels[deviceName]) {
    document.getElementById("patch_data").value = "{}"
    new frontPanels[deviceName]()
  }
})

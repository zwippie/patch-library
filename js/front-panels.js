// All the supported front panels.

import { BehringerNeutron } from "./behringer-neutron"
import { MoogDfam } from "./moog-dfam"
import { MoogSubharmonicon } from "./moog-subharmonicon"
import { MoogMother32 } from "./moog-mother-32"
import { BehringerModelD } from "./behringer-model-d"
import { MakeNoise0Coast } from "./make-noise-0-coast"
import { BehringerCat } from "./behringer-cat"
import { BehringerCrave } from "./behringer-crave"
import { EricaPicoIII } from "./erica-pico-iii"

export default {
  "behringer-neutron": BehringerNeutron,
  "moog-dfam": MoogDfam,
  "moog-mother-32": MoogMother32,
  "moog-subharmonicon":MoogSubharmonicon,
  "behringer-model-d": BehringerModelD,
  "make-noise-0-coast": MakeNoise0Coast,
  "behringer-cat": BehringerCat,
  "behringer-crave": BehringerCrave,
  "erica-pico-iii": EricaPicoIII
}

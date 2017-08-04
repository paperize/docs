// Bring in my weird factory cloning DSL
import { process, withinXofY, around } from './factory'

const DEFAULT_COMPONENT = {
  id:          -1,
  title:       ""
}

const EX_DECK = {
  id: 1000,
  title: "Zuul 1000"
}

export default {
  EX_DECK,

  factory (pattern) {
    // Clone the default model, then clone the selected pattern overtop
    let fabricant = { ...DEFAULT_COMPONENT, ...pattern }
    // Process resulting prototype
    return process(fabricant)
  }
}

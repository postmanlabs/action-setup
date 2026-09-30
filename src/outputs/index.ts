import { setOutput } from '@actions/core'
import { Inputs } from '../inputs'

export function setOutputs(inputs: Inputs, binDest: string) {
  // NOTE: addPath is already called in installPnpm — do not call it again
  // here, as a second addPath would shadow the correct entry on Windows.
  setOutput('dest', inputs.dest)
  setOutput('bin_dest', binDest)
}

export default setOutputs

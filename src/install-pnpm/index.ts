import { setFailed, startGroup, endGroup } from '@actions/core'
import { Inputs } from '../inputs'
import runSelfInstaller from './run'

export { runSelfInstaller }

export async function install(inputs: Inputs): Promise<string | undefined> {
  startGroup('Running self-installer...')
  const { exitCode, binDest } = await runSelfInstaller(inputs)
  endGroup()
  if (exitCode) {
    setFailed(`Something went wrong, self-installer exits with code ${exitCode}`)
    return undefined
  }
  return binDest
}

export default install

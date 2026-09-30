import { warning, startGroup, endGroup } from '@actions/core'
import { spawnSync } from 'child_process'
import { Inputs } from '../inputs'

export function pruneStore(inputs: Inputs) {
  if (inputs.runInstall.length === 0) {
    console.log('Pruning is unnecessary.')
    return
  }

  startGroup('Running pnpm store prune...')
  // spawnSync inherits process.env (which has the right PATH from addPath
  // in install-pnpm). See pnpm-install/index.ts for the rationale.
  const { error, status } = spawnSync('pnpm', ['store', 'prune'], {
    stdio: 'inherit',
    shell: true,
  })
  endGroup()

  if (error) {
    warning(error)
    return
  }

  if (status) {
    warning(`command pnpm store prune exits with code ${status}`)
    return
  }
}

export default pruneStore

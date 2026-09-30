import { setFailed, startGroup, endGroup } from '@actions/core'
import { spawnSync } from 'child_process'
import { Inputs } from '../inputs'

export function runPnpmInstall(inputs: Inputs) {
  for (const options of inputs.runInstall) {
    const args = ['install']
    if (options.recursive) args.unshift('recursive')
    if (options.args) args.push(...options.args)

    const cmdStr = ['pnpm', ...args].join(' ')
    startGroup(`Running ${cmdStr}...`)

    // spawnSync inherits process.env, which already has $PNPM_HOME/bin and
    // $PNPM_HOME prepended via addPath() in install-pnpm. Do NOT pass a
    // hand-patched env that adds node_modules/.bin to the front — on
    // Windows standalone, .bin/pnpm.cmd is an npm shim pointing at the
    // BOOTSTRAP pnpm, which would shadow the self-updated one and break
    // newer-pnpm-only behavior.
    const { error, status } = spawnSync('pnpm', args, {
      stdio: 'inherit',
      cwd: options.cwd,
      shell: true,
    })

    endGroup()

    if (error) {
      setFailed(error)
      continue
    }

    if (status) {
      setFailed(`Command ${cmdStr} (cwd: ${options.cwd}) exits with status ${status}`)
      continue
    }
  }
}

export default runPnpmInstall

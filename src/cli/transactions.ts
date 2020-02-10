import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'
import { command } from 'oclip'

const home = os.homedir()
const configPath = path.join(home, '.config/benjamin')

export default command({
  async run() {
    const token = await fs.readJSON(path.join(configPath, 'token.json'))
    console.dir(token)
  }
})

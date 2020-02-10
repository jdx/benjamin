import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'
import { command, arg } from 'oclip'
import plaid from '../plaid'

const home = os.homedir()
const configPath = path.join(home, '.config/benjamin')

export default command({
  args: [arg('start_date'), arg('end_date')],
  async run({args: [startDate, endDate]}) {
    const token = await fs.readJSON(path.join(configPath, 'token.json'))
    const {transactions} = await plaid.getTransactions(token.access_token, startDate, endDate)
    const maxNameLength = getMaxLength(transactions.map(tx => tx.name))
    const maxAmountLength = getMaxLength(transactions.map(tx => tx.amount.toFixed(2)))
    for (let tx of transactions) {
      console.log(`${tx.date} ${tx.name.padStart(maxNameLength)} ${tx.amount.toFixed(2).toString().padStart(maxAmountLength)}`)
    }
  }
})

function getMaxLength(strings) {
  let max = 0
  for (let s of strings) {
    max = Math.max(max, s.length)
  }
  return max
}

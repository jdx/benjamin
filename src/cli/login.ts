import * as bodyParser from 'body-parser'
import * as plaid from 'plaid'
import {command, flag} from 'oclip'
import express = require('express')
import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'

const PLAID_CLIENT_ID = process.env['PLAID_CLIENT_ID']
const PLAID_PUBLIC_KEY = process.env['PLAID_PUBLIC_KEY']
const PLAID_SECRET = process.env['PLAID_SECRET']
const PLAID_ENV = process.env['PLAID_ENV'] || 'sandbox'

// We store the access_token in memory
// In production, store it in a secure persistent data store
let ACCESS_TOKEN
let PUBLIC_TOKEN
let ITEM_ID

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {version: '2019-05-29'}
)

const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, rsp) => {
  rsp.render('index.ejs', {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
  })
})

const home = os.homedir()
const configPath = path.join(home, '.config/benjamin')

app.post('/get_access_token', async (req, rsp) => {
  PUBLIC_TOKEN = req.body.public_token
  const tokenResponse = await client.exchangePublicToken(PUBLIC_TOKEN)
  ACCESS_TOKEN = tokenResponse.access_token
  ITEM_ID = tokenResponse.item_id
  console.dir(tokenResponse)
  await fs.mkdirp(configPath)
  await fs.writeJSON(path.join(configPath, 'token.json'), tokenResponse)
  rsp.json({
    access_token: ACCESS_TOKEN,
    item_id: ITEM_ID,
    error: false
  })
})

export default command({
  flags: {
    port: flag({
      char: 'p', description: 'port to start local server on',
      default: process.env.PORT || '3000',
    })
  },

  async run({flags: {port}}) {
    app.listen(port, () => console.log(`server listening on :${port}`))
  }
})

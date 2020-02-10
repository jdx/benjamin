import * as plaid from 'plaid'

const PLAID_CLIENT_ID = process.env['PLAID_CLIENT_ID']
const PLAID_PUBLIC_KEY = process.env['PLAID_PUBLIC_KEY']
const PLAID_SECRET = process.env['PLAID_SECRET']
const PLAID_ENV = process.env['PLAID_ENV'] || 'sandbox'

export default new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {version: '2019-05-29'}
)

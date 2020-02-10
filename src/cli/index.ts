import {topic} from 'oclip'
import * as path from 'path'

topic({
  children: {
    login: path.join(__dirname, 'login'),
    transactions: path.join(__dirname, 'transactions'),
  },
}).exec()

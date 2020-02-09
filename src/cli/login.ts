import {command, flag} from 'oclip'
import express = require('express')

export default command({
  flags: {
    port: flag.input('p', 'port to start local server on', {
      default: process.env.PORT || '3000',
    })
  },

  async run({flags: {port}}) {
    const app = express()
    app.listen(port, () => console.log(`server listening on :${port}`))
  }
})

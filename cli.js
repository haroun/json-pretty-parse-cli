#!/usr/bin/env node

const meow = require('meow')
const stdin = require('get-stdin')

const cli = meow(`$ jsonpp --help

  Usage
    $ jsonpp <options> <string>

  Options:
    -s, --space Space

  Example
    $ jsonpp '{"number":42,"string":"string"}'
    {
      "number": 42,
      "string": "string"
    }
    $ echo '{"number":42,"string":"string"}' | jsonpp -s 4
    {
        "number": 42,
        "string": "string"
    }
`, {
  flags: {
    space: {
      type: 'number',
      alias: 's',
      default: 2
    }
  }
})

const input = cli.input[0]
const flags = cli.flags

const space = parseInt(flags.space, 10)

const pretty = ({data = '', space = 2}) => {
  console.log(data, space)
}

if (input) {
  pretty({data: input, space})
} else {
  stdin().then(data => pretty({data, space}))
}

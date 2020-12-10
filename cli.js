#!/usr/bin/env node

const meow = require('meow')
const stdin = require('get-stdin')

const cli = meow(`$ jsonpp --help

  Usage
    $ jsonpp [--space] <string>
    $ echo <string> | jsonpp [--space]

  Options
    -s, --space Space

  Examples
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

const {input: [input], flags} = cli

if (!input && process.stdin.isTTY) {
  console.error('Please specify text to parse')
  process.exit(1)
}

const space = Number.parseInt(flags.space, 10)

const pretty = ({data = '', space = 2}) => {
  const replacer = (key, value) => {
    const regex = /"/

    try {
      return (typeof value === 'string' && regex.test(value)) ?
        replacer(key, JSON.parse(value)) : value
    } catch {
      return value
    }
  }

  console.log(JSON.stringify(data, replacer, space))
}

(async () => {
  if (input) {
    pretty({data: input, space})
  } else {
    const data = await stdin()
    pretty({data, space})
  }
})()

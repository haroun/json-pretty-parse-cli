const test = require('tape')
const execa = require('execa')
const dedent = require('dedent')

const escape = string => JSON.stringify(string)

test('unescaped string', async assert => {
  const message = 'should return JSON object'

  const {stdout} = await execa(
    './cli.js',
    [
      '{"number":42,"string":"this is a string obviously","boolean":true,"array":[1,2,4],"object":{"a":1},"null":null}'
    ]
  )

  const actual = stdout
  const expected = dedent`{
    "number": 42,
    "string": "this is a string obviously",
    "boolean": true,
    "array": [
      1,
      2,
      4
    ],
    "object": {
      "a": 1
    },
    "null": null
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('escaped once string', async assert => {
  const message = 'should return JSON object'

  const {stdout} = await execa(
    './cli.js',
    [
      escape('{"number":42,"string":"string"}')
    ]
  )

  const actual = stdout
  const expected = dedent`{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('escaped twice string', async assert => {
  const message = 'should return JSON object'

  const {stdout} = await execa(
    './cli.js',
    [
      escape(escape('{"number":42,"string":"string"}'))
    ]
  )

  const actual = stdout
  const expected = dedent`{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('without spaces', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', ['--space', 0], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = '{"number":42,"string":"string"}'

  assert.equal(actual, expected, message)

  assert.end()
})

test('without spaces (alias)', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', ['-s', 0], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = '{"number":42,"string":"string"}'

  assert.equal(actual, expected, message)

  assert.end()
})

test('using stdin', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', [], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = dedent`{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('using stdin without spaces', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', ['-s', 0], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = '{"number":42,"string":"string"}'

  assert.equal(actual, expected, message)

  assert.end()
})

test('using stdin with escaped once string', async assert => {
  const message = 'should return JSON object'

  const {stdout} = await execa('./cli.js', [], {input: escape('{"number":42,"string":"string"}')})

  const actual = stdout
  const expected = dedent`{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('error during JSON.parse in escaped twice string', async assert => {
  const message = 'should return JSON object and "error" as string'

  const {stdout} = await execa(
    './cli.js',
    [
      escape(escape(`{"number":42,"string":"string","data":${escape('escaped {"number":42}')}}`))
    ]
  )

  const actual = stdout
  const expected = dedent`{
    "number": 42,
    "string": "string",
    "data": "escaped {\"number\":42}"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('using escaped string', async assert => {
  const message = 'should return input'

  const {stdout} = await execa(
    './cli.js',
    [
      escape('escaped {"number":42}')
    ]
  )

  const actual = stdout
  const expected = escape('escaped {"number":42}')

  assert.equal(actual, expected, message)

  assert.end()
})

const test = require('tape')
const execa = require('execa')

const escape = string => JSON.stringify(string)

test('json-pretty unescaped string', async assert => {
  const message = 'should return JSON object'

  const {stdout} = await execa(
    './cli.js',
    [
      '{"number":42,"string":"this is a string obviously","boolean":true,"array":[1,2,4],"object":{"a":1},"null":null}'
    ]
  )

  const actual = stdout
  const expected = `{
    "number": 42,
    "string": "this is a string obviously",
    "boolean": true,
    "array": [1, 2, 4],
    "object": {"a": 1},
    "null": null
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('json-pretty escaped once string', async assert => {
  const message = 'should return JSON object'

  const {stdout} = await execa(
    './cli.js',
    [
      escape('{"number":42,"string":"string"}')
    ]
  )

  const actual = stdout
  const expected = `{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('json-pretty escaped twice string', async assert => {
  const message = 'should return JSON object'

  const {stdout} = await execa(
    './cli.js',
    [
      escape(escape('{"number":42,"string":"string"}'))
    ]
  )

  const actual = stdout
  const expected = `{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('json-pretty without spaces', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', ['--space', 0], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = `{
  "number": 42,
  "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('json-pretty without spaces (alias)', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', ['-s', 0], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = `{
  "number": 42,
  "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('json-pretty using stdin', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', [], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = `{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})

test('json-pretty using stdin without spaces', async assert => {
  const message = 'stdin should be transformed into JSON object'

  const {stdout} = await execa('./cli.js', ['-s', 0], {input: '{"number":42,"string":"string"}'})

  const actual = stdout
  const expected = `{
    "number": 42,
    "string": "string"
  }`

  assert.equal(actual, expected, message)

  assert.end()
})
const test = require('tape')
const execa = require('execa')

test('json-pretty unescaped string', async assert => {
  const message = 'should be "pretty", types should be kept'

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
  const message = 'should be "pretty", types should be kept'

  const {stdout} = await execa(
    './cli.js',
    [
      '{\"number\":42,\"string\":\"this is a string obviously\",\"boolean\":true,\"array\":[1,2,4],\"object\":{\"a\":1},\"null\":null}'
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
  const message = 'should be "pretty", types should be kept'

  const {stdout} = await execa(
    './cli.js',
    [
      '{\\\"number\\\":42,\\\"string\\\":\\\"this is a string obviously\\\",\\\"boolean\\\":true,\\\"array\\\":[1,2,4],\\\"object\\\":{\\\"a\\\":1},\\\"null\\\":null}'
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

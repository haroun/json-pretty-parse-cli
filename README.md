# json-pretty-parse-cli [![Build Status](https://travis-ci.org/haroun/b64-cli.svg?branch=master)](https://travis-ci.org/haroun/json-pretty-parse-cli)

> Command line interface to unescape and format JSON data using stringify and parse

When I need to check a JSON message from a log entry, I often get an escaped string with no spaces, no new lines.
Then the journey begin, I open a text-editor, replace all escaped quotes, open a new tab with a JSON formatted, copy/paste the unsecaped JSON, format, copy/paste the result back to my text-editor, I'm good to go.

Whith `jsonpp`, first I use `JSON.stringify` and for each string entries with escaped strings, I do a `JSON.parse` using the replacer function.
This may not be the fastest way to do it, but it seems solid so far.

If you need a command to unescape and format a JSON string, `jsonpp` is your man or woman.


## Install

```
$ npm install --global json-pretty-parse-cli
```


## Usage

```
$ jsonpp --help

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
    $ jsonpp -s 4 '{\"number\":42,\"string\":\"string\"}'
    {
        "number": 42,
        "string": "string"
    }
    $ echo '{\\\"number\\":42,\\\"string\\\":\\\"string\\\"}' | jsonpp
    {
      "number": 42,
      "string": "string"
    }
    $ echo '{"number":42,"string":"string"}' | jsonpp -s 4
    {
        "number": 42,
        "string": "string"
    }
```


## License

MIT © [Harouna Traore](https://github.com/haroun)

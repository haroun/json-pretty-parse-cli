# json-pretty-parse-cli ![Node.js CI](https://github.com/haroun/json-pretty-parse-cli/workflows/Node.js%20CI/badge.svg) ![CodeQL](https://github.com/haroun/json-pretty-parse-cli/workflows/CodeQL/badge.svg)

> Command line interface to unescape and format JSON data using stringify and parse

When I need to check a JSON message from a log entry, I often get an escaped string with no spaces, no new lines.
Then the journey begin, I open a text-editor, replace all escaped quotes, open a new tab with a JSON formatted, copy/paste the unescaped JSON, format, copy/paste the result back to my text-editor, I'm good to go.

With `jsonpp`, first I use `JSON.stringify` and for each string entries with escaped strings, I do a `JSON.parse` using the replacer function.
This may not be the fastest way to do it, but it seems solid so far.

If you need a command to unescape and format a JSON string, `jsonpp` is your man or woman.


## Install

```
$ npm install --global json-pretty-parse-cli
```

If you don't want to install the package globally, you can use npx instead

```
$ npx @haroun/json-pretty-parse-cli
```


## Usage

```
$ jsonpp --help

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

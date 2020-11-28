# pyaz

A toolkit for JavaScript linting, building, and testing

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pyaz.svg)](https://npmjs.org/package/pyaz)
[![Downloads/week](https://img.shields.io/npm/dw/pyaz.svg)](https://npmjs.org/package/pyaz)
[![License](https://img.shields.io/npm/l/pyaz.svg)](https://github.com/github:nwalters512/pyaz/blob/master/package.json)

## Inspirations

- [sku](https://github.com/seek-oss/sku)
- [tsdx](https://github.com/formium/tsdx)

# Table of Contents

<!-- toc -->

- [pyaz](#pyaz)
- [Table of Contents](#table-of-contents)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g pyaz
$ pyaz COMMAND
running command...
$ pyaz (-v|--version|version)
pyaz/1.0.0 darwin-x64 node-v12.16.3
$ pyaz --help [COMMAND]
USAGE
  $ pyaz COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`pyaz build`](#pyaz-build)
- [`pyaz format [FILE]`](#pyaz-format-file)
- [`pyaz help [COMMAND]`](#pyaz-help-command)
- [`pyaz lint [FILE]`](#pyaz-lint-file)
- [`pyaz setup`](#pyaz-setup)
- [`pyaz test [FILE]`](#pyaz-test-file)

## `pyaz build`

```
USAGE
  $ pyaz build
```

_See code: [dist/commands/build.ts](https://github.com/nwalters512/pyaz/blob/v1.0.0/dist/commands/build.ts)_

## `pyaz format [FILE]`

```
USAGE
  $ pyaz format [FILE]
```

_See code: [dist/commands/format.ts](https://github.com/nwalters512/pyaz/blob/v1.0.0/dist/commands/format.ts)_

## `pyaz help [COMMAND]`

```
USAGE
  $ pyaz help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `pyaz lint [FILE]`

```
USAGE
  $ pyaz lint [FILE]
```

_See code: [dist/commands/lint.ts](https://github.com/nwalters512/pyaz/blob/v1.0.0/dist/commands/lint.ts)_

## `pyaz setup`

```
USAGE
  $ pyaz setup
```

_See code: [dist/commands/setup.ts](https://github.com/nwalters512/pyaz/blob/v1.0.0/dist/commands/setup.ts)_

## `pyaz test [FILE]`

```
USAGE
  $ pyaz test [FILE]
```

_See code: [dist/commands/test.ts](https://github.com/nwalters512/pyaz/blob/v1.0.0/dist/commands/test.ts)_

<!-- commandsstop -->

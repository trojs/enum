# Create vanilla JavaScript enums

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Scrutinizer Code Quality][scrutinizer-image]][scrutinizer-url]

## Installation

`npm install @hckrnews/enum`
or
`yarn add @hckrnews/enum`

## Test the package

`npm run test`
or
`yarn test`

## Usage

```javascript
import Enum from '@hckrnews/enum'

class Example extends Enum {
  static test = 'TEXT'
  static another = 42
}

Example.test // 'TEXT'
Example.options // { test: 'TEXT', another: 42 }
Example.options.test // 'TEXT'

const example = Example.fromKey('test')
example.key // 'test'
example.value // 'TEXT'
example.values // [ 'TEXT', 42 ]
example.keys // [ 'test', 'another ]
example.test // 'TEXT'
example.another // 42
example.length // 2

example.is(Example.test) // true
example.is('TEXT') // true
example.is(42) // false
example.in([Example.test]) // true
example.in(['TEXT']) // true
example.in([42]) // false

example.valueOf() // 42
example.toString() // 'test'
example.toJSON() // 'test'
JSON.stringify(example) // '"test"'

const example = Example.create('test')
example.key // 'test'
example.value // 'TEXT'

const example = Example.fromValue('TEXT')
example.key // test
example.value // TEXT

Example.hasKey('test') // teue
Example.hasKey('TEXT') // false
Example.hasValue('test') // teue
Example.hasValue('TEXT') // false

Example.toJSON() // { test: 'TEXT', another: 42 }
JSON.stringify(Example) // '{"test":"TEXT","another":42}'

const example = Example.create('test', { output: 'value' })
example.valueOf() // 42
example.toString() // '42'
example.toJSON() // 42
JSON.stringify(example) // '42'
```

[npm-url]: https://www.npmjs.com/package/@hckrnews/enum
[npm-image]: https://img.shields.io/npm/v/@hckrnews/enum.svg
[travis-url]: https://app.travis-ci.com/hckrnews/enum
[travis-image]: https://app.travis-ci.com/hckrnews/enum.svg?branch=main
[coveralls-url]: https://coveralls.io/r/hckrnews/enum
[coveralls-image]: https://img.shields.io/coveralls/hckrnews/enum/main.svg
[scrutinizer-url]: https://scrutinizer-ci.com/g/hckrnews/enum/?branch=main
[scrutinizer-image]: https://scrutinizer-ci.com/g/hckrnews/enum/badges/quality-score.png?b=main

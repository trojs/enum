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

class Ecample extends Enum {
  static test = 'TEXT'
  static another = 42
}

Encoding.test // 'TEXT'
Encoding.options // { test: 'TEXT', another: 42 }
Encoding.options.test // 'TEXT'

const encoding = Encoding.fromKey('test')
encoding.key // 'test'
encoding.value // 'TEXT'
encoding.values // [ 'TEXT', 42 ]
encoding.keys // [ 'test', 'another ]
encoding.test // 'TEXT'
encoding.another // 42
encoding.length // 2

encoding.is(Encoding.test) // true
encoding.is('TEXT') // true
encoding.is(42) // false
encoding.in([Encoding.test]) // true
encoding.in(['TEXT']) // true
encoding.in([42]) // false

encoding.valueOf() // 42
encoding.toString() // '42'
encoding.toJSON() // 42

const encoding = Encoding.create('test')
encoding.key // 'test'
encoding.value // 'TEXT'

const encoding = Encoding.fromValue('TEXT')
encoding.key // test
encoding.value // TEXT

Encoding.hasKey('test') // teue
Encoding.hasKey('TEXT') // false
Encoding.hasValue('test') // teue
Encoding.hasValue('TEXT') // false
```

[npm-url]: https://www.npmjs.com/package/@hckrnews/enum
[npm-image]: https://img.shields.io/npm/v/@hckrnews/enum.svg
[travis-url]: https://app.travis-ci.com/hckrnews/enum
[travis-image]: https://app.travis-ci.com/hckrnews/enum.svg?branch=main
[coveralls-url]: https://coveralls.io/r/hckrnews/enum
[coveralls-image]: https://img.shields.io/coveralls/hckrnews/enum/main.svg
[scrutinizer-url]: https://scrutinizer-ci.com/g/hckrnews/enum/?branch=main
[scrutinizer-image]: https://scrutinizer-ci.com/g/hckrnews/enum/badges/quality-score.png?b=main

import { expect, describe, it } from '@jest/globals'
import Enum from '../enum.js'

class Encoding extends Enum {
  static 'utf-8' = 'UTF-8'
}

describe('Test the encoding enum', () => {
  it('It should work with the default enum', () => {
    expect(Enum.hasKey('test')).toEqual(false)
    expect(Enum.hasValue('test')).toEqual(false)
    expect(Enum.options).toEqual({})
  })

  it('It should create from a key', () => {
    const encoding = Encoding.fromKey('utf-8')
    expect(encoding.key).toEqual('utf-8')
    expect(encoding.value).toEqual('UTF-8')
    expect(encoding.values).toEqual(['UTF-8'])
    expect(Encoding.options).toEqual({
      'utf-8': 'UTF-8'
    })
    expect(Encoding.options['utf-8']).toEqual('UTF-8')
    expect(encoding.keys).toEqual(['utf-8'])
    expect(encoding['utf-8']).toEqual('UTF-8')
    expect(encoding.length).toEqual(1)
    expect(encoding.is(Encoding['utf-8'])).toEqual(true)
    expect(encoding.is('UTF-8')).toEqual(true)
    expect(encoding.is('something')).toEqual(false)
    expect(encoding.in([Encoding['utf-8']])).toEqual(true)
    expect(encoding.in(['UTF-8'])).toEqual(true)
    expect(encoding.in(['something'])).toEqual(false)
  })

  it('It should create from an value', () => {
    const encoding = Encoding.fromValue('UTF-8')
    expect(encoding.key).toEqual('utf-8')
    expect(encoding.value).toEqual('UTF-8')
    expect(encoding.values).toEqual(['UTF-8'])
    expect(Encoding.options).toEqual({
      'utf-8': 'UTF-8'
    })
    expect(encoding.keys).toEqual(['utf-8'])
    expect(encoding['utf-8']).toEqual('UTF-8')
    expect(encoding.length).toEqual(1)
  })

  it('It should work with the static methods', () => {
    expect(Encoding.hasKey('utf-8')).toEqual(true)
    expect(Encoding.hasKey('UTF-8')).toEqual(false)
    expect(Encoding.hasValue('UTF-8')).toEqual(true)
    expect(Encoding.hasValue('utf-8')).toEqual(false)
  })

  it('It should throw an exception for an unknown key', () => {
    expect(() => {
      Encoding.fromKey('UTF-8')
    }).toThrowError('Invalid enum key UTF-8')
  })

  it('It should throw an exception for an unknown value', () => {
    expect(() => {
      Encoding.fromValue('utf-8')
    }).toThrowError('Invalid enum value utf-8')
  })

  it('It should handle reserved word key', () => {
    class Example extends Enum {
      static key = 1
    }
    const example = Example.fromKey('key')

    expect(example.key).toEqual('key')
    expect(example.value).toEqual(1)
    expect(example.values).toEqual([1])
    expect(Example.options).toEqual({
      key: 1
    })
    expect(example.keys).toEqual(['key'])
    expect(example.key).toEqual('key')
    expect(example.length).toEqual(1)
  })

  it('It should handle reserved word value', () => {
    class Example extends Enum {
        static value = 1
    }
    const example = Example.fromKey('value')

    expect(example.key).toEqual('value')
    expect(example.value).toEqual(1)
    expect(example.values).toEqual([1])
    expect(Example.options).toEqual({
      value: 1
    })
    expect(example.keys).toEqual(['value'])
    expect(example.value).toEqual(1)
    expect(example.length).toEqual(1)
  })

  it('It should handle reserved word options', () => {
    class Example extends Enum {
        static options = 42
    }
    const example = Example.fromKey('options')

    expect(example.key).toEqual('options')
    expect(example.value).toEqual(42)
    expect(example.values).toEqual([42])
    expect(Example.options).toEqual(42)
    expect(example.keys).toEqual(['options'])
    expect(example.options).toEqual(42)
    expect(example.length).toEqual(1)
  })

  it('It should handle reserved word is', () => {
    class Example extends Enum {
        static is = 42
    }
    const example = Example.fromKey('is')

    expect(example.key).toEqual('is')
    expect(example.value).toEqual(42)
    expect(example.values).toEqual([42])
    expect(Example.options).toEqual({
      is: 42
    })
    expect(example.keys).toEqual(['is'])
    expect(example.is).toEqual(42)
    expect(example.length).toEqual(1)
    expect(example.in([Example.options.is])).toEqual(true)
    expect(example.in([42])).toEqual(true)
    expect(example.in(['something'])).toEqual(false)
  })

  it('It should handle reserved word in', () => {
    class Example extends Enum {
        static in = 42
    }
    const example = Example.fromKey('in')

    expect(example.key).toEqual('in')
    expect(example.value).toEqual(42)
    expect(example.values).toEqual([42])
    expect(Example.options).toEqual({
      in: 42
    })
    expect(example.keys).toEqual(['in'])
    expect(example.in).toEqual(42)
    expect(example.length).toEqual(1)
    expect(example.is(Example.in)).toEqual(true)
    expect(example.is(42)).toEqual(true)
    expect(example.is('something')).toEqual(false)
  })

  it('It should handle reserved word keys', () => {
    expect(() => {
      class Example extends Enum {
        static keys = 1
      }
      Example.fromKey('keys')
    }).toThrowError('Cannot set property keys of [object Object] which has only a getter')
  })

  it('It should handle reserved word values', () => {
    expect(() => {
      class Example extends Enum {
        static values = 1
      }
      Example.fromKey('values')
    }).toThrowError('Cannot set property values of [object Object] which has only a getter')
  })

  it('It should overrule the options', () => {
    class Example extends Enum {
        static options = 1
    }
    expect(Example.options).toEqual(1)
    const example = Example.fromKey('options')
    expect(example.values).toEqual([1])

    Example.options = 42
    expect(Example.options).toEqual(42)
    expect(example.values).toEqual([42])

    Example.options2 = 2
    expect(Example.options).toEqual(42)
    expect(Example.options2).toEqual(2)
    expect(example.values).toEqual([42, 2])
  })

  it('It should also work with multiple options', () => {
    class Example extends Enum {
        static 'test1' = 1
        static 'test2' = 2
        static 'test3' = 3
    }

    const example = Example.fromKey('test2')
    expect(example.key).toEqual('test2')
    expect(example.value).toEqual(2)
    expect(example.values).toEqual([1, 2, 3])
    expect(Example.options).toEqual({
      test1: 1,
      test2: 2,
      test3: 3
    })
    expect(Example.test1).toEqual(1)
    expect(Example.test2).toEqual(2)
    expect(Example.test3).toEqual(3)
    expect(Example.options.test2).toEqual(2)
    expect(example.keys).toEqual(['test1', 'test2', 'test3'])
    expect(example.test2).toEqual(2)
    expect(example.length).toEqual(3)
    expect(example.is(Example.test2)).toEqual(true)
    expect(example.is(2)).toEqual(true)
    expect(example.is('something')).toEqual(false)
    expect(example.in([Example.test2])).toEqual(true)
    expect(example.in([2])).toEqual(true)
    expect(example.in(['something'])).toEqual(false)
    expect(example.valueOf()).toEqual(2)
    expect(example.toString()).toEqual('2')
  })
})

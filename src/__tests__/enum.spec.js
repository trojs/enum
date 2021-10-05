import { expect, describe, it } from '@jest/globals'
import Enum from '../enum.js'

class Encoding extends Enum {
  static options = {
    'utf-8': 'UTF-8'
  }
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
      static options = {
        key: 1
      }
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
        static options = {
          value: 1
        }
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
        static options = {
          options: 42
        }
    }
    const example = Example.fromKey('options')

    expect(example.key).toEqual('options')
    expect(example.value).toEqual(42)
    expect(example.values).toEqual([42])
    expect(Example.options).toEqual({
      options: 42
    })
    expect(example.keys).toEqual(['options'])
    expect(example.options).toEqual(42)
    expect(example.length).toEqual(1)
  })

  it('It should handle reserved word keys', () => {
    expect(() => {
      class Example extends Enum {
        static options = {
          keys: 1
        }
      }
      Example.fromKey('keys')
    }).toThrowError('Cannot set property keys of #<Enum> which has only a getter')
  })

  it('It should handle reserved word values', () => {
    expect(() => {
      class Example extends Enum {
        static options = {
          values: 1
        }
      }
      Example.fromKey('values')
    }).toThrowError('Cannot set property values of #<Enum> which has only a getter')
  })

  it('It should overrule the options', () => {
    class Example extends Enum {
        static options = {
          options: 1
        }
    }
    expect(Example.options).toEqual({
      options: 1
    })
    const example = Example.fromKey('options')
    expect(example.values).toEqual([1])

    Example.options.options = 42
    expect(Example.options).toEqual({
      options: 42
    })
    expect(example.values).toEqual([42])

    Example.options = {
      options2: 2
    }
    expect(Example.options).toEqual({
      options2: 2
    })
    expect(example.values).toEqual([2])
  })
})

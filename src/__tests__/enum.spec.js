import { expect, describe, it } from '@jest/globals'
import Enum from '../enum.js'

class Encoding extends Enum {
  get options () {
    return {
      'utf-8': 'UTF-8'
    }
  }
}

describe('Test the encoding enum', () => {
  it('It should work with the default enum', () => {
    expect(Enum.hasKey('test')).toEqual(false)
    expect(Enum.hasValue('test')).toEqual(false)
  })

  it('It should create from a key', () => {
    const encoding = Encoding.fromKey('utf-8')
    expect(encoding.key).toEqual('utf-8')
    expect(encoding.value).toEqual('UTF-8')
    expect(encoding.values).toEqual(['UTF-8'])
    expect(encoding.options).toEqual({
      'utf-8': 'UTF-8'
    })
    expect(encoding.keys).toEqual(['utf-8'])
    expect(encoding['utf-8']).toEqual('UTF-8')
    expect(encoding.length).toEqual(1)
  })

  it('It should create from an value', () => {
    const encoding = Encoding.fromValue('UTF-8')
    expect(encoding.key).toEqual('utf-8')
    expect(encoding.value).toEqual('UTF-8')
    expect(encoding.values).toEqual(['UTF-8'])
    expect(encoding.options).toEqual({
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
      get options () {
        return {
          key: 1
        }
      }
    }
    const example = Example.fromKey('key')

    expect(example.key).toEqual('key')
    expect(example.value).toEqual(1)
    expect(example.values).toEqual([1])
    expect(example.options).toEqual({
      key: 1
    })
    expect(example.keys).toEqual(['key'])
    expect(example.key).toEqual('key')
    expect(example.length).toEqual(1)
  })

  it('It should handle reserved word value', () => {
    class Example extends Enum {
      get options () {
        return {
          value: 1
        }
      }
    }
    const example = Example.fromKey('value')

    expect(example.key).toEqual('value')
    expect(example.value).toEqual(1)
    expect(example.values).toEqual([1])
    expect(example.options).toEqual({
      value: 1
    })
    expect(example.keys).toEqual(['value'])
    expect(example.key).toEqual('value')
    expect(example.length).toEqual(1)
  })

  it('It should handle reserved word options', () => {
    expect(() => {
      class Example extends Enum {
        get options () {
          return {
            options: 1
          }
        }
      }
      Example.fromKey('options')
    }).toThrowError('Cannot set property options of #<Example> which has only a getter')
  })

  it('It should handle reserved word keys', () => {
    expect(() => {
      class Example extends Enum {
        get options () {
          return {
            keys: 1
          }
        }
      }
      Example.fromKey('keys')
    }).toThrowError('Cannot set property keys of #<Enum> which has only a getter')
  })

  it('It should handle reserved word values', () => {
    expect(() => {
      class Example extends Enum {
        get options () {
          return {
            values: 1
          }
        }
      }
      Example.fromKey('values')
    }).toThrowError('Cannot set property values of #<Enum> which has only a getter')
  })
})

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
})

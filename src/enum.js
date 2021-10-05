export default class Enum {
  static options = {}

  constructor () {
    this.key = null
    this.value = null
  }

  static fromKey (key) {
    const newEnum = new this()
    if (!newEnum.isValidKey(key)) {
      throw new Error(`Invalid enum key ${key}`)
    }
    const value = newEnum.constructor.options[key]
    newEnum.setKeyValue({ key, value })

    return newEnum
  }

  static fromValue (value) {
    const newEnum = new this()
    if (!newEnum.isValidValue(value)) {
      throw new Error(`Invalid enum value ${value}`)
    }
    const key = newEnum.invertedOptions[value]
    newEnum.setKeyValue({ key, value })

    return newEnum
  }

  setKeyValue ({ key, value }) {
    this.setValues()
    this.setKey(key)
    this.setValue(value)
  }

  get invertedOptions () {
    return Object
      .entries(this.constructor.options)
      .reduce((newObj, [key, value]) => ({ ...newObj, [value]: key }), {})
  }

  setKey (key) {
    this.key = key
  }

  setValue (value) {
    this.value = value
  }

  setValues () {
    Object.entries(this.constructor.options).forEach(([key, value]) => {
      this[key] = value
    })
  }

  isValidKey (key) {
    return Object.hasOwnProperty.call(this.constructor.options, key) && Object.propertyIsEnumerable.call(this.constructor.options, key)
  }

  isValidValue (value) {
    return this.values.includes(value)
  }

  static hasKey (key) {
    const newEnum = new this()

    return newEnum.isValidKey(key)
  }

  static hasValue (value) {
    const newEnum = new this()

    return newEnum.isValidValue(value)
  }

  get keys () {
    return Object.keys(this.constructor.options)
  }

  get values () {
    return Object.values(this.constructor.options)
  }

  get length () {
    return Object.keys(this.constructor.options).length
  }
}

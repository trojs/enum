export default class Enum {
  constructor () {
    this.key = null
    this.value = null
    this.output = 'key'
  }

  static get options () {
    return Object.fromEntries(Object.entries(this))
  }

  static create (key, options = {}) {
    return this.fromKey(key, options)
  }

  static fromKey (key, options = {}) {
    const newEnum = new this()
    if (!newEnum.isValidKey(key)) {
      throw new Error(`Invalid enum key ${key}`)
    }
    const value = newEnum.constructor[key]
    newEnum.setKeyValue({ key, value })
    newEnum.setOptions(options)

    return newEnum
  }

  static fromValue (value, options = {}) {
    const newEnum = new this()
    if (!newEnum.isValidValue(value)) {
      throw new Error(`Invalid enum value ${value}`)
    }
    const key = newEnum.invertedOptions[value]
    newEnum.setKeyValue({ key, value })
    newEnum.setOptions(options)

    return newEnum
  }

  setKeyValue ({ key, value }) {
    this.setValues()
    this.setKey(key)
    this.setValue(value)
  }

  setOptions (options) {
    this.output = options?.output || this.output
  }

  get invertedOptions () {
    return Object.fromEntries(
      Object.entries(this.constructor)
        .map(([key, value]) => [value, key])
    )
  }

  setKey (key) {
    this.key = key
  }

  setValue (value) {
    this.value = value
  }

  setValues () {
    Object.entries(this.constructor).forEach(([key, value]) => {
      this[key] = value
    })
  }

  isValidKey (key) {
    return Object.hasOwnProperty.call(this.constructor, key) && Object.propertyIsEnumerable.call(this.constructor, key)
  }

  isValidValue (value) {
    return this.values.includes(value)
  }

  is (value) {
    return this.value === value
  }

  in (values) {
    return values.includes(this.value)
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
    return Object.keys(this.constructor)
  }

  get values () {
    return Object.values(this.constructor)
  }

  get length () {
    return Object.keys(this.constructor).length
  }

  valueOf () {
    return this.value
  }

  toString () {
    return this[this.output].toString()
  }

  toJSON () {
    return this[this.output]
  }

  static toJSON () {
    return Object.fromEntries(Object.entries(this))
  }
}

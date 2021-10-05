export default class Enum {
  constructor () {
    this.key = null
    this.value = null
  }

  static get options () {
    return Object.fromEntries(Object.entries(this))
  }

  static fromKey (key) {
    const newEnum = new this()
    if (!newEnum.isValidKey(key)) {
      throw new Error(`Invalid enum key ${key}`)
    }
    const value = newEnum.constructor[key]
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
    return this.value.toString()
  }

  toJSON () {
    return this.value
  }
}

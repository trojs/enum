export default class Enum {
  constructor () {
    this.key = null
    this.value = null
  }

  static fromKey (key) {
    const newEnum = new this()
    if (!newEnum.isValidKey(key)) {
      throw new Error(`Invalid enum key ${key}`)
    }
    const value = newEnum.options[key]
    newEnum.setValues()
    newEnum.setKey(key)
    newEnum.setValue(value)

    return newEnum
  }

  static fromValue (value) {
    const newEnum = new this()
    if (!newEnum.isValidValue(value)) {
      throw new Error(`Invalid enum value ${value}`)
    }
    const key = newEnum.invertedOptions[value]
    newEnum.setValues()
    newEnum.setKey(key)
    newEnum.setValue(value)

    return newEnum
  }

  get invertedOptions () {
    return Object
      .entries(this.options)
      .reduce((newObj, [key, value]) => ({ ...newObj, [value]: key }), {})
  }

  setKey (key) {
    this.key = key
  }

  setValue (value) {
    this.value = value
  }

  setValues () {
    Object.entries(this.options).forEach(([key, value]) => {
      this[key] = value
    })
  }

  isValidKey (key) {
    return Object.hasOwnProperty.call(this.options, key) && Object.propertyIsEnumerable.call(this.options, key)
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

  get options () {
    return {}
  }

  get keys () {
    return Object.keys(this.options)
  }

  get values () {
    return Object.values(this.options)
  }

  get length () {
    return Object.keys(this.options).length
  }
}

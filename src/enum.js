export default class Enum {
  constructor () {
    this.key = null
    this.value = null
    this.output = 'key'
  }

  /**
   * @return {string}
   */
  get name () {
    return this.constructor.name
  }

  /**
   * @return {array}
   */
  static get options () {
    return Object.fromEntries(Object.entries(this))
  }

  /**
   * Create an enum result by key
   *
   * @param {string} key
   * @param {object} options
   *
   * @return {Enum}
   */
  static create (key, options = {}) {
    return this.fromKey(key, options)
  }

  /**
   * Get an enum result by key
   *
   * @param {string} key
   * @param {object} options
   *
   * @return {Enum}
   */
  static fromKey (key, options = {}) {
    const newEnum = new this()
    if (!newEnum.isValidKey(key)) {
      throw new Error(`Invalid ${this.name} key ${key}`)
    }
    const value = newEnum.constructor[key]
    newEnum.setKeyValue({ key, value })
    newEnum.setOptions(options)

    return newEnum
  }

  /**
   * Get an enum result by value
   *
   * @param {any} value
   * @param {object} options
   *
   * @return {Enum}
   */
  static fromValue (value, options = {}) {
    const newEnum = new this()
    if (!newEnum.isValidValue(value)) {
      throw new Error(`Invalid ${this.name} value ${value}`)
    }
    const key = newEnum.invertedOptions[value]
    newEnum.setKeyValue({ key, value })
    newEnum.setOptions(options)

    return newEnum
  }

  /**
   * Set the key and value of the enum
   *
   * @param {{ key: string, value: any }} keyValue
   */
  setKeyValue ({ key, value }) {
    this.setValues()
    this.setKey(key)
    this.setValue(value)
  }

  /**
   * Set the options of the enum
   *
   * @param {object} options
   */
  setOptions (options) {
    this.output = options?.output || this.output
  }

  /**
   * Get the options inverted
   *
   * @return {object}
   */
  get invertedOptions () {
    return Object.fromEntries(
      Object.entries(this.constructor)
        .map(([key, value]) => [value, key])
    )
  }

  /**
   * Set the enum key
   *
   * @param {string} key
   */
  setKey (key) {
    this.key = key
  }

  /**
   * Set the enum value
   *
   * @param {any} value
   */
  setValue (value) {
    this.value = value
  }

  /**
   * Set the values
   */
  setValues () {
    Object.entries(this.constructor).forEach(([key, value]) => {
      this[key] = value
    })
  }

  /**
   * Check if the key is known in the enum
   *
   * @param {string} key
   *
   * @return {boolean}
   */
  isValidKey (key) {
    return Object.hasOwnProperty.call(this.constructor, key) && Object.propertyIsEnumerable.call(this.constructor, key)
  }

  /**
   * Check if the value is known in the enum
   *
   * @param {any} value
   *
   * @return {boolean}
   */
  isValidValue (value) {
    return this.values.includes(value)
  }

  /**
   * Check if the value is the current enum value
   *
   * @param {any} value
   *
   * @return {boolean}
   */
  is (value) {
    return this.value === value
  }

  /**
   * Check if the enum has these values
   *
   * @param {array} values
   *
   * @return {boolean}
   */
  in (values) {
    return values.includes(this.value)
  }

  /**
   * Check if the enum has this key
   *
   * @param {string} key
   *
   * @return {boolean}
   */
  static hasKey (key) {
    const newEnum = new this()

    return newEnum.isValidKey(key)
  }

  /**
   * Check if the enum has this value
   *
   * @param {any} value
   *
   * @return {boolean}
   */
  static hasValue (value) {
    const newEnum = new this()

    return newEnum.isValidValue(value)
  }

  /**
   * Get all the enum keys
   *
   * @return {array}
   */
  get keys () {
    return Object.keys(this.constructor)
  }

  /**
   * Get all the enum values
   *
   * @return {array}
   */
  get values () {
    return Object.values(this.constructor)
  }

  /**
   * Get the number of enum items
   *
   * @return {number}
   */
  get length () {
    return Object.keys(this.constructor).length
  }

  /**
   * Get the enum value
   *
   * @return {any}
   */
  valueOf () {
    return this.value
  }

  /**
   * Get the enum key (or value) as a string
   *
   * @return {string}
   */
  toString () {
    return this[this.output].toString()
  }

  /**
   * Get the enum key (or value)
   *
   * @return {any}
   */
  toJSON () {
    return this[this.output]
  }

  /**
   * Get the enum items as an object
   *
   * @return {object}
   */
  static toJSON () {
    return Object.fromEntries(Object.entries(this))
  }
}

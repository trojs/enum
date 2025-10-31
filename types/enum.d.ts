export class Enum {
    /**
     * Get the enum options
     * @returns {{ [k: string]: any; }}
     */
    static get options(): {
        [k: string]: any;
    };
    /**
     * Create an enum result by key
     * @param {string} key
     * @param {object} options
     * @returns {Enum}
     */
    static create(key: string, options?: object): Enum;
    /**
     * Get an enum result by key
     * @param {string} key
     * @param {object} options
     * @returns {Enum}
     */
    static fromKey(key: string, options?: object): Enum;
    /**
     * Get an enum result by value
     * @param {any} value
     * @param {object} options
     * @returns {Enum}
     */
    static fromValue(value: any, options?: object): Enum;
    /**
     * Check if the enum has this key
     * @param {string} key
     * @returns {boolean}
     */
    static hasKey(key: string): boolean;
    /**
     * Check if the enum has this value
     * @param {any} value
     * @returns {boolean}
     */
    static hasValue(value: any): boolean;
    /**
     * Get the enum items as an object
     * @returns {object}
     */
    static toJSON(): object;
    key: string;
    value: any;
    output: string;
    /**
     * Get the enum name
     * @returns {string}
     */
    get name(): string;
    /**
     * Set the key and value of the enum
     * @param {{ key: string, value: any }} keyValue
     */
    setKeyValue({ key, value }: {
        key: string;
        value: any;
    }): void;
    /**
     * Set the options of the enum
     * @param {object} options
     */
    setOptions(options: object): void;
    /**
     * Get the options inverted
     * @returns {object}
     */
    get invertedOptions(): object;
    /**
     * Set the enum key
     * @param {string} key
     */
    setKey(key: string): void;
    /**
     * Set the enum value
     * @param {any} value
     */
    setValue(value: any): void;
    /**
     * Set the values
     */
    setValues(): void;
    /**
     * Check if the key is known in the enum
     * @param {string} key
     * @returns {boolean}
     */
    isValidKey(key: string): boolean;
    /**
     * Check if the value is known in the enum
     * @param {any} value
     * @returns {boolean}
     */
    isValidValue(value: any): boolean;
    /**
     * Check if the value is the current enum value
     * @param {any} value
     * @returns {boolean}
     */
    is(value: any): boolean;
    /**
     * Check if the enum has these values
     * @param {Array} values
     * @returns {boolean}
     */
    in(values: any[]): boolean;
    /**
     * Get all the enum keys
     * @returns {Array}
     */
    get keys(): any[];
    /**
     * Get all the enum values
     * @returns {Array}
     */
    get values(): any[];
    /**
     * Get the number of enum items
     * @returns {number}
     */
    get length(): number;
    /**
     * Get the enum value
     * @returns {any}
     */
    valueOf(): any;
    /**
     * Get the enum key (or value) as a string
     * @returns {string}
     */
    toString(): string;
    /**
     * Get the enum key (or value)
     * @returns {any}
     */
    toJSON(): any;
}

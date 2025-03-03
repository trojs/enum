/* eslint-disable max-statements */
/* eslint-disable max-classes-per-file */
/* eslint-disable sonarjs/public-static-readonly */
import test from 'node:test'
import assert from 'node:assert'
import { Enum } from '../enum.js'

class Encoding extends Enum {
  static 'utf-8' = 'UTF-8'
}

test('Test the encoding enum', async (t) => {
  await t.test('It should work with the default enum', () => {
    assert.strictEqual(Enum.hasKey('test'), false)
    assert.strictEqual(Enum.hasValue('test'), false)
    assert.deepEqual(Enum.options, {})
  })

  await t.test('It should create from a key', () => {
    const encoding = Encoding.fromKey('utf-8')
    assert.strictEqual(encoding.key, 'utf-8')
    assert.strictEqual(encoding.value, 'UTF-8')
    assert.deepEqual(encoding.values, ['UTF-8'])
    assert.deepEqual(Encoding.options, {
      'utf-8': 'UTF-8'
    })
    assert.strictEqual(Encoding.options['utf-8'], 'UTF-8')
    assert.deepEqual(encoding.keys, ['utf-8'])
    assert.strictEqual(encoding['utf-8'], 'UTF-8')
    assert.strictEqual(encoding.length, 1)
    assert.strictEqual(encoding.is(Encoding['utf-8']), true)
    assert.strictEqual(encoding.is('UTF-8'), true)
    assert.strictEqual(encoding.is('something'), false)
    assert.strictEqual(encoding.in([Encoding['utf-8']]), true)
    assert.strictEqual(encoding.in(['UTF-8']), true)
    assert.strictEqual(encoding.in(['something']), false)
    assert.strictEqual(encoding.name, 'Encoding')
  })

  await t.test('It should create from an value', () => {
    const encoding = Encoding.fromValue('UTF-8')
    assert.strictEqual(encoding.key, 'utf-8')
    assert.strictEqual(encoding.value, 'UTF-8')
    assert.deepEqual(encoding.values, ['UTF-8'])
    assert.deepEqual(Encoding.options, {
      'utf-8': 'UTF-8'
    })
    assert.deepEqual(encoding.keys, ['utf-8'])
    assert.strictEqual(encoding['utf-8'], 'UTF-8')
    assert.strictEqual(encoding.length, 1)
  })

  await t.test('It should work with the static methods', () => {
    assert.strictEqual(Encoding.hasKey('utf-8'), true)
    assert.strictEqual(Encoding.hasKey('UTF-8'), false)
    assert.strictEqual(Encoding.hasValue('UTF-8'), true)
    assert.strictEqual(Encoding.hasValue('utf-8'), false)
  })

  await t.test('It should throw an exception for an unknown key', () => {
    try {
      Encoding.fromKey('UTF-8')
    } catch (error) {
      assert.strictEqual(error.message, 'Invalid Encoding key UTF-8')
    }
  })

  await t.test('It should throw an exception for an unknown value', () => {
    try {
      Encoding.fromValue('utf-8')
    } catch (error) {
      assert.strictEqual(error.message, 'Invalid Encoding value utf-8')
    }
  })

  await t.test('It should handle reserved word key', () => {
    class Example extends Enum {
      static key = 1
    }
    const example = Example.fromKey('key')

    assert.strictEqual(example.key, 'key')
    assert.strictEqual(example.value, 1)
    assert.deepEqual(example.values, [1])
    assert.deepEqual(Example.options, {
      key: 1
    })
    assert.deepEqual(example.keys, ['key'])
    assert.strictEqual(example.key, 'key')
    assert.strictEqual(example.length, 1)
    assert.strictEqual(example.name, 'Example')
  })

  await t.test('It should handle reserved word value', () => {
    class Example extends Enum {
      static value = 1
    }
    const example = Example.fromKey('value')

    assert.strictEqual(example.key, 'value')
    assert.strictEqual(example.value, 1)
    assert.deepEqual(example.values, [1])
    assert.deepEqual(Example.options, {
      value: 1
    })
    assert.deepEqual(example.keys, ['value'])
    assert.strictEqual(example.value, 1)
    assert.strictEqual(example.length, 1)
  })

  await t.test('It should handle reserved word options', () => {
    // @ts-ignore
    class Example extends Enum {
      static options = 42
    }
    const example = Example.fromKey('options')

    assert.strictEqual(example.key, 'options')
    assert.strictEqual(example.value, 42)
    assert.deepEqual(example.values, [42])
    assert.strictEqual(Example.options, 42)
    assert.deepEqual(example.keys, ['options'])
    // @ts-ignore
    assert.strictEqual(example.options, 42)
    assert.strictEqual(example.length, 1)
  })

  await t.test('It should handle reserved word is', () => {
    class Example extends Enum {
      static is = 42
    }
    const example = Example.fromKey('is')

    assert.strictEqual(example.key, 'is')
    assert.strictEqual(example.value, 42)
    assert.deepEqual(example.values, [42])
    assert.deepEqual(Example.options, {
      is: 42
    })
    assert.deepEqual(example.keys, ['is'])
    assert.strictEqual(example.is, 42)
    assert.strictEqual(example.length, 1)
    // @ts-ignore
    assert.strictEqual(example.in([Example.options.is]), true)
    assert.strictEqual(example.in([42]), true)
    assert.strictEqual(example.in(['something']), false)
  })

  await t.test('It should handle reserved word in', () => {
    class Example extends Enum {
      static in = 42
    }
    const example = Example.fromKey('in')

    assert.strictEqual(example.key, 'in')
    assert.strictEqual(example.value, 42)
    assert.deepEqual(example.values, [42])
    assert.deepEqual(Example.options, {
      in: 42
    })
    assert.deepEqual(example.keys, ['in'])
    assert.strictEqual(example.in, 42)
    assert.strictEqual(example.length, 1)
    assert.strictEqual(example.is(Example.in), true)
    assert.strictEqual(example.is(42), true)
    assert.strictEqual(example.is('something'), false)
  })

  await t.test('It should throw an exception when get the key keys', () => {
    try {
      class Example extends Enum {
        static keys = 1
      }
      Example.fromKey('keys')
    } catch (error) {
      assert.strictEqual(
        error.message,
        'Cannot set property keys of [object Object] which has only a getter'
      )
    }
  })

  await t.test('It should throw an exception when get the key values', () => {
    try {
      class Example extends Enum {
        static values = 1
      }
      Example.fromKey('values')
    } catch (error) {
      assert.strictEqual(
        error.message,
        'Cannot set property values of [object Object] which has only a getter'
      )
    }
  })

  await t.test('It should overrule the options', () => {
    // @ts-ignore
    class Example extends Enum {
      static options = 1
    }
    assert.strictEqual(Example.options, 1)
    const example = Example.fromKey('options')
    assert.deepEqual(example.values, [1])

    Example.options = 42
    assert.strictEqual(Example.options, 42)
    assert.deepEqual(example.values, [42])

    Example.options2 = 2
    assert.strictEqual(Example.options, 42)
    assert.strictEqual(Example.options2, 2)
    assert.deepEqual(example.values, [42, 2])
  })

  await t.test('It should also work with multiple options', () => {
    class Example extends Enum {
      static test1 = 1

      static test2 = 2

      static test3 = 3
    }

    const example = Example.create('test2')
    assert.strictEqual(example.key, 'test2')
    assert.strictEqual(example.value, 2)
    assert.deepEqual(example.values, [1, 2, 3])
    assert.deepEqual(Example.options, {
      test1: 1,
      test2: 2,
      test3: 3
    })
    assert.deepEqual(Example.toJSON(), {
      test1: 1,
      test2: 2,
      test3: 3
    })
    assert.strictEqual(
      JSON.stringify(Example),
      '{"test1":1,"test2":2,"test3":3}'
    )
    assert.strictEqual(Example.test1, 1)
    assert.strictEqual(Example.test2, 2)
    assert.strictEqual(Example.test3, 3)
    // @ts-ignore
    assert.strictEqual(Example.options.test2, 2)
    assert.deepEqual(example.keys, ['test1', 'test2', 'test3'])
    // @ts-ignore
    assert.strictEqual(example.test2, 2)
    assert.strictEqual(example.length, 3)
    assert.strictEqual(example.is(Example.test2), true)
    assert.strictEqual(example.is(2), true)
    assert.strictEqual(example.is('something'), false)
    assert.strictEqual(example.in([Example.test2]), true)
    assert.strictEqual(example.in([2]), true)
    assert.strictEqual(example.in(['something']), false)
    assert.strictEqual(example.valueOf(), 2)
    assert.strictEqual(example.toString(), 'test2')
    assert.strictEqual(example.toJSON(), 'test2')
    assert.strictEqual(JSON.stringify(example), '"test2"')
  })

  await t.test('It should use the value for toString and toJSON', () => {
    class Example extends Enum {
      static test1 = 1

      static test2 = 2

      static test3 = 3
    }

    const example = Example.create('test2', { output: 'value' })
    assert.strictEqual(example.key, 'test2')
    assert.strictEqual(example.value, 2)
    assert.deepEqual(example.values, [1, 2, 3])
    assert.deepEqual(Example.options, {
      test1: 1,
      test2: 2,
      test3: 3
    })
    assert.deepEqual(Example.toJSON(), {
      test1: 1,
      test2: 2,
      test3: 3
    })
    assert.strictEqual(
      JSON.stringify(Example),
      '{"test1":1,"test2":2,"test3":3}'
    )
    assert.strictEqual(Example.test1, 1)
    assert.strictEqual(Example.test2, 2)
    assert.strictEqual(Example.test3, 3)
    // @ts-ignore
    assert.strictEqual(Example.options.test2, 2)
    assert.deepEqual(example.keys, ['test1', 'test2', 'test3'])
    // @ts-ignore
    assert.strictEqual(example.test2, 2)
    assert.strictEqual(example.length, 3)
    assert.strictEqual(example.is(Example.test2), true)
    assert.strictEqual(example.is(2), true)
    assert.strictEqual(example.is('something'), false)
    assert.strictEqual(example.in([Example.test2]), true)
    assert.strictEqual(example.in([2]), true)
    assert.strictEqual(example.in(['something']), false)
    assert.strictEqual(example.valueOf(), 2)
    assert.strictEqual(example.toString(), '2')
    assert.strictEqual(example.toJSON(), 2)
    assert.strictEqual(JSON.stringify(example), '2')
  })
})

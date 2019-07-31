'use strict'

const tap = require('tap')

function promiseTests(Promise) {
  tap.test('Promises', (t) => {
    t.autoend()

    t.test('should execute the executor synchronously', (t) => {
      let counter = 0
      new Promise((resolve, reject) => {
        t.equal(++counter, 1, 'should execute in order')
      })
      t.equal(++counter, 2, 'should execute in order')
      t.end()
    })

    t.test('should sequence thens properly', (t) => {
      let counter = 0
      new Promise((resolve, reject) => {
        t.equal(++counter, 1, 'should execute in order')
        resolve()
      }).then(() => {
        t.equal(++counter, 3, 'should execute in order')
      }).then(() => {
        t.equal(++counter, 4, 'should execute in order')
        t.end()
      })
      t.equal(++counter, 2, 'should execute in order')
    })

    t.test('should propagate values properly', (t) => {
      new Promise((resolve, reject) => {
        resolve('test')
      }).then((v) => {
        t.equal(v, 'test', 'should propagate values properly')
        return 'next'
      }).then((v) => {
        t.equal(v, 'next', 'should propagate values properly')
        t.end()
      })
    })

    t.test('should catch thrown values', (t) => {
      new Promise((resolve, reject) => {
        reject('test')
      }).catch((e) => {
        t.equal(e, 'test', 'should catch values')
        t.end()
      })
    })

    t.test('should catch thrown values from then handlers', (t) => {
      new Promise((resolve, reject) => {
        resolve()
      }).then(() => {
        throw 'test'
      }).catch((e) => {
        t.equal(e, 'test', 'should catch values')
        t.end()
      })
    })

    t.test('should throw values over then handlers', (t) => {
      new Promise((resolve, reject) => {
        resolve()
      }).then(() => {
        throw 'test'
      }).then(() => {
        t.error(new Error('should never happen!'), 'then handler hit when it should not be')
      }).catch((e) => {
        t.equal(e, 'test', 'should catch values')
        t.end()
      })
    })
  })
}

module.exports = promiseTests

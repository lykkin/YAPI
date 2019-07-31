'use strict'

class MyPromise {
  constructor(executor) {
    this._val = null
    this._thenHandler = null
    executor(
      this._resolve.bind(this),
      this._reject.bind(this)
    )
  }

  _resolve(val) {
    this._val = val
    if (this._thenHandler) {
      this._thenHandler(val)
    }
  }

  _reject(err) {
  }

  then(thenHandler) {
    const p = this
    return new MyPromise(function thenExec(resolve, reject) {
      if (p._val) {
        scheduleThen(p._val)
      } else {
        p._thenHandler = scheduleThen
      }
      function scheduleThen(val) {
        setImmediate(
          () => resolve(thenHandler(val))
        )
      }
    })
  }
}

module.exports = MyPromise

'use strict';

class MyPromise {
  constructor(executor) {
    this._val = null;
    this._thenHandler = null;
    this._state = 'pending';
    executor(this._resolve.bind(this), this._reject.bind(this));
  }

  _resolve(val) {
    this._val = val;
    if (this._thenHandler) {
      this._thenHandler(val);
    }
    this._state = 'resolved';
  }

  _reject(val) {
    this._val = val;
    if (this._catchHandler) {
      this._catchHandler(val);
    }
    this._state = 'rejected';
  }

  then(thenHandler) {
    const p = this;
    return new MyPromise(function thenExec(resolve, reject) {
      if (p._state == 'resolved') {
        scheduleThen(p._val);
      } else if (p._state == 'rejected') {
        setImmediate(() => reject(p._val));
      } else {
        p._thenHandler = scheduleThen;
      }
      function scheduleThen(val) {
        setImmediate(() => {
          try {
          resolve(thenHandler(val));
        } catch(e) {
          reject(e);
        }});
      }
    });
  }

  catch(catchHandler) {
    const p = this;
    return new MyPromise(function catchExec(resolve, reject) {
      if (p._state === 'rejected') {
        scheduleThen(p._val);
      } else {
        p._catchHandler = scheduleThen;
      }
      function scheduleThen(val) {
        setImmediate(() => {
          try {
            resolve(catchHandler(val));
          } catch(e) {
            reject(e);
          }
        });
      }
    });
  }
}

module.exports = MyPromise;

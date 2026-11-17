export class AsyncLocalStorage {
  getStore() { return undefined; }
  run(store, callback, ...args) { return callback(...args); }
  enterWith() {}
}
export class PassThrough {}
export class Readable {}
export class Writable {}
export class Transform {}
export default { AsyncLocalStorage, PassThrough, Readable, Writable, Transform };
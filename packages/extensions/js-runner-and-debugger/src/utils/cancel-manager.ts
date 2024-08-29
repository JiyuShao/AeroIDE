type CancelHandler = () => void;

class CancelSignal {
  private _cancelled: boolean = false;
  private _handlers: CancelHandler[] = [];

  get cancelled(): boolean {
    return this._cancelled;
  }

  addEventListener(type: 'cancel', handler: CancelHandler) {
    if (type === 'cancel') {
      this._handlers.push(handler);
    }
  }

  removeEventListener(type: 'cancel', handler: CancelHandler) {
    if (type === 'cancel') {
      this._handlers = this._handlers.filter(h => h !== handler);
    }
  }

  dispatchEvent(type: 'cancel') {
    if (type === 'cancel' && !this._cancelled) {
      this._cancelled = true;
      this._handlers.forEach(handler => handler());
    }
  }
}

export class CancelManager {
  private _signal: CancelSignal;

  constructor() {
    this._signal = new CancelSignal();
  }

  get signal(): CancelSignal {
    return this._signal;
  }

  async runCancellable<T>(promise: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._signal.addEventListener('cancel', () =>
        reject(new Error('Operation cancelled'))
      );
      promise.then(resolve).catch(reject);
    });
  }

  cancel() {
    this._signal.dispatchEvent('cancel');
  }
}

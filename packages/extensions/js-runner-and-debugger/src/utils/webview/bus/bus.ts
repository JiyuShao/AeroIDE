import { injectable } from 'inversify';

class EventEmitter {
  private events: Map<string, Listener[]>;

  constructor() {
    this.events = new Map();
  }

  public on(eventName: string, listener: Listener): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(listener);
  }

  public off(eventName: string, listener: Listener): void {
    if (!this.events.has(eventName)) return;
    const listeners = this.events.get(eventName)!;
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  public emit(eventName: string, ...args: any[]): void {
    if (!this.events.has(eventName)) return;
    const listeners = this.events.get(eventName)!;
    listeners.forEach(listener => {
      listener(...args);
    });
  }
}

@injectable()
export class Bus extends EventEmitter {}
type Listener = (...args: any[]) => void;

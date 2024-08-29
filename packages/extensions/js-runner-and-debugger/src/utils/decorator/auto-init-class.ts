import { logger } from '../logger';

export function autoInit(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const _that = this as AutoInitClass;
    if (!_that['_initPromise']) {
      _that['_initPromise'] = _that['_init']();
    }
    return _that['_initPromise']
      .then(() => originalMethod.apply(this, args))
      .catch((err: Error) => {
        logger.debug(
          `${target.constructor.name}.${propertyKey} @autoInit failed:`,
          err
        );
        throw err;
      });
  };

  return descriptor;
}

export abstract class AutoInitClass {
  protected abstract _init: () => Promise<void>;
  protected _initPromise?: Promise<void>;
}

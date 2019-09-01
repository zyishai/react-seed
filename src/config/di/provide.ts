import 'reflect-metadata';
import { HAS_METADATA_KEY, METADATA_FACTORY_KEY } from './constants';

interface ProviderOptions {
    behaviour: 'single' | 'multi';
}

interface ClassType<T> {
    new(): T;
    [key: string]: any;
}

function provide(options: ProviderOptions = { behaviour: 'single' }) {
    return function<T>(target: ClassType<T>) {
        if (Reflect.getMetadata(HAS_METADATA_KEY, target)) {
            return target;
        }

        var factory: () => T;
        switch (options.behaviour) {
            case 'multi': {
                factory = () => new target();
                break;
            }
            case 'single':
            default: {
                if (!target.singleton) {
                    target.singleton = new target();
                }
                factory = () => target.singleton;
                break;
            }
        }

        Reflect.defineMetadata(HAS_METADATA_KEY, true, target);
        Reflect.defineMetadata(METADATA_FACTORY_KEY, factory, target);
        return target;
    }
}

export {
    provide
};
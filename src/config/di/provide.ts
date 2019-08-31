import 'reflect-metadata';
import { HAS_METADATA_KEY, METADATA_FACTORY_KEY } from './constants';

interface ProviderOptions {
    behaviour: 'single' | 'multi';
}


function provide(options: ProviderOptions = { behaviour: 'single' }) {
    return function<T>(target: T) {
        if (Reflect.getMetadata(HAS_METADATA_KEY, target)) {
            return target;
        }

        var factory: () => T;
        switch (options.behaviour) {
            case 'multi': {
                factory = () => new (target as any)();
                break;
            }
            case 'single':
            default: {
                if (!(target as any).singleton) {
                    (target as any).singleton = new (target as any)();
                }
                factory = () => (target as any).singleton;
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
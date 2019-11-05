import 'reflect-metadata';
import { HAS_METADATA_KEY, METADATA_FACTORY_KEY } from './constants';
import { ClassType } from './types';
import { resolveDependencies } from './common';

interface ProviderOptions {
    behaviour: 'single' | 'multi';
}

// TODO: handle instantiation of specific properties (inside or outside of the constructor).
// also, update inject.
function instantiateService<T>(service: ClassType<T>) {
    let dependencies = Reflect.getMetadata('design:paramtypes', service);
    if (!dependencies || (dependencies && !dependencies.length)) {
        return new service();
    } else {
        dependencies = resolveDependencies(dependencies);
        return new service(...dependencies);
    }
}

function provide(options: ProviderOptions = { behaviour: 'single' }) {
    return function<T>(target: ClassType<T>) {
        if (Reflect.getMetadata(HAS_METADATA_KEY, target)) {
            return target;
        }

        var factory: () => T; // should return instance of the service (with any additional internal deps).
        switch (options.behaviour) {
            case 'multi': {
                factory = () => instantiateService(target);
                break;
            }
            case 'single':
            default: {
                if (!target.singleton) {
                    target.singleton = instantiateService(target);
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
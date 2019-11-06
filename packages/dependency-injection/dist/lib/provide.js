import 'reflect-metadata';
import { HAS_METADATA_KEY, METADATA_FACTORY_KEY } from './constants';
import { resolveDependencies } from './common';
function instantiateService(service) {
    let dependencies = Reflect.getMetadata('design:paramtypes', service);
    if (!dependencies || (dependencies && !dependencies.length)) {
        return new service();
    }
    else {
        dependencies = resolveDependencies(dependencies);
        return new service(...dependencies);
    }
}
function provide(options = { behaviour: 'single' }) {
    return function (target) {
        if (Reflect.getMetadata(HAS_METADATA_KEY, target)) {
            return target;
        }
        var factory;
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
    };
}
export { provide };
//# sourceMappingURL=provide.js.map
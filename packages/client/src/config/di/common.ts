import { ObjectType, ClassType } from "./types";
import { METADATA_FACTORY_KEY, HAS_METADATA_KEY } from "./constants";

function resolveDependencies(dependencies: ObjectType | Array<ClassType<any>>): any {
    if (Array.isArray(dependencies)) {
        const result = [];
        for (let dependency of dependencies) {
            if (!Reflect.getMetadata(HAS_METADATA_KEY, dependency)) {
                throw new TypeError(`Provider for ${dependency.name} not found`);
            } else {
                const depFactory = Reflect.getMetadata(METADATA_FACTORY_KEY, dependency);
                result.push(depFactory());
            }
        }

        return result;
    } else {
        let injectedServices: ObjectType = {};
        for (let name of Object.keys(dependencies)) {
            const depClass = dependencies[name];
            const depFactory = Reflect.getMetadata(METADATA_FACTORY_KEY, depClass);
            if (depFactory && typeof depFactory === 'function') {
                const depInstance = depFactory();
                injectedServices[name] = depInstance;
            } else {
                throw new TypeError(`Provider for ${depClass.name} not found`);
            }
        }
        return injectedServices;
    }
}

export {
    resolveDependencies
};
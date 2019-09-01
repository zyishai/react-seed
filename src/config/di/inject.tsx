import React from 'react';
import 'reflect-metadata';
import { METADATA_FACTORY_KEY } from './constants';

interface ObjectType {
    [key: string]: any;
}

const inject = function<P extends ObjectType>(services: P) { 
    return function<T extends ObjectType>(Component: React.FC<T>) {
        const injectedProps: ObjectType = {};

        for (let serviceName of Object.keys(services)) {
            const serviceClass = services[serviceName];
            const serviceFactory = Reflect.getMetadata(METADATA_FACTORY_KEY, serviceClass);    
            if (serviceFactory && typeof serviceFactory === 'function') {
                const serviceInstance = serviceFactory();
                injectedProps[serviceName] = serviceInstance;
            } else {
                throw new TypeError(`Provider for ${serviceClass.name} not found`);
            }
        }

        return ((props: Omit<T, keyof P>) => {
            const C = Component as any;
            return <C {...injectedProps} {...props} />;
        })
    }
}

export {
    inject
};
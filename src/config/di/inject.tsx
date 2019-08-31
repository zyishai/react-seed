import React from 'react';
import 'reflect-metadata';
import { METADATA_FACTORY_KEY } from './constants';

type ExtractProps<T extends Object, P extends Object> = {
    [K in keyof T]: K extends keyof P ? never : T[K];
}

const inject = function<P extends {[key: string]: Object}>(services: P) { 
    return function<T extends {[key: string]: Object}>(Component: React.FC<T>): React.FC<Omit<T, keyof P>> {
        const injectedProps: {[key: string]: Object} = {};

        for (let serviceName of Object.keys(services)) {
            const serviceClass = services[serviceName];
            const serviceFactory = Reflect.getMetadata(METADATA_FACTORY_KEY, serviceClass);    
            const serviceInstance = serviceFactory();

            injectedProps[serviceName] = serviceInstance;
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
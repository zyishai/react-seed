import React from 'react';
import 'reflect-metadata';
import { ObjectType, InjectionConfig } from './types';
import { resolveDependencies } from './common';

const inject = function<P extends ObjectType>(services?: P) { 
    return function<T extends ObjectType>(Component: React.FC<T>) {
        let injectedProps: ObjectType = {};

        if (services) {
            injectedProps = resolveDependencies(services) as ObjectType;
        }

        return ((props: Omit<T, keyof P>) => {
            const C = Component as any;
            return <C {...injectedProps} {...props} />;
        })
    }
}

const injectServices = function(config: InjectionConfig) {
    config.forEach(([Component, serviceConfig]) => {
        Component.defaultProps = Component.defaultProps || {};

        if (Array.isArray(serviceConfig)) {
            const deps: any[] = resolveDependencies(serviceConfig);
            deps.forEach(dependency => {
                const serviceName = dependency.name as string;
                if (serviceName) {
                    const propName = serviceName.charAt(0).toLowerCase() + serviceName.slice(1);
                    (Component.defaultProps as Partial<any>)[propName] = dependency;
                }
            });
        } else {
            Object.keys(serviceConfig).forEach(propName => {
                (Component.defaultProps as Partial<any>)[propName] = resolveDependencies([serviceConfig[propName]])[0];
            });
        }
    });
}

export {
    inject,
    injectServices
};
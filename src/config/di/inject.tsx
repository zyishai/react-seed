import React from 'react';
import 'reflect-metadata';
import { ObjectType } from './types';
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

export {
    inject
};
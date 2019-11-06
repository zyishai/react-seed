import React from 'react';
import 'reflect-metadata';
import { ObjectType, InjectionConfig } from './types';
declare const inject: <P extends ObjectType>(services?: P) => <T extends ObjectType>(Component: React.FC<T>) => (props: Pick<T, Exclude<keyof T, keyof P>>) => JSX.Element;
declare const injectServices: (config: InjectionConfig) => void;
export { inject, injectServices };

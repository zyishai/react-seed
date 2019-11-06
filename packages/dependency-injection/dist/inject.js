import React from 'react';
import 'reflect-metadata';
import { resolveDependencies } from './common';
const inject = function (services) {
    return function (Component) {
        let injectedProps = {};
        if (services) {
            injectedProps = resolveDependencies(services);
        }
        return ((props) => {
            const C = Component;
            return React.createElement(C, Object.assign({}, injectedProps, props));
        });
    };
};
const injectServices = function (config) {
    config.forEach(([Component, serviceConfig]) => {
        Component.defaultProps = Component.defaultProps || {};
        if (Array.isArray(serviceConfig)) {
            const deps = resolveDependencies(serviceConfig);
            deps.forEach(dependency => {
                const serviceName = dependency.name;
                if (serviceName) {
                    const propName = serviceName.charAt(0).toLowerCase() + serviceName.slice(1);
                    Component.defaultProps[propName] = dependency;
                }
            });
        }
        else {
            Object.keys(serviceConfig).forEach(propName => {
                Component.defaultProps[propName] = resolveDependencies([serviceConfig[propName]])[0];
            });
        }
    });
};
export { inject, injectServices };
//# sourceMappingURL=inject.js.map
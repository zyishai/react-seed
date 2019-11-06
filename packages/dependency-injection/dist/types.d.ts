/// <reference types="react" />
export interface ObjectType {
    [key: string]: any;
}
export interface ClassType<T> {
    new (...props: any): T;
    [key: string]: any;
}
declare type InjectionServicesConfig = ObjectType[] | {
    [prop: string]: ObjectType;
};
export declare type InjectionConfig = Array<[React.ComponentType<any>, InjectionServicesConfig]>;
export {};

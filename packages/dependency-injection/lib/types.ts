export interface ObjectType {
    [key: string]: any;
}

export interface ClassType<T> {
    new(...props: any): T;
    [key: string]: any;
}

type InjectionServicesConfig = ObjectType[] | {
    [prop: string]: ObjectType;
}
export type InjectionConfig = Array<[React.ComponentType<any>, InjectionServicesConfig]>;
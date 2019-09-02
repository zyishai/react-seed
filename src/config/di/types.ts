export interface ObjectType {
    [key: string]: any;
}

export interface ClassType<T> {
    new(...props: any): T;
    [key: string]: any;
}
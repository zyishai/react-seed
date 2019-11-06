import { ObjectType, ClassType } from "./types";
declare function resolveDependencies(dependencies: ObjectType | Array<ClassType<any>>): any;
export { resolveDependencies };

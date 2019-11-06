import 'reflect-metadata';
import { ClassType } from './types';
interface ProviderOptions {
    behaviour: 'single' | 'multi';
}
declare function provide(options?: ProviderOptions): <T>(target: ClassType<T>) => ClassType<T>;
export { provide };

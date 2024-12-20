import { ObjectStyleCascadeOptions, CascadeNode, CascadeParamsOptions, ArrayStyleCascadeOptions } from './cascadeOptions.js';
export declare function parseCascadeOptions<T>(value: unknown): CascadeParamsOptions<T> | undefined;
export declare function normalizeCascadeOptions<T>(options: ArrayStyleCascadeOptions<T> | ObjectStyleCascadeOptions<T>): CascadeNode<T>[];

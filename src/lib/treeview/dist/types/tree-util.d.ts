import { ObjectStyleTreeOptions, TreeNode, TreeParamsOptions, ArrayStyleTreeOptions } from './treeOptions.js';
export declare function parseTreeOptions<T>(value: unknown): TreeParamsOptions<T> | undefined;
export declare function normalizeTreeOptions<T>(options: ArrayStyleTreeOptions<T> | ObjectStyleTreeOptions<T>): TreeNode<T>[];

import { ListItem } from '@tweakpane/core';
export interface TreeNode<T> extends ListItem<T> {
    children?: T[];
}
export type ArrayStyleTreeOptions<T> = TreeNode<T>[];
export type ObjectStyleTreeOptions<T> = {
    [text: string]: {
        value: T;
        children?: T[];
    };
};
export type TreeParamsOptions<T> = ArrayStyleTreeOptions<T> | ObjectStyleTreeOptions<T>;

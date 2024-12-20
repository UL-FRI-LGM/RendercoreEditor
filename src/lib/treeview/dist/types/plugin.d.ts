import { BaseBladeParams, BladePlugin } from '@tweakpane/core';
import { TreeParamsOptions } from './treeOptions.js';
export interface TreeViewBladeParams<T> extends BaseBladeParams {
    options: TreeParamsOptions<T>;
    value: T;
    view: 'treeview';
    height?: string;
    label?: string;
}
export declare const TreeViewBladePlugin: BladePlugin<TreeViewBladeParams<unknown>>;

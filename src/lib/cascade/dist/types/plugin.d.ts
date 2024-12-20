import { BaseBladeParams, BladePlugin } from '@tweakpane/core';
import { CascadeParamsOptions } from './cascadeOptions.js';
export interface CascadeMenuBladeParams<T> extends BaseBladeParams {
    options: CascadeParamsOptions<T>;
    value: T;
    view: 'cascadeMenu';
    label?: string;
}
export declare const CascadeMenuPlugin: BladePlugin<CascadeMenuBladeParams<unknown>>;

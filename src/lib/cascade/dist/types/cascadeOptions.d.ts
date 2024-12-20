import { ListItem } from '@tweakpane/core';
export interface CascadeNode<T> extends ListItem<T> {
    value: T;
    text: string;
    expanded?: boolean;
    children?: T[];
}
export type ArrayStyleCascadeOptions<T> = CascadeNode<T>[];
export type ObjectStyleCascadeOptions<T> = {
    [text: string]: {
        value: T;
        children?: T[];
    };
};
export type CascadeParamsOptions<T> = ArrayStyleCascadeOptions<T> | ObjectStyleCascadeOptions<T>;

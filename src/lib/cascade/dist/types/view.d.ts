import { Value, ValueMap, ViewProps, View } from '@tweakpane/core';
import { CascadeNode } from './cascadeOptions.js';
export type CascadeProps<T> = ValueMap<{
    options: CascadeNode<T>[];
}>;
interface Config<T> {
    props: CascadeProps<T>;
    value: Value<T>;
    viewProps: ViewProps;
    root: Value<T>;
    top: string;
}
export declare class CascadeView<T> implements View {
    readonly element: HTMLElement;
    readonly value_: Value<T>;
    private readonly props_;
    private readonly top;
    constructor(doc: Document, config: Config<T>);
    private initMenu;
    private createMenu;
    private findOptionByValue;
    private update_;
    private onValueChange_;
}
export {};

import { BladeState, PropsPortable, Value, ViewProps, ListProps, ValueController } from '@tweakpane/core';
import { TreeView } from './view.js';
/**
 * @hidden
 */
interface Config<T> {
    props: ListProps<T>;
    value: Value<T>;
    viewProps: ViewProps;
    maxheight?: string;
}
/**
 * @hidden
 */
export declare class TreeViewController<T> implements ValueController<T, TreeView<T>>, PropsPortable {
    readonly value: Value<T>;
    readonly view: TreeView<T>;
    readonly props: ListProps<T>;
    readonly viewProps: ViewProps;
    readonly maxheight?: string;
    constructor(doc: Document, config: Config<T>);
    private onSelectChange_;
    importProps(state: BladeState): boolean;
    exportProps(): BladeState;
}
export {};

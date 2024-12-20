import { BladeState, PropsPortable, Value, ViewProps, ListProps, ValueController } from '@tweakpane/core';
import { CascadeView } from './view.js';
/**
 * @hidden
 */
interface Config<T> {
    root: Value<T>;
    props: ListProps<T>;
    value: Value<T>;
    viewProps: ViewProps;
    top: string;
}
/**
 * @hidden
 */
export declare class CascadeMenuController<T> implements ValueController<T, CascadeView<T>>, PropsPortable {
    readonly value: Value<T>;
    readonly view: CascadeView<T>;
    readonly props: ListProps<T>;
    readonly viewProps: ViewProps;
    readonly root: Value<T>;
    readonly top: string;
    constructor(doc: Document, config: Config<T>);
    private onSelectChange_;
    importProps(state: BladeState): boolean;
    exportProps(): BladeState;
}
export {};

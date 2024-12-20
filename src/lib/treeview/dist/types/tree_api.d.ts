import { ApiChangeEvents, BladeApi, EventListenable, LabeledValueBladeController } from '@tweakpane/core';
import { TreeViewController } from './controller.js';
import { TreeNode } from './treeOptions.js';
export declare class TreeBladeApi<T> extends BladeApi<LabeledValueBladeController<T, TreeViewController<T>>> implements EventListenable<ApiChangeEvents<T>> {
    private readonly emitter_;
    /**
     * @hidden
     */
    constructor(controller: LabeledValueBladeController<T, TreeViewController<T>>);
    get label(): string | null | undefined;
    set label(label: string | null | undefined);
    get options(): TreeNode<T>[];
    set options(options: TreeNode<T>[]);
    get value(): T;
    set value(value: T);
    on<EventName extends keyof ApiChangeEvents<T>>(eventName: EventName, handler: (ev: ApiChangeEvents<T>[EventName]) => void): this;
    off<EventName extends keyof ApiChangeEvents<T>>(eventName: EventName, handler: (ev: ApiChangeEvents<T>[EventName]) => void): this;
}

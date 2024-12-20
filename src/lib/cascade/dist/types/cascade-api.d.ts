import { ApiChangeEvents, BladeApi, EventListenable, LabeledValueBladeController } from '@tweakpane/core';
import { CascadeMenuController } from './controller.js';
import { CascadeNode } from './cascadeOptions.js';
export declare class CascadeApi<T> extends BladeApi<LabeledValueBladeController<T, CascadeMenuController<T>>> implements EventListenable<ApiChangeEvents<T>> {
    private readonly emitter_;
    /**
     * @hidden
     */
    constructor(controller: LabeledValueBladeController<T, CascadeMenuController<T>>);
    get label(): string | null | undefined;
    set label(label: string | null | undefined);
    get options(): CascadeNode<T>[];
    set options(options: CascadeNode<T>[]);
    get value(): T;
    set value(value: T);
    on<EventName extends keyof ApiChangeEvents<T>>(eventName: EventName, handler: (ev: ApiChangeEvents<T>[EventName]) => void): this;
    off<EventName extends keyof ApiChangeEvents<T>>(eventName: EventName, handler: (ev: ApiChangeEvents<T>[EventName]) => void): this;
}

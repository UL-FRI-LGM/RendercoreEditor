import { BaseBladeParams, ViewProps, Controller, Bindable, ButtonParams, BindingParams, BindingApi, BladeApi, BladeController, ButtonApi, View, LabelController } from '@tweakpane/core';
import { Pane } from 'tweakpane';
export interface Width {
    width?: string;
}
interface RowConfig {
    viewProps: ViewProps;
}
export interface CellBladeParams extends BaseBladeParams, Width {
}
export interface TableRowParams extends BaseBladeParams {
    view: 'tableRow';
    label: string;
    cells?: Array<CellBladeParams>;
}
export declare class RowApi extends BladeApi<LabelController<RowController>> {
    getCell(i: number): BladeApi<BladeController<View>>;
    getPane(): RowPane;
}
export type Formatter<T> = (value: T) => string;
declare class RowPane extends Pane {
    addBinding<O extends Bindable, Key extends keyof O>(object: O, key: Key, opt_params?: BindingParams & Width): BindingApi<unknown, O[Key]>;
    addButton(params: ButtonParams & Width): ButtonApi;
    addBlade(params: CellBladeParams): BladeApi<BladeController<View>>;
}
export declare class RowController implements Controller<RowView> {
    readonly view: RowView;
    readonly viewProps: ViewProps;
    readonly cells: RowPane;
    constructor(doc: Document, config: RowConfig, cellsParams: CellBladeParams[]);
}
export declare class RowView implements View {
    readonly element: HTMLElement;
    constructor(doc: Document, config: RowConfig);
}
export {};

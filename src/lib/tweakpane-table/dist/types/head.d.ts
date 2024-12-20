import { BaseBladeParams, BladeApi, BladeController, Controller, LabelController, View, ViewProps } from '@tweakpane/core';
import { Pane } from 'tweakpane';
export interface TableHeadParams extends BaseBladeParams {
    view: 'tableHead';
    label: string;
    headers: Array<HeaderParams>;
}
export interface HeaderParams {
    label: string;
    width?: string;
}
export declare class HeadApi extends BladeApi<LabelController<TableHeadController>> {
    getCell(i: number): BladeApi<BladeController<View>>;
}
interface HeadConfig {
    viewProps: ViewProps;
}
export declare class TableHeadController implements Controller<HeadView> {
    readonly view: HeadView;
    readonly viewProps: ViewProps;
    readonly headers: Pane;
    readonly cellsApis: BladeApi<BladeController<View>>[];
    constructor(doc: Document, config: HeadConfig, headersParams: HeaderParams[]);
}
export declare class HeadView implements View {
    readonly element: HTMLElement;
    constructor(doc: Document, config: HeadConfig);
}
export {};

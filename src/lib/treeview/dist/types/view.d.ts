import { Value, ValueMap, ViewProps, View } from '@tweakpane/core';
type TreeNode<T> = {
    text: string;
    value: T;
    children?: T[];
};
export type TreeProps<T> = ValueMap<{
    options: TreeNode<T>[];
}>;
interface Config<T> {
    props: TreeProps<T>;
    value: Value<T>;
    viewProps: ViewProps;
    maxheight?: string;
}
export declare class TreeView<T> implements View {
    readonly element: HTMLElement;
    readonly hiddenRoot: HTMLElement;
    readonly value_: Value<T>;
    private readonly props_;
    private draggedNode_;
    private selectedNodeElement_;
    private selectedNode;
    constructor(doc: Document, config: Config<T>);
    private renderTree_;
    private addListenersToRoot_;
    private createNodeElement_;
    private handleDrop_;
    private toggleNode_;
    private isParentOfNode;
    private findNodesByValues;
    private findParentByChildValue;
    private removeChildElementsExceptFirst;
    private selectNode_;
    private update_;
    private onValueChange_;
}
export {};

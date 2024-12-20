export declare const id = "tablePlugin";
export declare const css = "__css__";
export * from './headPlugin.js';
export * from './rowPlugin.js';
export * from './row.js';
export * from './head.js';
export declare const plugins: (import("@tweakpane/core").BladePlugin<import("./head.js").TableHeadParams> | import("@tweakpane/core").BladePlugin<import("./row.js").TableRowParams>)[];

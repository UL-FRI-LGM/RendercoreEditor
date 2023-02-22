import { VertexStepMode } from "./VertexStepMode.js";


export class VertexBufferLayout { //RC vertex buffer layout


    static DEFAULT = {
        ARRAY_STRIDE: undefined,
        STEP_MODE: VertexStepMode.VERTEX,
        ATTRIBUTES: new Array(),
    };


    #arrayStride;
    #stepMode;
    #attributes;


    constructor(args = {}) {
        this.arrayStride = args.arrayStride !== undefined ? args.arrayStride : VertexBufferLayout.DEFAULT.ARRAY_STRIDE;
        this.stepMode = args.stepMode !== undefined ? args.stepMode : VertexBufferLayout.DEFAULT.STEP_MODE;
        this.attributes = args.attributes !== undefined ? args.attributes : new Array(VertexBufferLayout.DEFAULT.ATTRIBUTES); //copy
    }


    get arrayStride() { return this.#arrayStride; }
    set arrayStride(arrayStride) { this.#arrayStride = arrayStride; }
    get stepMode() { return this.#stepMode; }
    set stepMode(stepMode) { this.#stepMode = stepMode; }
    get attributes() { return this.#attributes; }
    set attributes(attributes) { this.#attributes = attributes; }
};
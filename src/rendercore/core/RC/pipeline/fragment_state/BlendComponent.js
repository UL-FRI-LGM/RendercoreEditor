import { BlendFactor } from "./BlendFactor.js";
import { BlendOperation } from "./BlendOperation.js";


export class BlendComponent {


    static DEFAULT = {
        OPERATION: BlendOperation.ADD,
        SRC_FACTOR: BlendFactor.ONE,
        DST_FACTOR: BlendFactor.ZERO,
    };


    #operation;
    #srcFactor;
    #dstFactor;


    constructor(args = {}) {
        this.operation = args.operation !== undefined ? args.operation : BlendComponent.DEFAULT.OPERATION;
        this.srcFactor = args.srcFactor !== undefined ? args.srcFactor : BlendComponent.DEFAULT.SRC_FACTOR;
        this.dstFactor = args.dstFactor !== undefined ? args.dstFactor : BlendComponent.DEFAULT.DST_FACTOR;
    }


    get operation() { return this.#operation; }
    set operation(operation) { this.#operation = operation; }
    get srcFactor() { return this.#srcFactor; }
    set srcFactor(srcFactor) { this.#srcFactor = srcFactor; }
    get dstFactor() { return this.#dstFactor; }
    set dstFactor(dstFactor) { this.#dstFactor = dstFactor; }
};
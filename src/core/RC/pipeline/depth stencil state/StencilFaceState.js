import { CompareFunction } from "./CompareFunction.js";
import { StencilOperation } from "./StencilOperation.js";


export class StencilFaceState {


    static DEFAULT = {
        COMPARE: CompareFunction.ALWAYS,
        FAIL_OP: StencilOperation.KEEP,
        DEPTH_FAIL_OP: StencilOperation.KEEP,
        PASS_OP: StencilOperation.KEEP,
    };


    #compare = "always";
    #failOp = "keep";
    #depthFailOp = "keep";
    #passOp = "keep";


    constructor(args = {}) {
        this.compare = (args.compare !== undefined) ? args.compare : StencilFaceState.DEFAULT.COMPARE;
        this.failOp = (args.failOp !== undefined) ? args.failOp : StencilFaceState.DEFAULT.FAIL_OP;
        this.depthFailOp = (args.depthFailOp !== undefined) ? args.depthFailOp : StencilFaceState.DEFAULT.DEPTH_FAIL_OP;
        this.passOp = (args.passOp !== undefined) ? args.passOp : StencilFaceState.DEFAULT.PASS_OP;
    }


    get compare() { return this.#compare; }
    set compare(compare) { this.#compare = compare; }
    get failOp() { return this.#failOp; }
    set failOp(failOp) { this.#failOp = failOp; }
    get depthFailOp() { return this.#depthFailOp; }
    set depthFailOp(depthFailOp) { this.#depthFailOp = depthFailOp; }
    get passOp() { return this.#passOp; }
    set passOp(passOp) { this.#passOp = passOp; }
};
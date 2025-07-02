import { CullMode } from "./primitive_state/CullMode.js";
import { FrontFace } from "./primitive_state/FrontFace.js";
import { PrimitiveTopology } from "./primitive_state/PrimitiveTopology.js";


export class PrimitiveState {


    static DEFAULT = {
        TOPOLOGY: PrimitiveTopology.TRIANGLE_LIST,
        STRIP_INDEX_FORMAT: undefined,
        FRONT_FACE: FrontFace.CCW,
        CULL_MODE: CullMode.NONE,

        UNCLIPPED_DEPTH: false,
    };

    static CONFIGURATION = {
        TTL_FCCW_CN: new PrimitiveState(
            {
                topology: PrimitiveTopology.TRIANGLE_LIST,
                stripIndexFormat: undefined,
                frontFace: FrontFace.CCW,
                cullMode: CullMode.NONE,
                unclippedDepth: false,
            }
        ),
        TLL_FCCW_CN: new PrimitiveState(
            {
                topology: PrimitiveTopology.LINE_LIST,
                stripIndexFormat: undefined,
                frontFace: FrontFace.CCW,
                cullMode: CullMode.NONE,
                unclippedDepth: false,
            }
        ),
        TPL_FCCW_CN: new PrimitiveState(
            {
                topology: PrimitiveTopology.POINT_LIST,
                stripIndexFormat: undefined,
                frontFace: FrontFace.CCW,
                cullMode: CullMode.NONE,
                unclippedDepth: false,
            }
        ),
    };


    #topology;
    #stripIndexFormat;
    #frontFace;
    #cullMode;

    #unclippedDepth;


    constructor(args = {}) {
        this.topology = (args.topology !== undefined) ? args.topology : undefined;
        this.stripIndexFormat = (args.stripIndexFormat !== undefined) ? args.stripIndexFormat : undefined;
        this.frontFace = (args.frontFace !== undefined) ? args.frontFace : undefined;
        this.cullMode = (args.cullMode !== undefined) ? args.cullMode : undefined;
        
        this.unclippedDepth = (args.unclippedDepth !== undefined) ? args.unclippedDepth : undefined;
    }


    get topology() { return this.#topology; }
    set topology(topology) { this.#topology = topology; }
    get stripIndexFormat() { return this.#stripIndexFormat; }
    set stripIndexFormat(stripIndexFormat) { this.#stripIndexFormat = stripIndexFormat; }
    get frontFace() { return this.#frontFace; }
    set frontFace(frontFace) { this.#frontFace = frontFace; }
    get cullMode() { return this.#cullMode; }
    set cullMode(cullMode) { this.#cullMode = cullMode; }
    
    get unclippedDepth() { return this.#unclippedDepth; }
    set unclippedDepth(unclippedDepth) { this.#unclippedDepth = unclippedDepth; }
};
import { TextureFormat } from "../textures/TextureFormat.js";
import { CompareFunction } from "./depth_stencil_state/CompareFunction.js";
import { StencilFaceState } from "./depth_stencil_state/StencilFaceState.js";
import { StencilOperation } from "./depth_stencil_state/StencilOperation.js";


export class DepthStencilState {


    static DEFAULT = {
        FORMAT: undefined,

        DEPTH_WRITE_ENABLED: false,
        DEPTH_COMPARE: CompareFunction.ALWAYS,

        STENCIL_FRONT: {},
        STENCIL_BACK: {},

        STENCIL_READ_MASK: 0xFFFFFFFF,
        STENCIL_WRITE_MASK: 0xFFFFFFFF,

        DEPTH_BIAS: 0,
        DEPTH_BIAS_SLOPE_SCALE: 0,
        DEPTH_BIAS_CLAMP: 0,
    };

    static CONFIGURATION = {
        FP_DWET_DCLE: new DepthStencilState(
            {
                format: TextureFormat.DEPTH_32_FLOAT,
                depthWriteEnabled: true,
                depthCompare: CompareFunction.LESS_EQUAL,
                stencilFront: new StencilFaceState(
                    {
                        compare: CompareFunction.ALWAYS,
                        failOp: StencilOperation.KEEP,
                        depthFailOp: StencilOperation.KEEP,
                        passOp: StencilOperation.KEEP,
                    }
                ),
                stencilBack: new StencilFaceState(
                    {
                        compar: CompareFunction.ALWAYS,
                        failOp: StencilOperation.KEEP,
                        depthFailOp: StencilOperation.KEEP,
                        passOp: StencilOperation.KEEP,
                    }
                ),
                stencilReadMask: 0xFFFFFFFF,
                stencilWriteMask: 0xFFFFFFFF,
                depthBias: 0,
                depthBiasSlopeScale: 0,
                depthBiasClamp: 0,
            }
        ),
        FP_DWEF_DCLE: new DepthStencilState(
            {
                format: TextureFormat.DEPTH_32_FLOAT,
                depthWriteEnabled: false,
                depthCompare: CompareFunction.LESS_EQUAL,
                stencilFront: new StencilFaceState(
                    {
                        compare: CompareFunction.ALWAYS,
                        failOp: StencilOperation.KEEP,
                        depthFailOp: StencilOperation.KEEP,
                        passOp: StencilOperation.KEEP,
                    }
                ),
                stencilBack: new StencilFaceState(
                    {
                        compar: CompareFunction.ALWAYS,
                        failOp: StencilOperation.KEEP,
                        depthFailOp: StencilOperation.KEEP,
                        passOp: StencilOperation.KEEP,
                    }
                ),
                stencilReadMask: 0xFFFFFFFF,
                stencilWriteMask: 0xFFFFFFFF,
                depthBias: 0,
                depthBiasSlopeScale: 0,
                depthBiasClamp: 0,
            }
        ),
    };


    #format;

    #depthWriteEnabled = false;
    #depthCompare = "always";

    #stencilFront = {};
    #stencilBack = {};

    #stencilReadMask = 0xFFFFFFFF;
    #stencilWriteMask = 0xFFFFFFFF;

    #depthBias = 0;
    #depthBiasSlopeScale = 0;
    #depthBiasClamp = 0;


    constructor(args = {}) {
        this.format = (args.format !== undefined) ? args.format : DepthStencilState.DEFAULT.FORMAT;

        this.depthWriteEnabled = (args.depthWriteEnabled !== undefined) ? args.depthWriteEnabled : DepthStencilState.DEFAULT.DEPTH_WRITE_ENABLED;
        this.depthCompare = (args.depthCompare !== undefined) ? args.depthCompare : DepthStencilState.DEFAULT.DEPTH_COMPARE;
        
        this.stencilFront = (args.stencilFront !== undefined) ? args.stencilFront : DepthStencilState.DEFAULT.STENCIL_FRONT;
        this.stencilBack = (args.stencilBack !== undefined) ? args.stencilBack : DepthStencilState.DEFAULT.STENCIL_BACK;
        
        this.stencilReadMask = (args.stencilReadMask !== undefined) ? args.stencilReadMask : DepthStencilState.DEFAULT.STENCIL_READ_MASK;
        this.stencilWriteMask = (args.stencilWriteMask !== undefined) ? args.stencilWriteMask : DepthStencilState.DEFAULT.STENCIL_WRITE_MASK;
        
        this.depthBias = (args.depthBias !== undefined) ? args.depthBias : DepthStencilState.DEFAULT.DEPTH_BIAS;
        this.depthBiasSlopeScale = (args.depthBiasSlopeScale !== undefined) ? args.depthBiasSlopeScale : DepthStencilState.DEFAULT.DEPTH_BIAS_SLOPE_SCALE;
        this.depthBiasClamp = (args.depthBiasClamp !== undefined) ? args.depthBiasClamp : DepthStencilState.DEFAULT.DEPTH_BIAS_CLAMP;
    }


    get format() { return this.#format; }
    set format(format) { this.#format = format; }

    get depthWriteEnabled() { return this.#depthWriteEnabled; }
    set depthWriteEnabled(depthWriteEnabled) { this.#depthWriteEnabled = depthWriteEnabled; }
    get depthCompare() { return this.#depthCompare; }
    set depthCompare(depthCompare) { this.#depthCompare = depthCompare; }

    get stencilFront() { return this.#stencilFront; }
    set stencilFront(stencilFront) { this.#stencilFront = stencilFront; }
    get stencilBack() { return this.#stencilBack; }
    set stencilBack(stencilBack) { this.#stencilBack = stencilBack; }

    get stencilReadMask() { return this.#stencilReadMask; }
    set stencilReadMask(stencilReadMask) { this.#stencilReadMask = stencilReadMask; }
    get stencilWriteMask() { return this.#stencilWriteMask; }
    set stencilWriteMask(stencilWriteMask) { this.#stencilWriteMask = stencilWriteMask; }
    
    get depthBias() { return this.#depthBias; }
    set depthBias(depthBias) { this.#depthBias = depthBias; }
    get depthBiasSlopeScale() { return this.#depthBiasSlopeScale; }
    set depthBiasSlopeScale(depthBiasSlopeScale) { this.#depthBiasSlopeScale = depthBiasSlopeScale; }
    get depthBiasClamp() { return this.#depthBiasClamp; }
    set depthBiasClamp(depthBiasClamp) { this.#depthBiasClamp = depthBiasClamp; }
};
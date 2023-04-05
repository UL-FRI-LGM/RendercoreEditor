import { GPUTextureFormat } from "../../ENUM/GPUTextureFormat.js";
import { ObjectBase } from "../../ObjectBase.js";
import { CompareFunction } from "./depth stencil state/CompareFunction.js";
import { StencilFaceState } from "./depth stencil state/StencilFaceState.js";
import { StencilOperation } from "./depth stencil state/StencilOperation.js";


export class DepthStencilStateManager extends ObjectBase { //RC depth stencil state manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "DepthStencilStateManager",
    };


	#context;

    #descriptors = new Set();
    #depthStencilStates = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : DepthStencilStateManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : DepthStencilStateManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.depthStencilStates = (args.depthStencilStates !== undefined) ? args.depthStencilStates : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get depthStencilStates() { return this.#depthStencilStates; }
    set depthStencilStates(depthStencilStates) { this.#depthStencilStates = depthStencilStates; }


    #createDepthStencilState(descriptor, args = {}) {
        // const depthStencilState = createDepthStencilState(descriptor);
        const depthStencilState = descriptor;

        depthStencilState.format = GPUTextureFormat.DEPTH_24_PLUS_STENCIL_8;
        depthStencilState.depthWriteEnabled = true;
        depthStencilState.depthCompare = CompareFunction.LESS_EQUAL;
        depthStencilState.stencilFront = new StencilFaceState(
            {
                compare: CompareFunction.ALWAYS,
                failOp: StencilOperation.KEEP,
                depthFailOp: StencilOperation.KEEP,
                passOp: StencilOperation.KEEP,
            }
        );
        depthStencilState.stencilBack = new StencilFaceState(
            {
                compar: CompareFunction.ALWAYS,
                failOp: StencilOperation.KEEP,
                depthFailOp: StencilOperation.KEEP,
                passOp: StencilOperation.KEEP,
            }
        );
        depthStencilState.stencilReadMask = 0xFFFFFFFF;
        depthStencilState.stencilWriteMask = 0xFFFFFFFF;
        depthStencilState.depthBias = 0;
        depthStencilState.depthBiasSlopeScale = 0;
        depthStencilState.depthBiasClamp = 0;

        this.depthStencilStates.set(descriptor, depthStencilState);

        descriptor.dirty = false;


        return depthStencilState;
    }
    createDepthStencilState(descriptor, args = {}) {
        if (this.depthStencilStates.has(descriptor)) this.#deleteDepthStencilState(descriptor);
        const depthStencilState = this.#createDepthStencilState(descriptor, args);


        return depthStencilState;
    }
    #updateDepthStencilState(descriptor, args = {}) {
        return this.createDepthStencilState(descriptor, args);
    }
    getDepthStencilState(descriptor, args = {}) {
        return (this.depthStencilStates.has(descriptor)) ? ((descriptor.dirty) ? this.#updateDepthStencilState(descriptor, args) : this.depthStencilStates.get(descriptor)) : this.createDepthStencilState(descriptor, args);
    }
    #deleteDepthStencilState(descriptor) {
        // this.depthStencilStates.get(descriptor).destroy();
        const deleted = this.depthStencilStates.delete(descriptor);


        return deleted;
    }
    deleteDepthStencilState(descriptor) {
        return (this.depthStencilStates.has(descriptor)) ? this.#deleteDepthStencilState(descriptor) : false;
    }
};
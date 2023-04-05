import { ObjectBase } from "../../ObjectBase.js";


export class ComputeStateManager extends ObjectBase { //RC compute state manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "ComputeStateManager",
    };


	#context;

    #descriptors = new Set();
    #computeStates = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : ComputeStateManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ComputeStateManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.computeStates = (args.computeStates !== undefined) ? args.computeStates : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get computeStates() { return this.#computeStates; }
    set computeStates(computeStates) { this.#computeStates = computeStates; }


    #getComputeShader(args = {}) {
        const camera = args.camera;
        const lightManager = args.lightManager;

        const object = args.object;
        const geometry = args.object.geometry;
        const material = args.object.material;

        const computePassManager = args.computePassManager;


		const compPath = material.shaderPath + material.programName + "_comp.wgsl";
        const compSource = computePassManager.shaderCache.get(compPath);

        const flags = new Set([...material.flags]);
		const values = new Map([...material.values]);

		const compPreprocessed = computePassManager.shaderPreprocessor.preprocess(compPath, compSource, flags, values);


        return compPreprocessed;
    }

    #createComputeState(descriptor, args = {}) {
        // const computeState = createComputeState(descriptor);
        const computeState = descriptor;
        
        computeState.module = this.context.createShaderModule({code: this.#getComputeShader(args)});
        computeState.entryPoint = "main";

        this.computeStates.set(descriptor, computeState);

        descriptor.dirty = false;


        return computeState;
    }
    createComputeState(descriptor, args = {}) {
        if (this.computeStates.has(descriptor)) this.#deleteComputeState(descriptor);
        const computeState = this.#createComputeState(descriptor, args);


        return computeState;
    }
    #updateComputeState(descriptor, args = {}) {
        return this.createComputeState(descriptor, args);
    }
    getComputeState(descriptor, args = {}) {
        return (this.computeStates.has(descriptor)) ? ((descriptor.dirty) ? this.#updateComputeState(descriptor, args) : this.computeStates.get(descriptor)) : this.createComputeState(descriptor, args);
    }
    #deleteComputeState(descriptor) {
        // this.computeStates.get(descriptor).destroy();
        const deleted = this.computeStates.delete(descriptor);


        return deleted;
    }
    deleteComputeState(descriptor) {
        return (this.computeStates.has(descriptor)) ? this.#deleteComputeState(descriptor) : false;
    }
};
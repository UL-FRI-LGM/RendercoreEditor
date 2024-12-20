import { ObjectBase } from "../../ObjectBase.js";


export class VertexStateManager extends ObjectBase { //RC vertex_state manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "VertexStateManager",
    };


	#context;

    #descriptors = new Set();
    #vertexStates = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : VertexStateManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : VertexStateManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.vertexStates = (args.vertexStates !== undefined) ? args.vertexStates : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get vertexStates() { return this.#vertexStates; }
    set vertexStates(vertexStates) { this.#vertexStates = vertexStates; }


    #getVertexShader(args = {}) {
        const camera = args.camera;
        const lightManager = args.lightManager;

        const object = args.object;
        const geometry = args.object.geometry;
        const material = args.object.material;

        const renderPassManager = args.renderPassManager;


		const vertPath = material.shaderPath + material.programName + "_vert.wgsl";
		const vertSource = renderPassManager.shaderCache.get(vertPath);

        const flags = new Set([...material.flags, ...lightManager.flags]);
		const values = new Map([...material.values, ...lightManager.values]);

        const vertPreprocessed = renderPassManager.shaderPreprocessor.preprocess(vertPath, vertSource, flags, values);


        return vertPreprocessed;
    }

    #createVertexState(descriptor, args = {}) {
        // const vertexState = createVertexState(descriptor);
        const vertexState = descriptor;

        vertexState.module = this.context.createShaderModule({code: this.#getVertexShader(args)});
        vertexState.entryPoint = "main";
        vertexState.buffers = Array.from(args.object.geometry.attributeLocationDescriptors.values()).filter((x) => { return x !== null; }).map((x) => { return x.vertexBufferLayoutDescriptor; });

        this.vertexStates.set(descriptor, vertexState);

        descriptor.dirty = false;


        return vertexState;
    }
    createVertexState(descriptor, args = {}) {
        if (this.vertexStates.has(descriptor)) this.#deleteVertexState(descriptor);
        const vertexState = this.#createVertexState(descriptor, args);


        return vertexState;
    }
    #updateVertexState(descriptor, args = {}) {
        return this.createVertexState(descriptor, args);
    }
    getVertexState(descriptor, args = {}) {
        return (this.vertexStates.has(descriptor)) ? ((descriptor.dirty) ? this.#updateVertexState(descriptor, args) : this.vertexStates.get(descriptor)) : this.createVertexState(descriptor, args);
    }
    #deleteVertexState(descriptor) {
        // this.vertexStates.get(descriptor).destroy();
        const deleted = this.vertexStates.delete(descriptor);


        return deleted;
    }
    deleteVertexState(descriptor) {
        return (this.vertexStates.has(descriptor)) ? this.#deleteVertexState(descriptor) : false;
    }
};
import { ObjectBase } from "../../ObjectBase.js";
import { BlendState } from "./fragment_state/BlendState.js";
import { ColorTargetState } from "./fragment_state/ColorTargetState.js";
import { BlendComponent } from "./fragment_state/BlendComponent.js"
import { ColorWrite } from "./fragment_state/ColorWrite.js";
import { BlendOperation } from "./fragment_state/BlendOperation.js";
import { BlendFactor } from "./fragment_state/BlendFactor.js";
import { TextureFormat } from "../textures/TextureFormat.js";


export class FragmentStateManager extends ObjectBase { //RC fragment state manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "FragmentStateManager",
    };


	#context;

    #descriptors = new Set();
    #fragmentStates = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : FragmentStateManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : FragmentStateManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.fragmentStates = (args.fragmentStates !== undefined) ? args.fragmentStates : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get fragmentStates() { return this.#fragmentStates; }
    set fragmentStates(fragmentStates) { this.#fragmentStates = fragmentStates; }


    #getFragmentShader(args = {}) {
        const camera = args.camera;
        const lightManager = args.lightManager;

        const object = args.object;
        const geometry = args.object.geometry;
        const material = args.object.material;

        const renderPassManager = args.renderPassManager;


		const fragPath = material.shaderPath + material.programName + "_frag.wgsl";
		const fragSource = renderPassManager.shaderCache.get(fragPath);

        const flags = new Set([...material.flags, ...lightManager.flags]);
		const values = new Map([...material.values, ...lightManager.values]);

		const fragPreprocessed = renderPassManager.shaderPreprocessor.preprocess(fragPath, fragSource, flags, values);


        return fragPreprocessed;
    }

    #createFragmentState(descriptor, args = {}) {
        // const fragmentState = createFragmentState(descriptor);
        const fragmentState = descriptor;
        
        fragmentState.module = this.context.createShaderModule({code: this.#getFragmentShader(args)});
        fragmentState.entryPoint = "main";
        fragmentState.targets = [
            new ColorTargetState(
                {
                    format: TextureFormat.RGBA_8_UNORM,

                    blend: new BlendState(
                        {
                            color: new BlendComponent(
                                {
                                    operation: BlendOperation.ADD,
                                    srcFactor: BlendFactor.ONE,
                                    dstFactor: BlendFactor.ZERO
                                }
                            ),
                            alpha: new BlendComponent(
                                {
                                    operation: BlendOperation.ADD,
                                    srcFactor: BlendFactor.ONE,
                                    dstFactor: BlendFactor.ZERO
                                }
                            ),
                        }
                    ),
                    writeMask: ColorWrite.ALL,
                }
            ),
        ];

        this.fragmentStates.set(descriptor, fragmentState);

        descriptor.dirty = false;


        return fragmentState;
    }
    createFragmentState(descriptor, args = {}) {
        if (this.fragmentStates.has(descriptor)) this.#deleteFragmentState(descriptor);
        const fragmentState = this.#createFragmentState(descriptor, args);


        return fragmentState;
    }
    #updateFragmentState(descriptor, args = {}) {
        return this.createFragmentState(descriptor, args);
    }
    getFragmentState(descriptor, args = {}) {
        return (this.fragmentStates.has(descriptor)) ? ((descriptor.dirty) ? this.#updateFragmentState(descriptor, args) : this.fragmentStates.get(descriptor)) : this.createFragmentState(descriptor, args);
    }
    #deleteFragmentState(descriptor) {
        // this.fragmentStates.get(descriptor).destroy();
        const deleted = this.fragmentStates.delete(descriptor);


        return deleted;
    }
    deleteFragmentState(descriptor) {
        return (this.fragmentStates.has(descriptor)) ? this.#deleteFragmentState(descriptor) : false;
    }
};
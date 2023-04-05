import { ObjectBase } from "../../ObjectBase.js";
import { CullMode } from "./primitive state/CullMode.js";
import { FrontFace } from "./primitive state/FrontFace.js";


export class PrimitiveStateManager extends ObjectBase { //RC primitive state manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "PrimitiveStateManager",
    };


	#context;

    #descriptors = new Set();
    #primitiveStates = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : PrimitiveStateManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PrimitiveStateManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.primitiveStates = (args.primitiveStates !== undefined) ? args.primitiveStates : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get primitiveStates() { return this.#primitiveStates; }
    set primitiveStates(primitiveStates) { this.#primitiveStates = primitiveStates; }


    #createPrimitiveState(descriptor, args = {}) {
        // const primitiveState = createPrimitiveState(descriptor);
        const primitiveState = descriptor;

        primitiveState.topology = args.object.primitive;
        primitiveState.stripIndexFormat = undefined;
        primitiveState.frontFace = FrontFace.CCW;
        primitiveState.cullMode = CullMode.NONE;
        primitiveState.unclippedDepth = false;

        this.primitiveStates.set(descriptor, primitiveState);

        descriptor.dirty = false;


        return primitiveState;
    }
    createPrimitiveState(descriptor, args = {}) {
        if (this.primitiveStates.has(descriptor)) this.#deletePrimitiveState(descriptor);
        const primitiveState = this.#createPrimitiveState(descriptor, args);


        return primitiveState;
    }
    #updatePrimitiveState(descriptor, args = {}) {
        return this.createPrimitiveState(descriptor, args);
    }
    getPrimitiveState(descriptor, args = {}) {
        return (this.primitiveStates.has(descriptor)) ? ((descriptor.dirty) ? this.#updatePrimitiveState(descriptor, args) : this.primitiveStates.get(descriptor)) : this.createPrimitiveState(descriptor, args);
    }
    #deletePrimitiveState(descriptor) {
        // this.primitiveStates.get(descriptor).destroy();
        const deleted = this.primitiveStates.delete(descriptor);


        return deleted;
    }
    deletePrimitiveState(descriptor) {
        return (this.primitiveStates.has(descriptor)) ? this.#deletePrimitiveState(descriptor) : false;
    }
};
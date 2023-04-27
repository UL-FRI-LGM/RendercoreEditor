import { ObjectBase } from "../ObjectBase.js";
import { ResourceBinding } from "./ResourceBinding.js";


export class UniformGroupManager extends ObjectBase { //RC uniform group manager (uniform setter)


    static DEFAULT = {
        NAME: "",
        TYPE: "UniformGroupManager",
    };


    #context;

    #descriptors = new Set();
    #uniformGroups = new Map();


	constructor(contextManager, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : UniformGroupManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : UniformGroupManager.DEFAULT.TYPE,
			}
		);

        this.context = (contextManager.context !== undefined) ? contextManager.context : undefined;

        this.bufferManager = contextManager.bufferManager;
        this.textureManager = contextManager.textureManager;
        this.samplerManager = contextManager.samplerManager;
        this.bindGroupLayoutManager = contextManager.bindGroupLayoutManager;
        this.bindGroupManager = contextManager.bindGroupManager;

        this.resourceBindingManager = contextManager.resourceBindingManager;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.uniformGroups = (args.uniformGroups !== undefined) ? args.uniformGroups : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get uniformGroups() { return this.#uniformGroups; }
    set uniformGroups(uniformGroups) { this.#uniformGroups = uniformGroups; }


    #createUniformGroup(descriptor) {
        // TODO make new wrapper class for this, or context.createUniformGroup(descriptor)?
        const uniformGroup = descriptor;

        const resourceBindingsInternal = uniformGroup.resourceBindingsInternal;
        const resourceBindingsExternal = uniformGroup.resourceBindingsExternal;
		const bindGroupLayoutDescriptor = uniformGroup.bindGroupLayoutDescriptor;
		const bindGroupDescriptor = uniformGroup.bindGroupDescriptor;

        const bindGroupLayoutEntries = new Map();
        const bindGroupEntries = new Map();

        for (const [number, resourceBinding] of resourceBindingsInternal) {
            const resourceDescriptor = resourceBinding.resourceDescriptor;
            const bindGroupLayoutEntry = resourceBinding.bindGroupLayoutEntry;
            const bindGroupEntry = resourceBinding.bindGroupEntry;

			this.resourceBindingManager.createResourceBinding(resourceBinding);

            bindGroupLayoutEntries.set(number, bindGroupLayoutEntry);
            bindGroupEntries.set(number, bindGroupEntry);
		}

        for (const [number, resourceBinding] of resourceBindingsExternal) {
            const resourceDescriptor = resourceBinding.resourceDescriptor;
            const bindGroupLayoutEntry = resourceBinding.bindGroupLayoutEntry;
            const bindGroupEntry = resourceBinding.bindGroupEntry;

			this.resourceBindingManager.createResourceBinding(resourceBinding);

            bindGroupLayoutEntries.set(number, bindGroupLayoutEntry);
            bindGroupEntries.set(number, bindGroupEntry);
		}

        bindGroupLayoutDescriptor.entries = Array.from(bindGroupLayoutEntries.values());
        bindGroupDescriptor.layout = this.bindGroupLayoutManager.getBindGroupLayout(bindGroupLayoutDescriptor);
        bindGroupDescriptor.entries = Array.from(bindGroupEntries.values());

        this.uniformGroups.set(descriptor, uniformGroup);

        descriptor.dirty = false;


        return uniformGroup;
    }
    createUniformGroup(descriptor) {
        if (this.uniformGroups.has(descriptor)) this.#deleteUniformGroup(descriptor);
        const uniformGroup = this.#createUniformGroup(descriptor);


        return uniformGroup;
    }
    #updateUniformGroup(descriptor) {
        return this.createUniformGroup(descriptor);
    }
    getUniformGroup(descriptor) {
        return (this.uniformGroups.has(descriptor)) ? ((descriptor.dirty) ? this.#updateUniformGroup(descriptor) : this.uniformGroups.get(descriptor)) : this.createUniformGroup(descriptor);
    }
    #deleteUniformGroup(descriptor) {
        // this.uniformGroups.get(descriptor).delete();
        const delted = this.uniformGroups.delete(descriptor);


        return delted;
    }
    deleteUniformGroup(descriptor) {
        return (this.uniformGroups.has(descriptor)) ? this.#deleteUniformGroup(descriptor) : false;
    }

    setUniformGroupValue(descriptor) {
        const uniformGroup = this.uniformGroups.get(descriptor);

        const resourceBindingsInternal = uniformGroup.resourceBindingsInternal;
        const resourceBindingsExternal = uniformGroup.resourceBindingsExternal;
		// const bindGroupLayoutDescriptor = uniformGroup.bindGroupLayoutDescriptor;
		// const bindGroupDescriptor = uniformGroup.bindGroupDescriptor;

        // for (const [name, setInstruction] of uniformGroup.dirtyCache) {}
        // uniformGroup.dirtyCache.forEach((setInstruction, name) => {});
        // if (uniformGroup.dirtyCache.size > 0) {
        //     uniformGroup.dirtyCache.forEach((setInstruction, name) => {
        //         console.warn(name, setInstruction);

        //         switch (setInstruction.target) {
        //             case ResourceBinding.TARGET.INTERNAL:
        //                 const resourceBindingInternal = resourceBindingsInternal.get(setInstruction.number);
        //                 this.resourceBindingManager.setResourceBinding(resourceBindingInternal, setInstruction);
        //                 break;
        //             case ResourceBinding.TARGET.EXTERNAL:
        //                 const resourceBindingExternal = resourceBindingsExternal.get(setInstruction.number);
        //                 this.resourceBindingManager.setResourceBinding(resourceBindingExternal, setInstruction);
        //                 break;
        //             default:
        //                 throw new Error(`Unknown set instruction target: [${setInstruction.target}]!`);
        //         }
        //     });
        //     uniformGroup.dirtyCache.clear();
        // }

        if (resourceBindingsInternal.size > 0) {
            resourceBindingsInternal.forEach((resourceBinding, number) => {
                this.resourceBindingManager.setResourceBindingValue(resourceBinding);
            });
        }
        if (resourceBindingsExternal.sie > 0) {
            resourceBindingsExternal.forEach((resourceBinding, number) => {
                this.resourceBindingManager.setResourceBindingValue(resourceBinding);
            });
        }
    }
};
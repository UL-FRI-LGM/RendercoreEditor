import { DescriptorBase } from "./RC/DescriptorBase.js";


export class ContextDescriptor extends DescriptorBase { //RC context descriptor (canvas descriptor + device descriptor)


    static DEFAULT = {
        NAME: "",
		TYPE: "ContextDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),
    };


    #canvas;

    #powerPreference;
    #forceFallbackAdapter;

    #requiredFeatures;
    #requiredLimits;
    #defaultQueue;

    #configuration;


    constructor(args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : ContextDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ContextDescriptor.DEFAULT.TYPE,

                label: (args.label !== undefined) ? args.label : ContextDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(ContextDescriptor.DEFAULT.DIRTY_CACHE), //copy
			}
		);

        this.canvas = (args.canvas !== undefined) ? args.canvas : null;

        this.powerPreference = (args.powerPreference !== undefined) ? args.powerPreference : undefined;
        this.forceFallbackAdapter = (args.forceFallbackAdapter !== undefined) ? args.forceFallbackAdapter : false;

        this.requiredFeatures = (args.requiredFeatures !== undefined) ? args.requiredFeatures : undefined;
        this.requiredLimits = (args.requiredLimits !== undefined) ? args.requiredLimits : undefined;
        this.defaultQueue = (args.defaultQueue !== undefined) ? args.defaultQueue : undefined;
    
        this.configuration = (args.configuration !== undefined) ? args.configuration : null;
    }


    get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }

    get powerPreference() { return this.#powerPreference; }
    set powerPreference(powerPreference) { this.#powerPreference = powerPreference; }
    get forceFallbackAdapter() { return this.#forceFallbackAdapter; }
    set forceFallbackAdapter(forceFallbackAdapter) { this.#forceFallbackAdapter = forceFallbackAdapter; }

    get requiredFeatures() { return this.#requiredFeatures; }
    set requiredFeatures(requiredFeatures) { this.#requiredFeatures = requiredFeatures; }
    get requiredLimits() { return this.#requiredLimits; }
    set requiredLimits(requiredLimits) { this.#requiredLimits = requiredLimits; }
    get defaultQueue() { return this.#defaultQueue; }
    set defaultQueue(defaultQueue) { this.#defaultQueue = defaultQueue; }

    get configuration() { return this.#configuration; }
    set configuration(configuration) { this.#configuration = configuration; }
};

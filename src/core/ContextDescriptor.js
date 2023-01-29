import { DescriptorBase } from "./RC/DescriptorBase.js";


export class ContextDescriptor extends DescriptorBase { //RC context descriptor


    #powerPreference;
    #forceFallbackAdapter;

    #requiredFeatures;
    #requiredLimits;
    #defaultQueue;


    constructor(args = {}) {
        super(args);

        this.powerPreference = args.powerPreference !== undefined ? args.powerPreference : undefined;
        this.forceFallbackAdapter = args.forceFallbackAdapter !== undefined ? args.forceFallbackAdapter : false;

        this.requiredFeatures = (args.requiredFeatures !== undefined) ? args.requiredFeatures : undefined;
        this.requiredLimits = (args.requiredLimits !== undefined) ? args.requiredLimits : undefined;
        this.defaultQueue = (args.defaultQueue !== undefined) ? args.defaultQueue : undefined;
    }


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
};
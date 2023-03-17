import { DescriptorBase } from "../DescriptorBase.js";


export class PipelineDescriptor extends DescriptorBase {
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "PipelineDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),
    };


    #layout;


	constructor(args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : PipelineDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PipelineDescriptor.DEFAULT.TYPE,

                label: (args.label !== undefined) ? args.label : PipelineDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(PipelineDescriptor.DEFAULT.DIRTY_CACHE), //copy
			}
		);


        this.layout = (args.layout !== undefined) ? args.layout : undefined;
	}


    get layout() { return this.#layout; }
    set layout(layout) { this.#layout = layout; }
};
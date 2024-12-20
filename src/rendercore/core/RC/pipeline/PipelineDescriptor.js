import { DescriptorBase } from "../DescriptorBase.js";


export class PipelineDescriptor extends DescriptorBase {
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "PipelineDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),

        LAYOUT_DESCRIPTOR: undefined,
        LAYOUT: null,
    };


    #layoutDescriptor;
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

        this.layoutDescriptor = (args.layoutDescriptor !== undefined) ? args.layoutDescriptor : PipelineDescriptor.DEFAULT.LAYOUT_DESCRIPTOR;
        this.layout = (args.layout !== undefined) ? args.layout : PipelineDescriptor.DEFAULT.LAYOUT;
	}


    get layoutDescriptor() { return this.#layoutDescriptor; }
    set layoutDescriptor(layoutDescriptor) { this.#layoutDescriptor = layoutDescriptor; }
    get layout() { return this.#layout; }
    set layout(layout) { this.#layout = layout; }
};
import { DescriptorBase } from "../core/RC/DescriptorBase.js";


export class PipelineLayoutDescriptor extends DescriptorBase {
	
	
	static DEFAULT = {
		TYPE: "PipelineLayoutDescriptor",
		NAME: "",
	};


	#bindGroupLayouts;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : PipelineLayoutDescriptor.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PipelineLayoutDescriptor.DEFAULT.NAME,
			}
		);

		this.bindGroupLayouts = args.bindGroupLayouts !== undefined ? args.bindGroupLayouts : undefined;
	}


	get bindGroupLayouts() { return this.#bindGroupLayouts; }
	set bindGroupLayouts(bindGroupLayouts) { this.#bindGroupLayouts = bindGroupLayouts; }
};

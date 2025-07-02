import { DescriptorBase } from "../DescriptorBase.js";
import { Division } from "../../../Division.js";
import { MapT2 } from "../../MapT2.js";


export class PipelineDescriptor extends DescriptorBase {


	static DEFAULT = {
		TYPE: "PipelineDescriptor",
		NAME: "",
		LABEL: "",
		DIVISION: Division.RENDER_CORE,

		DIRTY_CACHE: new MapT2(
			{ label: `${PipelineDescriptor.name}` },
			[
				...DescriptorBase.DEFAULT.DIRTY_CACHE.clone(true)
			]
		),

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
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : PipelineDescriptor.DEFAULT.DIRTY_CACHE.clone(true),
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

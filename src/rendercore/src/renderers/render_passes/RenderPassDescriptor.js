import { DescriptorBase } from "../../core/RC/DescriptorBase.js";
import { MapT2 } from "../../core/MapT2.js";


export class RenderPassDescriptor extends DescriptorBase {


	static DEFAULT = {
		TYPE: "RenderPassDescriptor",
		NAME: "",


        LABEL: "",
        DIRTY_CACHE: new MapT2(
			{ name: "DC - RENDER PASS DESCRIPTOR" },
			[
				...DescriptorBase.DEFAULT.DIRTY_CACHE.clone(),
			]
		),
	};

	#colorAttachments;
	#depthStencilAttachment;
	#occlusionQuerySet;
	#timestampWrites;
	#maxDrawCount;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderPassDescriptor.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderPassDescriptor.DEFAULT.NAME,

				label: (args.label !== undefined) ? args.label : RenderPassDescriptor.DEFAULT.LABEL,
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : RenderPassDescriptor.DEFAULT.DIRTY_CACHE,
			}
		);

		this.colorAttachments = args.colorAttachments !== undefined ? args.colorAttachments : undefined;
		this.depthStencilAttachment = args.depthStencilAttachment !== undefined ? args.depthStencilAttachment : undefined;
		this.occlusionQuerySet = args.occlusionQuerySet !== undefined ? args.occlusionQuerySet : undefined;
		this.timestampWrites = args.timestampWrites !== undefined ? args.timestampWrites : undefined;
		this.maxDrawCount = args.maxDrawCount !== undefined ? args.maxDrawCount : undefined;
	}


	get colorAttachments() { return this.#colorAttachments; }
	set colorAttachments(colorAttachments) { this.#colorAttachments = colorAttachments; }
	get depthStencilAttachment() { return this.#depthStencilAttachment; }
	set depthStencilAttachment(depthStencilAttachment) { this.#depthStencilAttachment = depthStencilAttachment; }
	get occlusionQuerySet() { return this.#occlusionQuerySet; }
	set occlusionQuerySet(occlusionQuerySet) { this.#occlusionQuerySet = occlusionQuerySet; }
	get timestampWrites() { return this.#timestampWrites; }
	set timestampWrites(timestampWrites) { this.#timestampWrites = timestampWrites; }
	get maxDrawCount() { return this.#maxDrawCount; }
	set maxDrawCount(maxDrawCount) { this.#maxDrawCount = maxDrawCount; }
};

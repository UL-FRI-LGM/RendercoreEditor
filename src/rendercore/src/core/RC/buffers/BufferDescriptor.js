import { DescriptorBase } from "../DescriptorBase.js";
import { BufferUsage } from "./BufferUsage.js";
import { Division } from "../../../Division.js";
import { MapT2 } from "../../MapT2.js";


export class BufferDescriptor extends DescriptorBase { //RC buffer descriptor (WebGL / WebGPU)


	static DEFAULT = {
		TYPE: "BufferDescriptor",
		NAME: "",
		LABEL: "",
		DIVISION: Division.RENDER_CORE,

		DIRTY_CACHE: new MapT2(
			{ label: `${BufferDescriptor.name}` },
			[
				...DescriptorBase.DEFAULT.DIRTY_CACHE.clone(true)
			]
		),

		SIZE: 0,
		USAGE: BufferUsage.VERTEX | BufferUsage.COPY_DST,
		MAPPED_AT_CREATION: false,
	};


	#size;
	#usage;
	#mappedAtCreation;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BufferDescriptor.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BufferDescriptor.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : BufferDescriptor.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : BufferDescriptor.DEFAULT.DIVISION,

				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : BufferDescriptor.DEFAULT.DIRTY_CACHE.clone(true),
			}
		);

		this.size = (args.size !== undefined) ? args.size : BufferDescriptor.DEFAULT.SIZE;
		this.usage = (args.usage !== undefined) ? args.usage : BufferDescriptor.DEFAULT.USAGE;
		this.mappedAtCreation = args.mappedAtCreation !== undefined ? args.mappedAtCreation : BufferDescriptor.DEFAULT.MAPPED_AT_CREATION;
	}

	
	get size() { return this.#size; }
	set size(size) { this.#size = size; }
	get usage() { return this.#usage; }
	set usage(usage) { this.#usage = usage; }
	get mappedAtCreation() { return this.#mappedAtCreation; }
	set mappedAtCreation(mappedAtCreation) { this.#mappedAtCreation = mappedAtCreation; }
};

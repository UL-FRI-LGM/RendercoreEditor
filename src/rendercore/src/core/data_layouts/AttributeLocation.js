import { ResourceLocation } from './ResourceLocation.js';
import { ErrorT2 } from "../../ErrorT2.js";


export class AttributeLocation extends ResourceLocation { //attribute


	static DEFAULT = {
		NAME: "",
		TYPE: "AttributeLocation",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		ITEM_SIZE: 4,
		ARRAY_BUFFER: new Float32Array(),
		BUFFER_DESCRIPTOR: undefined,
		VERTEX_BUFFER_LAYOUT_DESCRIPTOR: undefined,
	};


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : AttributeLocation.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AttributeLocation.DEFAULT.TYPE,
				
				itemSize: (args.itemSize !== undefined) ? args.itemSize : AttribuAttributeLocationteLoaction.DEFAULT.ITEM_SIZE,
				arrayBuffer: (args.arrayBuffer !== undefined) ? args.arrayBuffer : new Float32Array(AttributeLocation.DEFAULT.ARRAY_BUFFER), //copy
				bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : AttributeLocation.DEFAULT.BUFFER_DESCRIPTOR,
				vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : AttributeLocation.DEFAULT.VERTEX_BUFFER_LAYOUT_DESCRIPTOR,
			}
		);
	}


	getValue(getInstruction) {
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
	}
	setValue(name, setInstruction) {
		this.dirtyCache.set(name, setInstruction);
	}
};
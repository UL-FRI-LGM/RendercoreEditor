import { SetInstruction } from "./SetInstruction.js";
import { ResourceBinding } from "./ResourceBinding.js";


export class BufferSetInstruction extends SetInstruction {


	static DEFAULT = {
		NAME: "",
		TYPE: "BufferSetInstruction",

		LABEL: "BUFFER UPDATE",

		NUMBER: null,
		TARGET: ResourceBinding.TARGET.EXTERNAL,

		SOURCE: {
			arrayBuffer: null,
			layout: {
				offset: 0
			}
		},
		DESTINATION: {
			buffer: null,
			layout: {
				offset: 0
			}
		},
		SIZE: 0,
	};


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : BufferSetInstruction.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : BufferSetInstruction.DEFAULT.TYPE,
            
				label: (args.label !== undefined) ? args.label : BufferSetInstruction.DEFAULT.LABEL,
			
				number: (args.number !== undefined) ? args.number : BufferSetInstruction.DEFAULT.NUMBER,
				target: (args.target !== undefined) ? args.target : BufferSetInstruction.DEFAULT.TARGET,
				
				source: (args.source !== undefined) ? args.source : BufferSetInstruction.DEFAULT.SOURCE,
				destination: (args.destination !== undefined) ? args.destination : BufferSetInstruction.DEFAULT.DESTINATION,
				size: (args.size !== undefined) ? args.size : BufferSetInstruction.DEFAULT.SIZE,
			}
		);
	}
};
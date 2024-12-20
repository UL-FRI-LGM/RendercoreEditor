import { SetInstruction } from "./SetInstruction.js";
import { ResourceBinding } from "./ResourceBinding.js";
import { Source } from "./Source.js";
import { Destination } from "./Destination.js";
import { Float32ArrayT2 } from "../Float32ArrayT2.js";
import { Layout } from "./Layout.js";


export class BufferSetInstruction extends SetInstruction {


	static DEFAULT = {
		NAME: "",
		TYPE: "BufferSetInstruction",

		LABEL: "BUFFER UPDATE",

		NUMBER: null,
		TARGET: ResourceBinding.TARGET.EXTERNAL,

		SOURCE: new Source(
			{
				arrayBuffer: new Float32ArrayT2({}),
				layout: new Layout(
					{
						offset: 0
					}
				)
			}
		),
		DESTINATION: new Destination(
			{
				buffer: null,
				layout: new Layout(
					{
						offset: 0
					}
				)
			}
		),
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
				
				source: (args.source !== undefined) ? args.source : BufferSetInstruction.DEFAULT.SOURCE.clone(),
				destination: (args.destination !== undefined) ? args.destination : BufferSetInstruction.DEFAULT.DESTINATION.clone(),
				size: (args.size !== undefined) ? args.size : BufferSetInstruction.DEFAULT.SIZE,
			}
		);
	}

	clone() {
		return new BufferSetInstruction(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				label: (this.label === Object(this.label)) ? this.label.clone() : this.label,

				number: (this.number === Object(this.number)) ? this.number.clone() : this.number,
				target: (this.target === Object(this.target)) ? this.target.clone() : this.target,

				source: (this.source === Object(this.source)) ? this.source.clone() : this.source,
				destination: (this.destination === Object(this.destination)) ? this.destination.clone() : this.destination,
				size: (this.size === Object(this.size)) ? this.size.clone() : this.size,
			}
		);
	}

	setSource(...rest) {
		this.source.set(...rest);
	}
};
import { SetInstruction } from "./SetInstruction.js";
import { ResourceBinding } from "./ResourceBinding.js";
import { Source } from "./Source.js";
import { Destination } from "./Destination.js";
import { Float32ArrayT2 } from "../Float32ArrayT2.js";
import { Layout } from "./Layout.js";
import { ErrorT2 } from "../../ErrorT2.js";


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

	copy(bufferSetInstruction) {
		if (!(bufferSetInstruction instanceof BufferSetInstruction)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(bufferSetInstruction);


		return this;
	}
	clone() {
		return new BufferSetInstruction(Object.assign(super.clone()));
	}

	setSource(...rest) {
		this.source.set(...rest);
	}
};
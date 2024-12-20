import { ObjectBase } from "../ObjectBase.js";
import { Float32ArrayT2 } from "../Float32ArrayT2.js";
import { Layout } from "./Layout.js";


export class Source extends ObjectBase {


	static DEFAULT = {
		TYPE: "Source",
		NAME: "",

		ARRAY_BUFFER: new Float32ArrayT2({}),
		LAYOUT: new Layout(
            {
                offset: 0
            }
        ),
	};


	#arrayBuffer;
	#layout;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Source.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Source.DEFAULT.NAME,
			}
		);

		this.arrayBuffer = (args.arrayBuffer !== undefined) ? args.arrayBuffer : Source.DEFAULT.ARRAY_BUFFER.clone();
		this.layout = (args.layout !== undefined) ? args.layout : Source.DEFAULT.LAYOUT.clone();
	}


	get arrayBuffer() { return this.#arrayBuffer; }
	set arrayBuffer(arrayBuffer) { this.#arrayBuffer = arrayBuffer; }
	get layout() { return this.#layout; }
	set layout(layout) { this.#layout = layout; }


	clone() {
		return new Source(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				arrayBuffer: (this.arrayBuffer === Object(this.arrayBuffer)) ? this.arrayBuffer.clone() : this.arrayBuffer,
				layout: (this.layout === Object(this.layout)) ? this.layout.clone() : this.layout,
			}
		);
	}

	set(...rest) {
		this.arrayBuffer.set(...rest);
	}
};

import { ObjectBase } from "../ObjectBase.js";


export class Layout extends ObjectBase {


	static DEFAULT = {
		TYPE: "Layout",
		NAME: "",

		OFFSET: 0,
	};


	#offset;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Layout.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Layout.DEFAULT.NAME,
			}
		);

		this.offset = (args.offset !== undefined) ? args.offset : Layout.DEFAULT.OFFSET;
	}


	get offset() { return this.#offset; }
	set offset(offset) { this.#offset = offset; }


	clone() {
		return new Layout(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				offset: (this.offset === Object(this.offset)) ? this.offset.clone() : this.offset,
			}
		);
	}
};

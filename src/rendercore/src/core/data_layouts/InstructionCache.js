import { MapT2 } from "../MapT2.js";
import { ArrayT2 } from "../ArrayT2.js";


export class InstructionCache extends MapT2 {


	static DEFAULT = {
		TYPE: "InstructionCache",
		NAME: "",

		ENTRIES: new ArrayT2({ name: "IC - ENTRIES" }),
	};


	constructor(args = {}, entries = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : InstructionCache.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : InstructionCache.DEFAULT.NAME,
			},
			(entries !== undefined) ? entries : InstructionCache.DEFAULT.ENTRIES.clone()
		);
	}


	clone(cloneValues = true) {
		return new InstructionCache(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			[...this.entries()].map(([k, v]) => { return cloneValues ? ([k, (v === Object(v)) ? v.clone() : v]) : [k, v]; }),
		);
	}
};

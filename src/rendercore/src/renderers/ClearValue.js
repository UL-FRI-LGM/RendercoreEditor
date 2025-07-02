import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Color4 } from "../math/Color4.js";
import { ErrorT2 } from "../ErrorT2.js";


export class ClearValue extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "ClearValue",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: "default clear value color array" },
			new Color4(0, 0, 0, 1)
		),
		DEPTH_STENCIL: null,
		DEPTH: 1,
		STENCIL: 0,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : ClearValue.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : ClearValue.DEFAULT.NAME,
			
				color: (args.color !== undefined) ? args.color : ClearValue.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : ClearValue.DEFAULT.DEPTH_STENCIL,
				depth: (args.depth !== undefined) ? args.depth : ClearValue.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : ClearValue.DEFAULT.STENCIL,
			}
		);
	}


	copy(clearValue) {
		return (clearValue instanceof ClearValue) ? super.copy(clearValue) : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
	}
	clone() {
		return new ClearValue(Object.assign(super.clone(), {}));
	}
};

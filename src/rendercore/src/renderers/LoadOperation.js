import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { LoadOp } from "../core/RC/LoadOp.js";
import { ErrorT2 } from "../ErrorT2.js";


export class LoadOperation extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "LoadOperation",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: "default load operation color array" },
			LoadOp.CLEAR
		),
		DEPTH_STENCIL: null,
		DEPTH: LoadOp.CLEAR,
		STENCIL: undefined,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : LoadOperation.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LoadOperation.DEFAULT.NAME,
			
				color: (args.color !== undefined) ? args.color : LoadOperation.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : LoadOperation.DEFAULT.DEPTH_STENCIL,
				depth: (args.depth !== undefined) ? args.depth : LoadOperation.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : LoadOperation.DEFAULT.STENCIL,
			}
		);
	}


	copy(loadOperation) {
		return (loadOperation instanceof LoadOperation) ? super.copy(loadOperation) : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
	}
	clone() {
		return new LoadOperation(Object.assign(super.clone(), {}));
	}
};
